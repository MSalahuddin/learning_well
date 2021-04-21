import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import styles from "./styles";
import { Images, Metrics, Colors } from "../../theme";
import { Actions } from "react-native-router-flux";
import {request as login_user} from '../../actions/Login';
import { SpinnerLoader } from "../../components";
import axios from "axios";
import SplashScreen from 'react-native-splash-screen'
import Util from "../../util";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",//demo_student
      password: '',//112233
      validationError: { userIdErr: false, passErr: false },
      isloading: false
    };
  }

  componentWillMount(){
    Util.isConnected()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login) {
      if (
        !nextProps.login.failure &&
        !nextProps.login.isFetching &&
        nextProps.login.data &&
        nextProps.login.data.code == 1
      ) {
        this.setState({ isloading: false, userId: "", password: '' });
        this._storeUserdata(nextProps.login.data.values[0]);
      }
      else if (nextProps.login.failure && !nextProps.login.isFetching) {
        this.setState({ isloading: false });
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

  _storeUserdata = async user => {
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(user));
      Actions.dashboard()
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
    const { userId, password } = this.state;
    if (userId === "" || userId === " ") {
      this.setState({ validationError: { userIdErr: true, passErr: false } });
      setTimeout(() => {
        this.setState({
          validationError: { userIdErr: false, passErr: false }
        });
      }, 5000);
    } 
    else if (password == "" || password == " " || password.length < 6) {
      this.setState({ validationError: { userIdErr: false, passErr: true } });
      setTimeout(() => {
        this.setState({
          validationError: { userIdErr: false, passErr: false }
        });
      }, 5000);
    } else {
      this.setState({ isloading: true });
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
    const { userId, password } = this.state;

    const payload = {
      email: userId,
      password: password
    }

    if (Util.isConnected()) {
      this.props.login_user(payload)
    } else {
      this.setState({ isloading: false });
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
    this.setState({ [state]: text });
  };

  renderOverlaySpinner = () => {
    const { isloading } = this.state;
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
    Iserr
  ) => {
    return (
      <View>
        <TextInput
              style={[{
                width: Metrics.screenWidth * 0.85,
                height: Metrics.ratio(50),
                backgroundColor: "white",
                marginHorizontal: Metrics.screenWidth * 0.075,
                borderColor: Colors.darkStaleBlue,
                borderWidth: Metrics.ratio(1),
                borderRadius: Metrics.ratio(40),
                color: "grey",
                fontSize: Metrics.ratio(16),
                fontWeight: "bold",
                paddingLeft: Metrics.ratio(20),
                marginTop: Metrics.ratio(10),
              }, state === "firstName" && {marginTop: 0}]}
              value = {value}
              placeholder={placeholder}
              keyboardType={keyboardType}
              onChangeText={text => {
                onChangeText(text, state);
              }}
              secureTextEntry={securetext}
            />
        {Iserr && (
          <View
            style={{
              marginBottom: Metrics.ratio(10),
              width: Metrics.screenWidth * 0.85,
              marginHorizontal: Metrics.screenWidth * 0.075
            }}
          >
            <Text style={{ color: Colors.darkStaleBlue }}>**{ErrTxt}</Text>
          </View>
        )}
        </View>
    );
  };

  render() {
    const {validationError} = this.state;
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={Images.backgroundImage}
          resizeMode="auto"
          resizeMode= "stretch"
          style={[styles.container, { alignItems: "center" }]}
        >
          <Text
            style={{
              fontSize: Metrics.ratio(24),
              color: Colors.darkStaleBlue,
              fontWeight: "bold",
              marginTop: Metrics.screenHeight * 0.04
            }}
          >
            Sign In
          </Text>
          <View
            style={{
              marginTop: Metrics.screenHeight * 0.25,
              alignItems: "center"
            }}
          >

          {this.renderInputfield(
              "Email / User Name",
              this.onChangeTextField,
              "default",
              false,
              "userId",
              this.state.userId,
              "Email Required must be some@example.com",
              validationError.userIdErr
            )}

            {this.renderInputfield(
              "Password",
              this.onChangeTextField,
              "default",
              true,
              "password",
              this.state.password,
              "Password must be contain atleast 6 character",
               validationError.passErr
            )}
           
           
            <TouchableOpacity
              style={{
                width: Metrics.screenWidth * 0.85,
                height: Metrics.ratio(50),
                marginHorizontal: Metrics.screenWidth * 0.75,
                marginTop: Metrics.ratio(10),
                backgroundColor: Colors.darkStaleBlue,
                borderRadius: Metrics.ratio(40),
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                this.verifyLogin();
              }}
            >
              <Text
                style={{
                  fontSize: Metrics.ratio(18),
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            {/* <View
              style={{ flexDirection: "row", marginTop: Metrics.ratio(10) }}
            >
              <Text style={{ fontSize: Metrics.ratio(16), color: "grey" }}>
                If you forgot password
              </Text>
              <Text
                style={{
                  fontSize: Metrics.ratio(14),
                  color: Colors.darkStaleBlue,
                  fontWeight: "bold",
                  marginLeft: Metrics.ratio(5)
                }}
              >
                Click here
              </Text>
            </View> */}
          </View>
          <View
            style={{
              marginTop: Metrics.screenHeight * 0.14,
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={() => Actions.signupScreen()}>
              <Text
                style={{
                  fontSize: Metrics.ratio(24),
                  color: Colors.darkStaleBlue,
                  fontWeight: "bold"
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: Metrics.ratio(16), color: "grey" }}>
              I don't have an account
            </Text>
          </View>
        </ImageBackground>
        {this.renderOverlaySpinner()}
      </View>
    );
  }
}

const mapStateToProps = state => ({ login: state.login });

const actions = {login_user};

export default connect(
  mapStateToProps,
  actions
)(LoginScreen);
