import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import ProgressImage from 'react-native-image-progress';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';

import styles from './styles';

import {Images, Metrics, Colors} from '../../theme';
import {drawerMenuSwitched as navigationChanged} from '../../actions/navigationActions';
import {request as get_all_chapters} from '../../actions/GetChapters';
import {request as get_books} from '../../actions/GetBooks';
import {SpinnerLoader, Header} from '../../components';
import {get_quiz_API} from '../../config/WebServices';
import Util from '../../util';

class LectureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      bookId: this.props.bookId,
      chapters: null,
      lecture: null,
      chapWithAnimation: null,
      isloading: true,
      responseData: null,
      animationLength: 0,
    };
  }

  componentWillMount() {
    this.getData();
    Util.isConnected();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getChapter) {
      if (
        !nextProps.getChapter.failure &&
        !nextProps.getChapter.isFetching &&
        nextProps.getChapter.data.code == 1
      ) {
        let updateResponse = {...nextProps?.getChapter?.data};
        updateResponse.animationResult = updateResponse.animationResult
          ? updateResponse.animationResult
          : [];

        let chapterGroup;
        let chapWithAnimation = updateResponse?.chapter_id.map((chap) => {
          chapterGroup = updateResponse?.animationResult.filter((animation) => {
            return animation.ChapterId == chap.id;
          });
          return Object.assign({}, chap, {animation: chapterGroup});
        });

        let lecture =
          updateResponse?.animationResult &&
          Object.values(
            updateResponse?.animationResult.reduce((c, v) => {
              let k = v.ChapterId; //Using the values as key.
              c[k] = c[k] || [];
              c[k].push(v);
              return c;
            }, {}),
          );

        let chapter = Object.values(
          updateResponse?.chapter_id.reduce((c, v) => {
            let k = v.chapter_no; //Using the values as key.
            c[k] = c[k] || [];
            c[k].push(v);
            return c;
          }, {}),
        );
        this.setState(
          {
            chapters: chapter,
            lecture: lecture,
            chapWithAnimation: chapWithAnimation,
            responseData: updateResponse,
            isloading: false,
          },
          () => {
            let animationLength = 0;
            this.state.responseData.animationResult.map((animation) => {
              if (animation.status === 'active') {
                animationLength += 1;
              }
            });
            this.setState({animationLength});
          },
        );
      } else if (nextProps.login.failure && !nextProps.login.isFetching) {
        this.setState({isloading: false});
      }
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      let user = JSON.parse(value);
      if (value !== null) {
        this.setState({user: user}, () => {
          this.getAllLecture();
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getAllLecture = () => {
    const {book} = this.props;
    const {user} = this.state;
    let accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMsImVtYWlsIjoidGVzdHVzZXJAbWFzb2xvZ3kuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkOVJSbzhVZWRzYm9LMmRoMUkvLnlRLkNIYjd5akZkME5ieUt3R0VaUzJqU0FGR1VPZjA5MHEiLCJpYXQiOjE1ODg3MDc4NDV9.sdCXG0bJf7zeT5SsyNb1eL7ka6jA_NJJhkNN8khNrrA';
    // user && user.access_token;//login.data && login.data.data && login.data.data.access_token;
    let bookId = book.Id;
    let payload = {accessToken, bookId};
    if (Util.isConnected()) {
      this.props.get_all_chapters(payload);
    } else {
      this.setState({isloading: false});
      Alert.alert('Learningwell', 'Please Check Your Internet Connection!');
    }
  };

  navigateQuiz = async (chapterId, chapterName) => {
    const {bookName} = this.props;
    try {
      const quiz = await this.getQuiz(chapterId);
      if (quiz.data?.code == 0) {
        Alert.alert('Message', 'There is no question');
      } else {
        Actions.quizScreen({quiz: quiz.data.questions, chapterName, bookName});
      }
      console.log(
        '🚀 ~ file: index.js ~ line 170 ~ LectureScreen ~ navigateQuiz= ~ quiz',
        quiz.data,
      );
      //    this.setState({quiz: quiz.data.data, isloading: false})
    } catch (ex) {
      if (ex && ex.data && ex.data.message) {
        Alert.alert('', ex.data.message);
      }
      this.setState({isloading: false});
    }
  };

  getQuiz = (chapterId) => {
    return new Promise((resolve, reject) => {
      let formdata = new FormData();
      formdata.append('chapter_id', chapterId);
      axios
        .post(`${get_quiz_API}`, formdata, {
          //${chapterId}
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Authorization: bearer
          },
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  };

  renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderEmptyLectureView = () => {
    return (
      <Text style={styles.notContentAvailable}>
        Video Content is not available will be updated soon.
      </Text>
    );
  };

  renderVideoContainer = (item) => {
    return (
      <View>
        {item?.topic ? (
          <Text style={styles.chapterVideoHeading}>{item.topic}</Text>
        ) : null}
        <TouchableOpacity
          style={{...styles.chapterVideoContainer}}
          onPress={() => {
            this.props.navigationChanged('', 'videoPlayer');
            Actions.videoPlayerScreen({lecture: item});
          }}>
          <ProgressImage
            resizeMode={'stretch'}
            style={{...styles.chapterVideoProgressImage}}
            source={{uri: `https://learningwell.pk/${item.ThumbPath}`}}
            indicatorProps={{
              borderWidth: 0,
              color: Colors.Venice_Blue,
              unfilledColor: 'rgba(200, 200, 200, 0.2)',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderChapterList = () => {
    const {chapWithAnimation} = this.state;
    return (
      <ScrollView>
        <View style={{}}>
          {chapWithAnimation.map((chap, index) => {
            return (
              <View
                style={[
                  chapWithAnimation.length === index + 1 && {
                    marginBottom: Metrics.screenHeight * 0.09,
                  },
                ]}>
                <Text style={styles.chapterHeadingText}>{chap.name}</Text>

                {!chap.animation.length && this.renderEmptyLectureView()}

                {chap.animation.length !== 0 && (
                  <FlatList
                    data={chap.animation}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={(item) => this.renderVideoContainer(item.item)}
                  />
                )}

                <View style={{...styles.chapterVideoBtnContainer}}>
                  <TouchableOpacity
                    style={{
                      ...styles.chapterVideoBtn,
                      marginRight: Metrics.ratio(8),
                    }}
                    onPress={() => {
                      this.navigateQuiz(chap.id, chap.name);
                    }}>
                    <Text style={{...styles.chapterVideoBtnText}}>Quiz</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      ...styles.chapterVideoBtn,
                      marginLeft: Metrics.ratio(8),
                    }}
                    onPress={() => {}}>
                    <Text style={{...styles.chapterVideoBtnText}}>
                      Exercise
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  render() {
    const {lecture, chapters, animationLength} = this.state;
    return (
      <ImageBackground
        source={Images.homeBackgroundImage2}
        resizeMode={'cover'}
        style={[styles.container]}>
        <Header
          leftImage={Images.backArrowIcon2}
          leftBtnPress={() => Actions.pop()}
          rightImage={Images.lectureNavIcon}
          rightImageStyle={styles.rightImageStyle}
        />

        <View style={{...styles.courseNameContainer}}>
          <Text style={{...styles.courseName}}>{this.props.bookName}</Text>
          <Text style={{...styles.courseDetails}}>
            {chapters?.length} Chapters | {animationLength} Videos
          </Text>
        </View>

        <View style={{...styles.lectureContainer}}>
          {lecture && this.renderChapterList()}
        </View>

        {this.renderOverlaySpinner()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  navigation: state.navigation,
  getChapter: state.getChapter,
  login: state.login,
  getBooks: state.getBooks,
});

const actions = {
  navigationChanged,
  get_all_chapters,
  get_books,
};

export default connect(mapStateToProps, actions)(LectureScreen);
