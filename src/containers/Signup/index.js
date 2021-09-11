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
} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import ModalDropdown from 'react-native-modal-dropdown';
import ModalSelector from 'react-native-modal-selector';

import styles from './styles';

import {Images, Metrics} from '../../theme';
import {request as register_user} from '../../actions/RegisterAction';
import Util from '../../util';
import {SpinnerLoader} from '../../components';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      fatherName: '',
      userId: '',
      password: '',
      email: '',
      mobileNo: '',
      classId: 0,
      isloading: false,
      classOptions: [
        {label: 'Class 1', key: 1},
        {label: 'Class 2', key: 2},
        {label: 'Class 3', key: 3},
        {label: 'Class 4', key: 4},
        {label: 'Class 5', key: 5},
        {label: 'Class 6', key: 6},
        {label: 'Class 7', key: 7},
        {label: 'Class 8', key: 8},
      ],
    };
  }

  componentWillMount() {
    Util.isConnected();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.register.data);
    if (nextProps.register) {
      if (
        !nextProps.register.failure &&
        !nextProps.register.isFetching &&
        nextProps.register.data.code === 1
      ) {
        this.setState({
          isloading: false,
          firstName: '',
          fatherName: '',
          userId: '',
          password: '',
          email: '',
          mobileNo: '',
          classId: 0,
        });
        Alert.alert('Success', nextProps.register.data.msg);
        Actions.loginScreen();
      } else if (nextProps.register.failure && !nextProps.register.isFetching) {
        this.setState({isloading: false});
      }
    }
  }

  onChangeTextField = (text, state) => {
    this.setState({[state]: text});
  };

  verifyRegitration = () => {
    const {
      firstName,
      fatherName,
      email,
      mobileNo,
      password,
      classId,
    } = this.state;
    if (firstName === '') {
      Alert.alert('Validation', 'First name is required');
    } else if (fatherName === '') {
      Alert.alert('Validation', 'Father name is required');
    } else if (password === '' || password.length < 5) {
      Alert.alert(
        'Validation',
        'Password is required or must be 6 characters long',
      );
    } else if (email === '' || email === ' ') {
      Alert.alert('Validation', 'Email is required');
    } else if (mobileNo === '') {
      Alert.alert('Validation', 'Mobile number is required');
    } else if (classId === 0) {
      Alert.alert('Validation', 'Class is required');
    } else {
      console.log('kkkkkkkkkkkkkkchalraga g');
      this.setState({isloading: true});
      this.handleRegistration();
    }
  };

  handleRegistration = () => {
    const {
      firstName,
      fatherName,
      email,
      mobileNo,
      password,
      classId,
    } = this.state;
    let payload = {
      first_name: firstName,
      fathername: fatherName,
      email: email,
      mobile_no: mobileNo,
      password: password,
      classId: classId,
    };
    if (Util.isConnected()) {
      this.props.register_user(payload);
    } else {
      this.setState({isloading: false});
      Alert.alert('Learningwell', 'Please Check Your Internet Connection!');
    }
  };

  // onDropdonSelect = (val) => {
  //   this.setState({classId: parseInt(val) + 1});
  // };

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
    ErrTxt,
    Iserr,
  ) => {
    return (
      <TextInput
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.textInput,
          marginTop: state === 'firstName' ? 0 : Metrics.ratio(10),
        }}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={(text) => {
          onChangeText(text, state);
        }}
        secureTextEntry={securetext}
      />
    );
  };

  // renderDropdown = () => {
  //   return (
  //     <ModalDropdown
  //       defaultValue={'Select Class'}
  //       options={[
  //         'Class 1',
  //         'Class 2',
  //         'Class 3',
  //         'Class 4',
  //         'Class 5',
  //         'Class 6',
  //         'Class 7',
  //         'Class 8',
  //       ]}
  //       style={{...styles.modalDropdown}}
  //       dropdownStyle={{...styles.dropdownStyle}}
  //       textStyle={{...styles.textStyle}}
  //       animated={true}
  //       onSelect={(val) => {
  //         this.onDropdonSelect(val);
  //       }}
  //     />
  //   );
  // };

  render() {
    return (
      <View style={{...styles.container}}>
        <ScrollView>
          <ImageBackground
            source={Images.homeBackgroundImage2}
            resizeMode={'cover'}
            style={{height: Metrics.screenHeight}}>
            <Text style={{...styles.headingText}}>Register</Text>

            <View style={{...styles.formContainer}}>
              {this.renderInputfield(
                'First Name',
                this.onChangeTextField,
                'default',
                false,
                'firstName',
              )}

              {this.renderInputfield(
                'Father Name',
                this.onChangeTextField,
                'default',
                false,
                'fatherName',
              )}

              {/* {this.renderInputfield(
              "User Name",
              this.onChangeTextField,
              "default",
              false,
              "userId"
            )} */}

              {this.renderInputfield(
                'Email / User Name',
                this.onChangeTextField,
                'default',
                false,
                'email',
              )}

              {this.renderInputfield(
                'Password',
                this.onChangeTextField,
                'default',
                true,
                'password',
              )}
              {this.renderInputfield(
                'Mobile',
                this.onChangeTextField,
                'numeric',
                false,
                'mobileNo',
              )}

              {/* {this.renderDropdown()} */}

              <ModalSelector
                selectStyle={{...styles.selectStyle}}
                initValueTextStyle={{...styles.initValueTextStyle}}
                optionTextStyle={{...styles.optionTextStyle}}
                cancelTextStyle={{...styles.cancelTextStyle}}
                selectTextStyle={{...styles.selectTextStyle}}
                data={this.state.classOptions}
                initValue={'Select Class'}
                key={'Select Class'}
                onChange={(val) => this.setState({classId: parseInt(val.key)})}
              />

              <TouchableOpacity
                style={{...styles.submitButton}}
                onPress={() => this.verifyRegitration()}>
                <Text style={{...styles.submitButtonText}}>Submit</Text>
              </TouchableOpacity>
            </View>

            <View style={{...styles.signInContainer}}>
              <TouchableOpacity onPress={() => Actions.loginScreen()}>
                <Text style={{...styles.signInHeading}}>Sign In</Text>
              </TouchableOpacity>

              <View style={{...styles.signInMsgContainer}}>
                <Text style={{...styles.signInMsgText}}>
                  If you have already an account please{' '}
                </Text>

                <TouchableOpacity onPress={() => Actions.loginScreen()}>
                  <Text style={{...styles.signInText}}>sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
        {this.renderOverlaySpinner()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({register: state.register});

const actions = {register_user};

export default connect(mapStateToProps, actions)(SignupScreen);
