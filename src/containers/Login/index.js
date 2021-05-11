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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import {Images, Metrics, Colors} from '../../theme';
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
    }
  }

  _storeUserdata = async (user) => {
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(user));
      Actions.dashboard();
    } catch (e) {
      console.log(e);
    }
  };

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
