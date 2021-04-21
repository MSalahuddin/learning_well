import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity, Alert
} from "react-native";
import styles from "./styles";
import { Images, Metrics, Colors } from "../../theme";
import { Actions } from "react-native-router-flux";
import {request as register_user} from '../../actions/RegisterAction';
import ModalDropdown from 'react-native-modal-dropdown';
import Util from "../../util";
import { SpinnerLoader } from "../../components";

class SignupScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      fatherName: "",
      // lastName: '',
      userId: '',
      password: '',
      email: '',
      mobileNo: '',
      classId: 0,
      isloading: false
    }
  }

  componentWillMount(){
    Util.isConnected()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.register.data)
    if (nextProps.register) {
      if (
        !nextProps.register.failure &&
        !nextProps.register.isFetching &&
        nextProps.register.data.code == 1
      ) {
        this.setState({ 
        isloading: false,
        firstName: '',
        fatherName: "",
        // lastName: '',
        userId: '',
        password: '',
        email: '',
        mobileNo: '',
        classId: 0});
        Alert.alert("Success", nextProps.register.data.msg)
        Actions.loginScreen()
      }
      else if (nextProps.register.failure && !nextProps.register.isFetching) {
        this.setState({ isloading: false });
      }
      // else if (nextProps.register.data.code == 0) {
      //   Alert.alert("Error", nextProps.register.data.msg)
      //   this.setState({ isloading: false });
      // }
    }
  }

  onChangeTextField = (text, state) => {
    this.setState({ [state]: text });
  };

  verifyRegitration = () => {
    console.log("helloooooooooooooooooooooooooo")
    const {firstName, fatherName, email, mobileNo, password, classId} = this.state
    if (firstName === "") {
      Alert.alert("Validation", "First name is required");
    } else if (fatherName === "") {
      Alert.alert("Validation", "Father name is required");
    } else if (password === "" || password.length < 5 ) {
      Alert.alert("Validation", "Password is required or must be 6 characters long");
    } else if (email === "" || email === " "
      // !email.match(
      //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // )
    ) {
      Alert.alert("Validation", "Email is required");
    } else if (mobileNo === "") {
      Alert.alert("Validation", "Mobile number is required");
    } else if (classId === 0) {
      Alert.alert("Validation", "Class is required");
    } 
    else {
      console.log("kkkkkkkkkkkkkkchalraga g")
      this.setState({ isloading: true });
      this.handleRegistration();
    }
  }

  handleRegistration = () => {
    const {firstName, fatherName, email, mobileNo, password, classId} = this.state
    let payload = {
      first_name:firstName,
      fathername: fatherName,
      // last_name: lastName,
      email: email, 
      mobile_no: mobileNo,
      password: password,
      classId: classId
    }
    if (Util.isConnected()) {
      this.props.register_user(payload)
    } else {
      this.setState({ isloading: false });
      Alert.alert('Learningwell', 'Please Check Your Internet Connection!');
    }
    
  }

  onDropdonSelect = (val) => {
    this.setState({classId: parseInt(val) + 1})
  }

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
    ErrTxt,
    Iserr
  ) => {
    return (
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
              placeholder={placeholder}
              keyboardType={keyboardType}
              onChangeText={text => {
                onChangeText(text, state);
              }}
              secureTextEntry={securetext}
            />
    );
  };

  renderDropdown = () => {
   
    return(
      <ModalDropdown 
      defaultValue = {"Select Class"}
        
        options={['Class 1', 'Class 2', "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8"]}
        style = {{
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
                paddingTop: Metrics.ratio(12),
                marginTop: Metrics.ratio(10),
        }}
        dropdownStyle = {{width: Metrics.screenWidth * 0.85, backgroundColor: "white",}}
        textStyle = {{
          color: "grey",
          fontSize: Metrics.ratio(16),
          fontWeight: "bold"
        }}
        animated = {true}
        onSelect = {(val) => {this.onDropdonSelect(val)}}
        />
     
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
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
            Register
          </Text>
          <View
            style={{
              marginTop: Metrics.screenHeight * 0.04,
              alignItems: "center"
            }}
          >
            {this.renderInputfield(
              "First Name",
              this.onChangeTextField,
              "default",
              false,
              "firstName"
              
            )}

            {this.renderInputfield(
              "Father Name",
              this.onChangeTextField,
              "default",
              false,
              "fatherName"
            )}

            {/* {this.renderInputfield(
              "User Name",
              this.onChangeTextField,
              "default",
              false,
              "userId"
            )} */}

            
           
           {this.renderInputfield(
              "Email / User Name",
              this.onChangeTextField,
              "default",
              false,
              "email"
            )}

            {this.renderInputfield(
              "Password",
              this.onChangeTextField,
              "default",
              true,
              "password"
            )}
            {this.renderInputfield(
              "Mobile",
              this.onChangeTextField,
              "numeric",
              false,
              "mobileNo"
            )}

            {this.renderDropdown()}
        
            {/* <View style = {{flexDirection: 'row', marginTop: Metrics.ratio(10)}}>
              <Text style = {{fontSize: Metrics.ratio(16), color: 'grey'}}>If you forgot password</Text>
              <Text style = {{fontSize: Metrics.ratio(14), color: Colors.darkStaleBlue, fontWeight: 'bold', marginLeft: Metrics.ratio(5)}}>Click here</Text>
              </View> */}
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
              onPress={() => this.verifyRegitration()}
            >
              <Text
                style={{
                  fontSize: Metrics.ratio(18),
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              // marginBottom:Metrics.screenHeight * 0.4,
              marginTop: Metrics.screenHeight * 0.02,
              alignItems: "center"
            }}
          >
            <TouchableOpacity onPress={() => Actions.loginScreen()}>
              <Text
                style={{
                  fontSize: Metrics.ratio(24),
                  color: Colors.darkStaleBlue,
                  fontWeight: "bold"
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: Metrics.ratio(16), color: "grey",  }}>
              I have an account
            </Text>
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

export default connect(
  mapStateToProps,
  actions
)(SignupScreen);
