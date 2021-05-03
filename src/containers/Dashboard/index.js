// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import styles from './styles';
import {Metrics, Colors, Images} from '../../theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {request as get_books} from '../../actions/GetBooks';
import {Actions} from 'react-native-router-flux';
import {SpinnerLoader} from '../../components';
import Util from '../../util';

class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      bookName: '',
      backgroundImage: null,
      isloading: false,
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
        nextProps.getBooks.data.code == 1
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

  getBooks = (book, classid, bookname, backgroundImage) => {
    const {user} = this.state;

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

  renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  render() {
    const {user} = this.state;
    let classId = user && user.class_id;
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={Images.homeBackgroundImage}
          resizeMode="auto"
          resizeMode="stretch"
          style={[styles.container]}>
          <TouchableOpacity
            style={{
              width: Metrics.ratio(40),
              height: Metrics.ratio(40),
              backgroundColor: 'transparent',
              borderRadius: 100,
              elevation: 8,
              marginTop: Metrics.ratio(30),
              marginLeft: Metrics.ratio(15),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => Actions.pop()}>
            {/* <Icon
              style={{}}
              size={20}
              color={Colors.darkStaleBlue}
              name={"bars"}
            /> */}
            <Image
              source={Images.backArrowIcon}
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
                borderRadius: 100,
              }}
            />
          </TouchableOpacity>
          <View style={{marginTop: Metrics.ratio(20)}}>
            <Text
              style={{
                color: 'black',
                marginLeft: Metrics.ratio(15),
                fontSize: Metrics.ratio(16),
              }}>
              Welcome
            </Text>
            <View
              style={{flexDirection: 'row', width: Metrics.screenWidth * 0.43}}>
              {user && (
                <Text
                  style={{
                    color: 'black',
                    marginLeft: Metrics.ratio(15),
                    fontSize: Metrics.ratio(16),
                    fontWeight: 'bold',
                  }}>
                  {user && user.fullname}
                </Text>
              )}
            </View>
          </View>
          <ScrollView
            style={{
              width: Metrics.screenWidth,
              marginTop: Metrics.ratio(45),
              bottom: Metrics.ratio(30),
            }}>
            <View
              style={{
                width: Metrics.screenWidth * 0.9,
                flexDirection: 'row',
                marginLeft: Metrics.screenWidth * 0.04,
                marginVertical: Metrics.screenWidth * 0.025,
                marginTop: Metrics.ratio(80),
              }}>
              {/*  */}
              {user && user.mathstep ? (
                <TouchableOpacity
                  onPress={() => {
                    this.getBooks(
                      'Math',
                      classId,
                      'Mathematics',
                      'mathScreenBackImage',
                    );
                  }}>
                  <ImageBackground
                    style={{
                      width: Metrics.screenWidth * 0.45,
                      height: Metrics.ratio(80),
                      marginRight: Metrics.screenWidth * 0.025,
                    }}
                    source={Images.mathematicsBackground}
                    resizeMode="auto"
                    resizeMode="cover">
                    <Text
                      style={{
                        color: 'white',
                        fontSize: Metrics.ratio(14),
                        fontWeight: 'bold',
                        marginTop: Metrics.ratio(30),
                        marginLeft: Metrics.ratio(45),
                        width: Metrics.ratio(100),
                      }}>
                      Mathematics
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ) : null}
              {user && user.ilmoadab ? (
                <TouchableOpacity
                  onPress={() => {
                    this.getBooks(
                      'urdu',
                      classId,
                      'Urdu',
                      'urduScreenBackImage',
                    );
                  }}>
                  <ImageBackground
                    style={{
                      width: Metrics.screenWidth * 0.45,
                      height: Metrics.ratio(80),
                      marginRight: Metrics.screenWidth * 0.025,
                      borderRadius: 10,
                    }}
                    source={Images.urduBackground}
                    resizeMode="auto"
                    resizeMode="cover">
                    <Text
                      style={{
                        color: 'white',
                        fontSize: Metrics.ratio(14),
                        fontWeight: 'bold',
                        marginTop: Metrics.ratio(30),
                        marginLeft: Metrics.ratio(45),
                        width: Metrics.ratio(100),
                      }}>
                      Urdu
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ) : null}
            </View>
            <View
              style={{
                width: Metrics.screenWidth * 0.9,
                flexDirection: 'row',
                marginLeft: Metrics.screenWidth * 0.04,

                marginVertical: Metrics.screenWidth * 0.025,
              }}>
              {user && user.rightscience ? (
                <TouchableOpacity
                  onPress={() => {
                    this.getBooks(
                      'Right Science',
                      classId,
                      'Right Science',
                      'scienceScreenBackImage',
                    );
                  }}>
                  <ImageBackground
                    style={{
                      width: Metrics.screenWidth * 0.45,
                      height: Metrics.ratio(80),
                      marginRight: Metrics.screenWidth * 0.025,
                      borderRadius: 10,
                    }}
                    source={Images.right_science}
                    resizeMode="auto"
                    resizeMode="cover">
                    <Text
                      style={{
                        color: 'white',
                        fontSize: Metrics.ratio(14),
                        fontWeight: 'bold',
                        marginTop: Metrics.ratio(30),
                        marginLeft: Metrics.ratio(45),
                        width: Metrics.ratio(100),
                      }}>
                      Science
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ) : null}
              {user && user.myworld ? (
                <TouchableOpacity
                  onPress={() => {
                    this.getBooks(
                      'my world',
                      classId,
                      'Social Studies',
                      'socialScreenBackImage',
                    );
                  }}>
                  <ImageBackground
                    style={{
                      width: Metrics.screenWidth * 0.45,
                      height: Metrics.ratio(80),
                      marginRight: Metrics.screenWidth * 0.025,
                      borderRadius: 10,
                    }}
                    source={Images.socialBackground}
                    resizeMode="auto"
                    resizeMode="cover">
                    <Text
                      style={{
                        color: 'white',
                        fontSize: Metrics.ratio(14),
                        fontWeight: 'bold',
                        marginTop: Metrics.ratio(30),
                        marginLeft: Metrics.ratio(45),
                        width: Metrics.ratio(100),
                      }}>
                      Social Studies
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ) : null}
            </View>
            <View
              style={{
                width: Metrics.screenWidth * 0.95,
                flexDirection: 'row',
                marginHorizontal: Metrics.ratio(15),

                marginVertical: Metrics.screenWidth * 0.025,
              }}>
              {user && user.islamiate ? (
                <TouchableOpacity
                  onPress={() => {
                    this.getBooks(
                      'Islam',
                      classId,
                      'Islamiat',
                      'islamiatScreenBackImage',
                    );
                  }}>
                  <ImageBackground
                    style={{
                      width: Metrics.screenWidth * 0.45,
                      height: Metrics.ratio(80),
                      marginRight: Metrics.screenWidth * 0.025,
                      borderRadius: 10,
                    }}
                    source={Images.competatitiveBackground}
                    resizeMode="auto"
                    resizeMode="cover">
                    <Text
                      style={{
                        color: 'white',
                        fontSize: Metrics.ratio(14),
                        fontWeight: 'bold',
                        marginTop: Metrics.ratio(30),
                        marginLeft: Metrics.ratio(45),
                        width: Metrics.ratio(100),
                      }}
                    />
                  </ImageBackground>
                </TouchableOpacity>
              ) : null}
              {user && user.english ? (
                <TouchableOpacity
                  onPress={() => {
                    this.getBooks(
                      'English',
                      classId,
                      'English',
                      'englishScreenBackground',
                    );
                  }}>
                  <ImageBackground
                    style={{
                      width: Metrics.screenWidth * 0.45,
                      height: Metrics.ratio(80),
                      marginRight: Metrics.screenWidth * 0.025,
                      borderRadius: 10,
                    }}
                    source={Images.englishBackggroundImage}
                    resizeMode="auto"
                    resizeMode="cover">
                    {/* <Text style = {{color: 'white', fontSize: Metrics.ratio(14), fontWeight: 'bold', marginTop: Metrics.ratio(30), marginLeft: Metrics.ratio(45), width: Metrics.ratio(100)}}>English</Text>  */}
                  </ImageBackground>
                </TouchableOpacity>
              ) : null}
            </View>

            <View
              style={{
                width: Metrics.screenWidth * 0.95,
                flexDirection: 'row',
                marginHorizontal: Metrics.ratio(15),

                marginVertical: Metrics.screenWidth * 0.025,
              }}>
              {/* <TouchableOpacity onPress = {() => {
                 this.getBooks("Science",classId, "Science", "scienceScreenBackImage");
              }}>
              <ImageBackground
                style={{
                  width: Metrics.screenWidth * 0.45,
                  height: Metrics.ratio(80),
                  marginRight: Metrics.screenWidth * 0.025,
                  borderRadius: 10,
                }}
                
                source={Images.scienceBackground}
                resizeMode="auto"
                resizeMode="cover"
              >
              <Text style = {{color: 'white', fontSize: Metrics.ratio(14), fontWeight: 'bold', marginTop: Metrics.ratio(30), marginLeft: Metrics.ratio(45), width: Metrics.ratio(100)}}>Science</Text>
              </ImageBackground>
              </TouchableOpacity> */}
              {user && user.englishpower ? (
                <TouchableOpacity
                  onPress={() => {
                    this.getBooks(
                      'English Power',
                      classId,
                      'English Power',
                      'englishScreenBackground',
                    );
                  }}>
                  <ImageBackground
                    style={{
                      width: Metrics.screenWidth * 0.45,
                      height: Metrics.ratio(80),
                      // marginRight: Metrics.screenWidth * 0.025,
                      borderRadius: 10,
                    }}
                    source={Images.english_power}
                    resizeMode="auto"
                    resizeMode="cover">
                    <Text
                      style={{
                        color: 'white',
                        fontSize: Metrics.ratio(14),
                        fontWeight: 'bold',
                        marginTop: Metrics.ratio(30),
                        width: Metrics.ratio(100),
                        marginLeft: Metrics.ratio(45),
                      }}>
                      English Power
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ) : null}
            </View>

            {/* <View
              style={{
                marginLeft: Metrics.screenWidth * 0.05,
                width: Metrics.screenWidth * 0.9,
                height: Metrics.ratio(80),
                marginRight: Metrics.screenWidth * 0.025,
                borderRadius: 10,
                backgroundColor: Colors.darkStaleBlue,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: Metrics.ratio(14),
                  fontWeight: 'bold',
                }}>
                Important Notice:
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: Metrics.ratio(16),
                  fontWeight: 'bold',
                }}>
                The Application in development mode
              </Text>
            </View> */}
          </ScrollView>
        </ImageBackground>
        {this.renderOverlaySpinner()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  getBooks: state.getBooks,
});

const actions = {get_books};

export default connect(mapStateToProps, actions)(Subjects);
