import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  AsyncStorage,
} from 'react-native';
import styles from './styles';
import {Images, Metrics, Colors} from '../../theme';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {drawerMenuSwitched as navigationChanged} from '../../actions/navigationActions';
import {request as get_all_chapters} from '../../actions/GetChapters';
import {request as get_books} from '../../actions/GetBooks';
import {SpinnerLoader} from '../../components';
import {get_quiz_API} from '../../config/WebServices';
import axios from 'axios';
import ProgressImage from 'react-native-image-progress';
import _ from 'underscore';
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
        console.log("🚀 ~ file: index.js ~ line 58 ~ LectureScreen ~ componentWillReceiveProps ~ updateResponse", updateResponse)
        updateResponse.animationResult =  updateResponse.animationResult ? updateResponse.animationResult : []

        let chapterGroup;
        let chapWithAnimation = updateResponse?.chapter_id.map(chap => {
          chapterGroup = updateResponse?.animationResult.filter(
            animation => {
              return animation.ChapterId == chap.id;
            },
          );
          return Object.assign({}, chap, {animation: chapterGroup});
        });

        //   let mergeArray =  nextProps.getChapter.data.animation.map(itm => ({
        //       ...nextProps.getChapter.data.chapter.find((item) => (item.id === itm.ChapterId) && item),
        //       ...itm
        //   }));

        // let mergeLecture =  mergeArray && Object.values(mergeArray.reduce((c,v)=>{
        //     let k = v.ChapterId; //Using the values as key.
        //     c[ k ] = c[ k ] || [];
        //     c[ k ].push( v );
        //     return c;
        // },{}));
        // console.log(mergeLecture,'jjjjjjjjjjkkkkkkkkkkkkkk')
        // let chapter = Object.values(nextProps.getChapter.data.chapter.reduce((c,v)=>{
        //     let k = v.chapter_no; //Using the values as key.
        //     c[ k ] = c[ k ] || [];
        //     c[ k ].push( v );
        //     return c;
        // },{}))
        // console.log(mergeArray,'ooooooooo11221oooooooooooooooo')
        // let mergeArray = _.map(nextProps.getChapter.data.animation, function(item){
        //       return _.extend(item, _.findWhere(nextProps.getChapter.data.chapter, {id ChapterId: item.id }));
        //     });
        //     console.log(mergeArray,'ooooooooo111oooooooooooooooo')
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
            this.state.responseData.animationResult.map(animation => {
              if (animation.status == 'active') {
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
      if(quiz.data?.code == 0){
        Alert.alert("Message", "There is no question")
      }
      else{
        Actions.quizScreen({quiz: quiz.data.questions, chapterName, bookName});
      }
      console.log("🚀 ~ file: index.js ~ line 170 ~ LectureScreen ~ navigateQuiz= ~ quiz", quiz.data)
      //    this.setState({quiz: quiz.data.data, isloading: false})
    } catch (ex) {
      if (ex && ex.data && ex.data.message) {
        Alert.alert('', ex.data.message);
      }
      this.setState({isloading: false});
    }
  };

  getQuiz = chapterId => {
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
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

  renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderVideosList = chap => {
    const {lecture} = this.state;
    let lecNotFound = false;
    return lecture.map(lec => {
      lecNotFound = true;
      if (chap.id === lec[0].ChapterId) {
        return (
          <FlatList
            data={lec}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginTop: Metrics.ratio(5)}}
            renderItem={({item, index}) => {
              lecNotFound = false;
              return (
                <View>
                  {
                    <View>
                      <Text style={styles.chapterHeadingText}>
                        {item.topic}
                      </Text>
                    </View>
                  }
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigationChanged('', 'videoPlayer');
                      Actions.videoPlayerScreen({lecture: item});
                      // this.props.navigation.navigate("videoPlayerScreen", {
                      //     screen: "videoPlayerScreen"
                      //   });
                    }}
                    style={{
                      marginLeft: Metrics.ratio(10),
                      overflow: 'hidden',
                      marginTop: Metrics.ratio(5),
                      borderRadius: Metrics.ratio(12),
                      width: Metrics.screenWidth * 0.55,
                      height: Metrics.ratio(120),
                      borderColor: '#055085',
                      borderWidth: Metrics.ratio(1),
                      borderRadius: Metrics.ratio(5),
                      backgroundColor: 'transparent',
                    }}>
                    {/* <View style = {{position: 'absolute', zIndex: 100, justifyContent:'center', alignItems: 'center', width: Metrics.ratio(40), height: Metrics.ratio(40), borderRadius: 100, backgroundColor: 'white', elevation: 8, marginVertical: Metrics.ratio(40), marginHorizontal: Metrics.ratio(80)}}>
                                <Icon
                                    style={{}}
                                    size={20}
                                    color={'grey'}
                                    name={"play"}
                                />
                            </View> */}
                    <ProgressImage
                      resizeMode="stretch"
                      resizeMethod="auto"
                      style={{
                        width: Metrics.screenWidth * 0.55,
                        height: Metrics.ratio(120),
                        elevation: 4,

                        overflow: 'hidden',
                      }}
                      source={{
                        uri: `https://learningwell.pk/${item.ThumbPath}`,
                      }}
                      indicatorProps={{
                        borderWidth: 0,
                        color: Colors.darkStaleBlue,
                        unfilledColor: 'rgba(200, 200, 200, 0.2)',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            ListFooterComponent={() => (
              <View style={{width: Metrics.ratio(10)}} />
            )}
          />
        );
      }
    });
  };

  renderEmptyLectureView = () => {
    return (
      <View
        style={{
          height: Metrics.ratio(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.notContentAvailable}>
          Video Content is not available will be updated soon
          {/* There is no lectures releated to this chapter  */}
        </Text>
      </View>
    );
  };

  renderVideoContainer = item => {
    return (
      <View>
        {
          <View>
            <Text style={styles.chapterHeadingText}>{item.topic}</Text>
          </View>
        }
        <TouchableOpacity
          onPress={() => {
            this.props.navigationChanged('', 'videoPlayer');
            Actions.videoPlayerScreen({lecture: item});
          }}
          style={{
            marginLeft: Metrics.ratio(10),
            overflow: 'hidden',
            marginTop: Metrics.ratio(5),
            borderRadius: Metrics.ratio(12),
            width: Metrics.screenWidth * 0.55,
            height: Metrics.ratio(120),
            borderColor: '#055085',
            borderWidth: Metrics.ratio(1),
            borderRadius: Metrics.ratio(5),
            backgroundColor: 'transparent',
          }}>
          <ProgressImage
            resizeMode="stretch"
            resizeMethod="auto"
            style={{
              width: Metrics.screenWidth * 0.55,
              height: Metrics.ratio(120),
              elevation: 4,

              overflow: 'hidden',
            }}
            source={{uri: `https://learningwell.pk/${item.ThumbPath}`}}
            indicatorProps={{
              borderWidth: 0,
              color: Colors.darkStaleBlue,
              unfilledColor: 'rgba(200, 200, 200, 0.2)',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  renderChapterList = () => {
    const {lecture, chapters, chapWithAnimation} = this.state;
    // console.log(lecture,'lettttttttttttttt')
    const {book} = this.props;
    // {this.renderVideosList()}
    // console.log(this.state.responseData,'chapters')
    console.log(chapWithAnimation, 'chapWithAnimationchapWithAnimation');

    return (
      <ScrollView>
        <View>
          {chapWithAnimation.map((chap, index) => {
            return (
              <View
                style={[
                  chapWithAnimation.length === index + 1 && {
                    marginBottom: Metrics.screenHeight * 0.09,
                  },
                ]}>
                <View style={[{marginTop: Metrics.ratio(5)}]}>
                  <Text style={styles.chapterHeadingText}>{chap.name}</Text>
                </View>
                {!chap.animation.length && this.renderEmptyLectureView(chap)}
                {chap.animation.length != 0 && (
                  <FlatList
                    data={chap.animation}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop: Metrics.ratio(5)}}
                    renderItem={item => {
                      return (
                        <View>{this.renderVideoContainer(item.item)}</View>
                      );
                    }}
                  />
                )}
                {/* {this.renderVideoContainer(chap)} */}
                <TouchableOpacity
                  onPress={() => {
                    this.navigateQuiz(chap.id, chap.name);
                  }}
                  style={{
                    width: Metrics.screenWidth * 0.25,
                    height: Metrics.ratio(44),
                    borderRadius: Metrics.ratio(20),
                    backgroundColor: Colors.darkStaleBlue,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Metrics.ratio(10),
                    marginBottom: Metrics.ratio(5),
                    marginLeft: Metrics.screenWidth * 0.03,
                  }}>
                  <Text style={{fontSize: Metrics.ratio(16), color: 'white'}}>
                    Quiz
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
      // <ScrollView>
      //   <View>
      //     {chapWithAnimation.map((items) => {
      //       return(
      //         <FlatList
      //           data={items}
      //           horizontal
      //           showsHorizontalScrollIndicator={false}
      //           style={{ marginTop: Metrics.ratio(5) }}
      //           renderItem={({ item, index }) => {
      //             if(item.id){
      //               return(
      //                 <View style = {{marginTop: Metrics.ratio(5)}}>

      //                   <Text style = {styles.chapterHeadingText}>
      //                     {index == 0 && item.name}
      //                   </Text>

      //                   {this.renderVideoContainer(item)}
      //                   {/* {this.renderVideosList(item)} */}
      //                   {index == 0 &&
      //                    <TouchableOpacity
      //                         onPress = {() => {
      //                             this.navigateQuiz(item.id, item.name)
      //                         }}
      //                         style = {{width: Metrics.screenWidth * 0.25, height: Metrics.ratio(44), borderRadius: Metrics.ratio(20), backgroundColor: Colors.darkStaleBlue, justifyContent: 'center', alignItems: 'center', marginTop: Metrics.ratio(10), marginBottom: Metrics.ratio(5), marginLeft: Metrics.screenWidth * 0.03}}>
      //                         <Text style = {{fontSize: Metrics.ratio(16), color: 'white'}}>Quiz</Text>
      //                   </TouchableOpacity>}
      //                 </View>
      //                 )
      //             }
      //           }}
      //         />
      //         // <View>
      //         //   {items.map((item) => {
      //         //     if(item.id){
      //         //       return(
      //         //         <View style = {{marginTop: Metrics.ratio(5)}}>
      //         //           <Text style = {styles.chapterHeadingText}>
      //         //             {item.name}
      //         //           </Text>

      //         //           {/* {this.renderVideosList(item)} */}
      //         //           { <TouchableOpacity
      //         //                 onPress = {() => {
      //         //                     this.navigateQuiz(item.id, item.name)
      //         //                 }}
      //         //                 style = {{width: Metrics.screenWidth * 0.25, height: Metrics.ratio(44), borderRadius: Metrics.ratio(20), backgroundColor: Colors.darkStaleBlue, justifyContent: 'center', alignItems: 'center', marginTop: Metrics.ratio(10), marginBottom: Metrics.ratio(5), marginLeft: Metrics.screenWidth * 0.03}}>
      //         //                 <Text style = {{fontSize: Metrics.ratio(16), color: 'white'}}>Quiz</Text>
      //         //           </TouchableOpacity>}
      //         //         </View>
      //         //         )
      //         //       }
      //         //     })
      //         //     }
      //         // </View>
      //       )
      //     })}
      //     {/* {chapters.map((items, index) => {

      //       return(
      //         <View>
      //           <View style = {{
      //             width: Metrics.screenWidth * 0.5,
      //             height: Metrics.ratio(44),
      //             borderRadius: Metrics.ratio(20),
      //             justifyContent: 'center',
      //             alignItems: 'center',
      //             marginLeft: Metrics.ratio(10),
      //             backgroundColor: Colors.darkStaleBlue}}>
      //            <Text style = {{fontSize: Metrics.ratio(16), color: 'white'}}>Chapter # {index + 1}</Text>
      //           </View>
      //         {items.map((item) => {
      //           return(
      //             <View style = {{marginTop: Metrics.ratio(5)}}>
      //               <Text style = {styles.chapterHeadingText}>
      //                 {item.name}
      //               </Text>

      //               {this.renderEmptyLectureView(lecture)}
      //               {this.renderVideosList(item)}
      //               { <TouchableOpacity
      //                     onPress = {() => {
      //                         this.navigateQuiz(item.id, item.name)
      //                     }}
      //                     style = {{width: Metrics.screenWidth * 0.25, height: Metrics.ratio(44), borderRadius: Metrics.ratio(20), backgroundColor: Colors.darkStaleBlue, justifyContent: 'center', alignItems: 'center', marginTop: Metrics.ratio(10), marginBottom: Metrics.ratio(5), marginLeft: Metrics.screenWidth * 0.03}}>
      //                     <Text style = {{fontSize: Metrics.ratio(16), color: 'white'}}>Quiz</Text>
      //               </TouchableOpacity>}
      //             </View>
      //         )
      //         })
      //         }
      //         </View>
      //       )
      //     })} */}
      //   </View>
      // </ScrollView>
    );
  };

  render() {
    const {lecture, chapters, responseData, animationLength} = this.state;
    const {bookName, backgroundImage} = this.props;

    //    const chapter =  this.state.chapters && Object.values(this.state.chapters.reduce((c,v)=>{
    //     let k = v.chapter_no; //Using the values as key.
    //     c[ k ] = c[ k ] || [];
    //     c[ k ].push( v );
    //     return c;
    // },{}))

    let videoCount = 0;
    return (
      <View style={styles.mainContainer}>
        {/*  */}
        <ImageBackground
          source={Images[backgroundImage]}
          resizeMode="auto"
          resizeMode="stretch"
          style={[styles.container]}>
          <TouchableOpacity
            onPress={() => {
              Actions.dashboard();
              // this.props.navigation.navigate("dashboard", {
              // screen: "dashboard"
              //   })
            }}
            style={styles.backIcon}>
            <Image
              resizeMode="contain"
              resizeMethod="auto"
              style={{
                width: Metrics.ratio(20),
                height: Metrics.ratio(20),
              }}
              source={Images.backArrowIcon}
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.courseNameText}>{this.props.bookName}</Text>
            <Text style={styles.courseDetailText}>
              {chapters && chapters.length} Chapters | {animationLength} Videos
            </Text>
          </View>
          <View
            style={{
              marginTop: Metrics.ratio(30),
              marginBottom: Metrics.screenHeight * 0.17,
            }}>
            {lecture && this.renderChapterList()}
          </View>
        </ImageBackground>
        {this.renderOverlaySpinner()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
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

export default connect(
  mapStateToProps,
  actions,
)(LectureScreen);
