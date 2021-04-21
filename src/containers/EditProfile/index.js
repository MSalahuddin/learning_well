// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View , ImageBackground, TouchableOpacity, Image, TextInput, AsyncStorage} from "react-native";
import styles from "./styles";
import {Images, Metrics, Colors} from '../../theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Progress from 'react-native-progress';
import { Actions } from "react-native-router-flux";
import ModalDropdown from 'react-native-modal-dropdown';
import { logout as logout_user } from "../../actions/Login";

class EditProfileScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      userName: null,
      email: null
    }
  }

  componentWillMount(){
    this.getData()
}

getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');
    let user = JSON.parse(value)
    console.log(user,'//////////////////')
    if (value !== null) {
      this.setState({user: user, email: user.email, userName: `${user.fullname}`})
    }
  } catch (e) {
    console.log(e);
  }
};

logout = () => {
  this.props.logout_user("API_LOGOUT");
  // this.props.navigation.closeDrawer();
  Actions.loginScreen();
  // this.props.navigation.navigate("loginScreen", {
  //   screen: "loginScreen",
  //   isLogout: true
  // });
}

onLogout = async () => {
  try {
    await AsyncStorage.setItem('@storage_Key', "");
    this.logout()
    // this.props.updateUser(user)
  } catch (e) {
    console.log(e,'kkkkkkkklllllllllll')
    // saving error
  }
};

  onDropdonSelect = (val) => {
    this.setState({classId: parseInt(val) + 1})
  }
  renderHeader = () => {
    const {user} = this.state;
    let name = user.fullname//`${user.first_name} ${user.last_name}`
    return(
      <View style = {{width: Metrics.screenWidth, marginBottom: Metrics.ratio(10), justifyContent: 'center', alignItems: 'center'}}>
        <Image source = {Images.editProfileHeaderIcon} style = {{width: Metrics.ratio(200), height: Metrics.ratio(108)}} resizeMethod = "auto" resizeMode = "cover"/>
        <Text style = {{fontSize: Metrics.ratio(16),  marginTop: Metrics.ratio(5), color: 'white', position: "absolute", bottom: Metrics.ratio(10)}}>{name}</Text>
        {/* <ModalDropdown 
        defaultValue = "Select grade"
        // options={['Grade 1', 'Grade 2', "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"]}
        style = {{
          width: Metrics.screenWidth * 0.3,
          alignItems: 'center',
        }}
        dropdownStyle = {{width: Metrics.screenWidth * 0.85, backgroundColor: "white",}}
        textStyle = {{
          color: "black",
        }}
        animated = {true}
        // onSelect = {(val) => {this.onDropdonSelect(val)}}
        /> */}
      </View>
    )
  }
  
  renderSeprator = () => {
   return <View style = {{width: Metrics.screenWidth * 0.95, height: Metrics.ratio(1), marginHorizontal: Metrics.screenWidth * 0.025, backgroundColor: Colors.ash_grey}}></View>
  }

  renderProfileComplition = () => {
    return(
      <View style = {{paddingHorizontal: Metrics.screenWidth * 0.025, flexDirection: 'row', marginTop: Metrics.ratio(10)}}>
        <Text style = {{fontSize: Metrics.ratio(13), color: 'black'}}>Profile Complition</Text>
        <View style = {{marginLeft: Metrics.ratio(15), marginTop: Metrics.ratio(4)}}>
        <Progress.Bar progress={1} width={150} color = {Colors.darkStaleBlue}/>
        </View>
        <Text style = {{fontSize: Metrics.ratio(13), color: 'black', marginLeft: Metrics.ratio(8)}}>100%</Text>

      </View>
    )
  }

  renderAccountDetail = () => {
    const {user} = this.state;
    let mobileNo = user.mobile_no
    return(
      <View style = {{paddingHorizontal: Metrics.screenWidth * 0.025, marginBottom: Metrics.ratio(20)}}>
        <Text style = {{fontSize: Metrics.ratio(13), color: 'black', marginVertical: Metrics.ratio(10), fontWeight: 'bold'}}>Account Details</Text>
        <View style = {{flexDirection: 'row'}}>
         <View style = {{width: Metrics.screenWidth * 0.8, flexDirection: 'row'}}>
         <Image source = {Images.sidemenuCallIcon} style = {{width: Metrics.ratio(20), height: Metrics.ratio(20)}}/>
          <Text style = {{fontSize: Metrics.ratio(13), color: 'black', marginLeft: Metrics.ratio(15)}}>{mobileNo}</Text>
         </View>
         <Image style = {{width: Metrics.ratio(18), height: Metrics.ratio(17), marginHorizontal: Metrics.ratio(15)}} source={Images.editIcon}/>
        </View>
      </View>
    )
  }

  renderProfileDetails = () => {
    
    return(
      <View style = {{paddingHorizontal: Metrics.screenWidth * 0.025, marginBottom: Metrics.ratio(10)}}>
        <View style = {{flexDirection: 'row'}}>
        <Text style = {{width: Metrics.screenWidth * 0.8,fontSize: Metrics.ratio(13), color: 'black', marginVertical: Metrics.ratio(10), fontWeight: 'bold'}}>Profile Details</Text>
         <Image style = {{width: Metrics.ratio(18), height: Metrics.ratio(17), marginHorizontal: Metrics.ratio(15), marginTop: Metrics.ratio(10)}} source={Images.editIcon}/>
        </View>
      </View>
    )
  }

  renderProfileDetailSeprator = () => {
    return(
      <View style = {{width: Metrics.screenWidth * 0.85, height: Metrics.ratio(1),  backgroundColor: Colors.ash_grey, marginBottom: Metrics.ratio(8)}}></View>
    )
  }

  renderUserName = () => {
    return(
      <View style = {{paddingHorizontal: Metrics.screenWidth * 0.025}}>
      <View style = {{flexDirection: 'row'}}>
       <View style = {{ flexDirection: 'row'}}>
       <Image source = {Images.sidemenuCallIcon} style = {{marginTop:Metrics.ratio(3),width: Metrics.ratio(20), height: Metrics.ratio(20)}}/>
        <View style = {{ marginLeft: Metrics.ratio(15)}}>
        <TextInput  
        editable={false}
        style = {{fontSize: Metrics.ratio(13), color: 'black', paddingTop: Metrics.ratio(-17)}}
         placeholder = {"User"} placeholderTextColor = "black"
         value = {this.state.userName}
         onChangeText = {(text) => {this.setState({userName: text})}}
         />
        {/* <Text style = {{fontSize: Metrics.ratio(13), color: 'black'}}>User</Text> */}
        {this.renderProfileDetailSeprator()}
        </View>
       </View>
      </View>
    </View>
    )
  }

  renderEmailField = () => {
    return(
      <View style = {{paddingHorizontal: Metrics.screenWidth * 0.025}}>
      <View style = {{flexDirection: 'row'}}>
       <View style = {{ flexDirection: 'row'}}>
       <Image source = {Images.envelopIcon} style = {{marginTop:Metrics.ratio(3),width: Metrics.ratio(20), height: Metrics.ratio(20)}}/>
        <View style = {{ marginLeft: Metrics.ratio(15)}}>
        <TextInput 
         editable={false}
          style = {{fontSize: Metrics.ratio(13), color: 'black', paddingTop: Metrics.ratio(-17)}}
         placeholder = {"user@demo.com"} placeholderTextColor = "black"
         value = {this.state.email}
         onChangeText = {(text) => {this.setState({email: text})}}/>
        {/* <Text style = {{fontSize: Metrics.ratio(13), color: 'black'}}>User</Text> */}
        {this.renderProfileDetailSeprator()}
        </View>
       </View>
      </View>
    </View>
    )
  }

  renderAddGender = () => {
    return(
      <View style = {{paddingHorizontal: Metrics.screenWidth * 0.025}}>
      <View style = {{flexDirection: 'row'}}>
       <View style = {{ flexDirection: 'row'}}>
       <Image source = {Images.genderIcon} style = {{marginTop:Metrics.ratio(3),width: Metrics.ratio(20), height: Metrics.ratio(20)}}/>
        <View style = {{ marginLeft: Metrics.ratio(15)}}>
        <TextInput style = {{fontSize: Metrics.ratio(13), color: 'black', paddingTop: Metrics.ratio(-17)}} placeholder = {"Add your gender"} placeholderTextColor = "black"/>
        {/* <Text style = {{fontSize: Metrics.ratio(13), color: 'black'}}>User</Text> */}
        {this.renderProfileDetailSeprator()}
        </View>
       </View>
      </View>
    </View>
    )
  }

  renderAddAddress = () => {
    return(
      <View style = {{paddingHorizontal: Metrics.screenWidth * 0.025}}>
      <View style = {{flexDirection: 'row'}}>
       <View style = {{ flexDirection: 'row'}}>
       <Image source = {Images.locationIcon} style = {{marginTop:Metrics.ratio(3),width: Metrics.ratio(20), height: Metrics.ratio(20)}}/>
        <View style = {{ marginLeft: Metrics.ratio(15)}}>
        <TextInput style = {{fontSize: Metrics.ratio(13), color: 'black', paddingTop: Metrics.ratio(-17)}} placeholder = {"Karachi City, Sindh, Pakistan"} placeholderTextColor = "black"/>
        {/* <Text style = {{fontSize: Metrics.ratio(13), color: 'black'}}>User</Text> */}
        {this.renderProfileDetailSeprator()}
        </View>
       </View>
      </View>
    </View>
    )
  }

  renderAddBirthday = () => {
    return(
      <View style = {{paddingHorizontal: Metrics.screenWidth * 0.025}}>
      <View style = {{flexDirection: 'row'}}>
       <View style = {{ flexDirection: 'row'}}>
       <Image source = {Images.birthdayIcon} style = {{marginTop:Metrics.ratio(3),width: Metrics.ratio(20), height: Metrics.ratio(20)}}/>
        <View style = {{ marginLeft: Metrics.ratio(15)}}>
        <TextInput style = {{fontSize: Metrics.ratio(13), color: 'black', paddingTop: Metrics.ratio(-17)}} placeholder = {"Add your Birthday"} placeholderTextColor = "black"/>
        {/* <Text style = {{fontSize: Metrics.ratio(13), color: 'black'}}>User</Text> */}
        {this.renderProfileDetailSeprator()}
        </View>
       </View>
      </View>
    </View>
    )
  }

  renderSignout = () =>{
    return(
      <View style = {{paddingHorizontal: Metrics.screenWidth * 0.025}}>
       <TouchableOpacity style = {{ flexDirection: 'row'}} onPress = {() => this.onLogout()}>
       <Image source = {Images.logoutIcon} style = {{marginTop:Metrics.ratio(3),width: Metrics.ratio(20), height: Metrics.ratio(20)}}/>
        <View style = {{ marginLeft: Metrics.ratio(15)}}>
        <Text style = {{fontSize: Metrics.ratio(13), color: 'black', marginBottom: Metrics.ratio(10)}}>Sign out</Text>
        {this.renderProfileDetailSeprator()}
        </View>
      </TouchableOpacity>
    </View>
    )
  }
  render() {
    const {user} = this.state;
    return (
      <ImageBackground
        source={Images.editProfileBackground}
        resizeMode="auto"
        resizeMode="cover"
        style={[styles.container]}
      >
        <TouchableOpacity onPress = {() => {Actions.pop()}}>
            <Image
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
                marginTop: Metrics.ratio(20),
                marginLeft: Metrics.ratio(10),
                borderRadius: 100
              }}
              source = {Images.backArrowIcon}
              
            />
         </TouchableOpacity>  
         
          {user && this.renderHeader()}
          {this.renderSeprator()}
          <KeyboardAwareScrollView>
            <View style = {{marginBottom: Metrics.ratio(20)}}>
            {this.renderProfileComplition()}
            {user && this.renderAccountDetail()}
            {this.renderSeprator()}
            {this.renderProfileDetails()}
            {this.renderUserName()}
            {this.renderEmailField()}
            {/* {this.renderAddGender()}
            {this.renderAddAddress()}
            {this.renderAddBirthday()} */}
            {this.renderSignout()}
            </View>
          </KeyboardAwareScrollView>
          
        </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {logout_user};

export default connect(mapStateToProps, actions)(EditProfileScreen);
