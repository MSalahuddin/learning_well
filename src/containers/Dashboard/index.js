import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Alert,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {Modalize} from 'react-native-modalize';

import styles from './styles';

import {Images, Metrics} from '../../theme';
import {request as get_books} from '../../actions/GetBooks';
import {SpinnerLoader, Header, Card} from '../../components';
import Util from '../../util';

class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      bookName: '',
      backgroundImage: null,
      isloading: false,
      selectedSubjectDetail: null,
      // classId: this.props.login && this.props.login.data && this.props.login.data.data && this.props.login.data.data.class_id
    };
  }

  componentWillMount() {
    this.getData();
    Util.isConnected();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getBooks) {
      if (
        !nextProps.getBooks.failure &&
        !nextProps.getBooks.isFetching &&
        nextProps.getBooks.data.code === 1
      ) {
        this.setState(
          {book: nextProps.getBooks.data.book[0], isloading: false},
          () => {
            console.log(nextProps.getBooks, 'lllllllllllll');
            Actions.lectureScreen({
              book: nextProps.getBooks.data.book[0],
              bookName: this.state.bookName,
              backgroundImage: this.state.backgroundImage,
            });
          },
        );
      } else if (nextProps.getBooks.failure && !nextProps.getBooks.isFetching) {
        this.setState({isloading: false});
      }
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      let user = JSON.parse(value);
      console.log(user, 'uuuuuuuuuuser');
      if (value !== null) {
        this.setState({user: user});
      }
    } catch (e) {
      console.log(e);
    }
  };

  onPressSubject = (book, classid, bookname, backgroundImage) => {
    this.setState(
      {
        selectedSubjectDetail: {
          book,
          classid,
          bookname,
          backgroundImage,
        },
      },
      () => this.modalizeRef.open(),
    );
  };

  getBooks = (book, classid, bookname, backgroundImage) => {
    // const {user} = this.state;

    let accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTMsImVtYWlsIjoidGVzdHVzZXJAbWFzb2xvZ3kuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkOVJSbzhVZWRzYm9LMmRoMUkvLnlRLkNIYjd5akZkME5ieUt3R0VaUzJqU0FGR1VPZjA5MHEiLCJpYXQiOjE1ODg3MDc4NDV9.sdCXG0bJf7zeT5SsyNb1eL7ka6jA_NJJhkNN8khNrrA';
    //user && user.access_token; //login.data && login.data.data && login.data.data.access_token;
    let bookName = book;
    let classId = classid;
    const payload = {accessToken, bookName, classId};
    this.setState({
      bookName: bookname,
      backgroundImage: backgroundImage,
      isloading: true,
    });
    if (Util.isConnected()) {
      this.props.get_books(payload);
    } else {
      this.setState({isloading: false});
      Alert.alert('Learningwell', 'Please Check Your Internet Connection!');
    }
  };

  renderModalizeContent = () => {
    const {selectedSubjectDetail} = this.state;
    return (
      <View style={{...styles.modalizeContentContainer}}>
        <View>
          <Text style={{...styles.modalizeHeadingText}}>Please Choose</Text>
          <View style={{...styles.modalizeHeadingUnderline}} />
        </View>
        <View style={{...styles.buttonRow}}>
          <TouchableOpacity
            style={{...styles.bookBtn}}
            onPress={() => Actions.BookPdfScreen()}>
            <Text style={{...styles.bookBtnText}}>Book</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.lectureBtn}}
            onPress={() =>
              this.getBooks(
                selectedSubjectDetail.book,
                selectedSubjectDetail.classid,
                selectedSubjectDetail.bookname,
                selectedSubjectDetail.backgroundImage,
              )
            }>
            <Text style={{...styles.lectureBtnText}}>Lectures</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  render() {
    const {user} = this.state;
    let classId = user && user.class_id;
    return (
      <ImageBackground
        source={Images.homeBackgroundImage2}
        resizeMode={'cover'}
        style={[styles.container]}>
        <Header
          leftImage={Images.backArrowIcon2}
          leftBtnPress={() => Actions.pop()}
          rightImage={Images.subjectNavIcon}
          rightImageStyle={styles.rightImageStyle}
        />

        <ScrollView>
          <View style={{...styles.cardListContainer}}>
            {user && user.mathstep ? (
              <Card
                name={'Mathematics'}
                onPress={() =>
                  this.onPressSubject(
                    'Math',
                    classId,
                    'Mathematics',
                    'mathScreenBackImage',
                  )
                }
                containerStyle={styles.cardContainerStyle}
              />
            ) : null}

            {user && user.ilmoadab ? (
              <Card
                name={'Urdu'}
                onPress={() =>
                  this.onPressSubject(
                    'urdu',
                    classId,
                    'Urdu',
                    'urduScreenBackImage',
                  )
                }
                containerStyle={styles.cardContainerStyle}
              />
            ) : null}

            {user && user.rightscience ? (
              <Card
                name={'Science'}
                onPress={() =>
                  this.onPressSubject(
                    'Right Science',
                    classId,
                    'Right Science',
                    'scienceScreenBackImage',
                  )
                }
                containerStyle={styles.cardContainerStyle}
              />
            ) : null}

            {user && user.myworld ? (
              <Card
                name={'Social Studies'}
                onPress={() =>
                  this.onPressSubject(
                    'my world',
                    classId,
                    'Social Studies',
                    'socialScreenBackImage',
                  )
                }
                containerStyle={styles.cardContainerStyle}
              />
            ) : null}

            {user && user.islamiate ? (
              <Card
                name={'Islamiat'}
                onPress={() =>
                  this.onPressSubject(
                    'Islam',
                    classId,
                    'Islamiat',
                    'islamiatScreenBackImage',
                  )
                }
                containerStyle={styles.cardContainerStyle}
              />
            ) : null}

            {user && user.english ? (
              <Card
                name={'English'}
                onPress={() =>
                  this.onPressSubject(
                    'English',
                    classId,
                    'English',
                    'englishScreenBackground',
                  )
                }
                containerStyle={styles.cardContainerStyle}
              />
            ) : null}

            {user && user.englishpower ? (
              <Card
                name={'English Power'}
                onPress={() =>
                  this.onPressSubject(
                    'English Power',
                    classId,
                    'English Power',
                    'englishScreenBackground',
                  )
                }
                containerStyle={styles.cardContainerStyle}
              />
            ) : null}
          </View>
        </ScrollView>

        <TouchableOpacity style={{...styles.moreBtn}}>
          <Image source={Images.moreIcon} style={{...styles.moreIcon}} />
        </TouchableOpacity>

        <Modalize
          ref={(ref) => (this.modalizeRef = ref)}
          modalStyle={{...styles.modalStyle}}
          handleStyle={{...styles.handleStyle}}
          closeOnOverlayTap={true}
          handlePosition={'inside'}
          adjustToContentHeight={false}
          modalTopOffset={Metrics.screenHeight * 0.6}
          onClosed={() => this.setState({selectedSubjectDetail: null})}>
          {this.renderModalizeContent()}
        </Modalize>

        {this.renderOverlaySpinner()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  getBooks: state.getBooks,
});

const actions = {get_books};

export default connect(mapStateToProps, actions)(Subjects);
