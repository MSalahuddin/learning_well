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
  AsyncStorage,
  Image,
} from 'react-native';
import styles from './styles';
import {Images, Metrics, Colors} from '../../theme';
import {Actions} from 'react-native-router-flux';
import {request as login_user} from '../../actions/Login';
import {SpinnerLoader} from '../../components';
import Util from '../../util';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '', //demo_student
      password: '', //112233
      validationError: {userIdErr: false, passErr: false},
      isloading: false,
    };
  }

  componentWillMount() {
    Util.isConnected();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login) {
      if (
        !nextProps.login.failure &&
        !nextProps.login.isFetching &&
        nextProps.login.data &&
        nextProps.login.data.code === 1
      ) {
        this.setState({isloading: false, userId: '', password: ''});
        this._storeUserdata(nextProps.login.data.values[0]);
      } else if (nextProps.login.failure && !nextProps.login.isFetching) {
        this.setState({isloading: false});
      }
      // else if( !nextProps.login.failure &&
      //   !nextProps.login.isFetching &&
      //   nextProps.login.data &&
      //   nextProps.login.data.code == 0){
      //     Alert.alert("LearningWell", "User does not exist")
      //   this.setState({ isloading: false });
      // }
    }
  }

  // componentWillMount(){
  //   this.getData()
  //   // setTimeout(() => {

  //   // },1000)
  // }

  // getData = async () => {
  //   console.log("jjjjjjjjjjjjjjjjjjj")
  //   try {
  //     const value = await AsyncStorage.getItem('@storage_Key');
  //     if (value !== null) {

  //       // Actions.dashboard({type: 'reset'})
  //       this.props.navigation.navigate("dashboard", {
  //         screen: "dashboard"
  //     });
  //       setTimeout(() => {
  //         SplashScreen.hide()
  //       },1000)
  //     }
  //     else{
  //       SplashScreen.hide()
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     // error reading value
  //   }
  // };

  _storeUserdata = async (user) => {
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(user));
      Actions.dashboard();
      // this.props.navigation.navigate("dashboard", {
      //   screen: "dashboard"
      // });
      // this.props.updateUser(user)
    } catch (e) {
      // saving error
    }
  };

  // getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@storage_Key');
  //     if (value !== null) {
  //       console.log('asasassa', JSON.parse(value));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     // error reading value
  //   }
  // };

  // geturl = () => {
  //   axios
  //     .get(`https://api.vimeo.com/users/104857318/videos/104857318`, {
  //       headers: {
  //         "Content-Type": "application/vnd.vimeo.video+json",

  //       }
  //     })
  //     .then(response => {
  //       console.log(response,eeeeeeeeeeee)
  //     })
  //     .catch(error => {
  //       console.log(error,'rrrrrrrrrrrrrrrr')
  //     });

  // }

  verifyLogin = () => {
    const {userId, password} = this.state;
    if (userId === '' || userId === ' ') {
      this.setState({validationError: {userIdErr: true, passErr: false}});
      setTimeout(() => {
        this.setState({
          validationError: {userIdErr: false, passErr: false},
        });
      }, 5000);
    } else if (password === '' || password === ' ' || password.length < 6) {
      this.setState({validationError: {userIdErr: false, passErr: true}});
      setTimeout(() => {
        this.setState({
          validationError: {userIdErr: false, passErr: false},
        });
      }, 5000);
    } else {
      this.setState({isloading: true});
      this.handleLogin();
    }
    // else if (userId != "") {
    //   let x = userId;
    //   var atpos = x.indexOf("@");
    //   var dotpos = x.lastIndexOf(".");
    //   if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
    //     this.setState({ validationError: { userIdErr: true, passErr: false } });
    //     setTimeout(() => {
    //       this.setState({
    //         validationError: { userIdErr: false, passErr: false }
    //       });
    //     }, 3000);
    //   } else if (password == "" || password == " " || password.length < 6) {
    //     this.setState({ validationError: { userIdErr: false, passErr: true } });
    //     setTimeout(() => {
    //       this.setState({
    //         validationError: { userIdErr: false, passErr: false }
    //       });
    //     }, 5000);
    //   } else {
    //     this.setState({ isloading: true });
    //     this.handleLogin();
    //   }
    // }
  };

  handleLogin = () => {
    const {userId, password} = this.state;

    const payload = {
      email: userId,
      password: password,
    };

    if (Util.isConnected()) {
      this.props.login_user(payload);
    } else {
      this.setState({isloading: false});
      Alert.alert('Learningwell', 'Please Check Your Internet Connection!');
    }

    // if (userId === "demo" || (userId === "Demo" && password === "112233")) {
    //   this.setState({ userId: null, password: null });
    //   this.props.navigation.navigate("dashboard", {
    //     screen: "dashboard"
    //   });
    // } else {
    //   Alert.alert("Error", "User ID and Password is incorrect");
    // }
  };

  onChangeTextField = (text, state) => {
    this.setState({[state]: text});
  };

  renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderInputfield = (
    placeholder,
    onChangeText,
    keyboardType,
    securetext,
    state,
    value,
    ErrTxt,
    Iserr,
  ) => {
    return (
      <View>
        <TextInput
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.textInput,
            marginTop: state === 'firstName' ? 0 : Metrics.ratio(10),
          }}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={(text) => {
            onChangeText(text, state);
          }}
          secureTextEntry={securetext}
        />
        {Iserr && (
          <View
            style={{
              marginBottom: Metrics.ratio(10),
              width: Metrics.screenWidth * 0.85,
              marginHorizontal: Metrics.screenWidth * 0.075,
            }}>
            <Text style={{color: Colors.darkStaleBlue}}>**{ErrTxt}</Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    const {validationError} = this.state;
    return (
      <ImageBackground
        source={Images.homeBackgroundImage2}
        resizeMode={'cover'}
        style={{...styles.container}}>
        <ScrollView>
          <View style={{...styles.bodyContainer}}>
            <Image source={Images.logo} style={{...styles.logo}} />

            <Text style={{...styles.headingText}}>Sign In</Text>

            {this.renderInputfield(
              'User ID',
              this.onChangeTextField,
              'default',
              false,
              'userId',
              this.state.userId,
              'Email Required must be some@example.com',
              validationError.userIdErr,
            )}

            {this.renderInputfield(
              'Password',
              this.onChangeTextField,
              'default',
              true,
              'password',
              this.state.password,
              'Password must be contain atleast 6 character',
              validationError.passErr,
            )}

            <TouchableOpacity
              style={{...styles.button}}
              onPress={() => {
                this.verifyLogin();
              }}>
              <Text style={{...styles.buttonText}}>Sign In</Text>
            </TouchableOpacity>

            {/* <View style={{...styles.forgotPasswordContainer}}>
              <Text style={{...styles.forgotPasswordText}}>
                If you forgot password
              </Text>
              <Text style={{...styles.clickHereText}}>Click here</Text>
            </View> */}
          </View>
          <View style={{...styles.registerContainer}}>
            <TouchableOpacity onPress={() => Actions.signupScreen()}>
              <Text style={{...styles.registerHeading}}>Register</Text>
            </TouchableOpacity>

            <View style={{...styles.registerMsgContainer}}>
              <Text style={{...styles.registerMsgText}}>
                If you don't have an account please{' '}
              </Text>

              <TouchableOpacity onPress={() => Actions.signupScreen()}>
                <Text style={{...styles.registerText}}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this.renderOverlaySpinner()}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({login: state.login});

const actions = {login_user};

export default connect(mapStateToProps, actions)(LoginScreen);
