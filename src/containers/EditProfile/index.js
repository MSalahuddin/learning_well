// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import {Images} from '../../theme';
import {logout as logout_user} from '../../actions/Login';
import {Header} from '../../components';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userName: null,
      email: null,
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      let user = JSON.parse(value);
      if (value !== null) {
        this.setState({
          user: user,
          email: user.email,
          userName: `${user.fullname}`,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  logout = () => {
    this.props.logout_user('API_LOGOUT');
    Actions.loginScreen();
  };

  onLogout = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', '');
      this.logout();
    } catch (e) {
      console.log(e);
    }
  };

  renderHeader = () => {
    const {user} = this.state;
    let name = user.fullname;
    return (
      <View style={{...styles.headerBannerContainer}}>
        <Image
          source={Images.editProfileHeaderIcon2}
          style={{...styles.headerBannerImage}}
          resizeMode="cover"
        />
        <Text style={{...styles.headerBannerText}}>{name}</Text>
      </View>
    );
  };

  renderAccountDetail = () => {
    const {user} = this.state;
    const {mobile_no} = user;
    return (
      <View style={{...styles.accountContainer}}>
        <Text style={{...styles.accountHeading}}>Account Details</Text>
        <View style={{...styles.phoneNumContainer}}>
          <Image
            resizeMode={'contain'}
            source={Images.sidemenuCallIcon2}
            style={{...styles.phoneNumIcon}}
          />
          <Text style={{...styles.phoneNumText}}>{mobile_no}</Text>
        </View>
      </View>
    );
  };

  renderProfileDetails = () => {
    return (
      <View style={{...styles.profileDetailContainer}}>
        <Text style={{...styles.profileDetailHeading}}>Profile Details</Text>
      </View>
    );
  };

  renderUserName = () => {
    return (
      <View style={{...styles.profileItemContainer}}>
        <Image
          resizeMode={'contain'}
          source={Images.usernameIcon}
          style={{...styles.profileItemIcon}}
        />
        <TextInput
          editable={false}
          style={{...styles.profileItemTextInput}}
          placeholder={'User'}
          placeholderTextColor="black"
          value={this.state.userName}
          onChangeText={(text) => {
            this.setState({userName: text});
          }}
        />
      </View>
    );
  };

  renderEmailField = () => {
    return (
      <View style={{...styles.profileItemContainer}}>
        <Image
          resizeMode={'contain'}
          source={Images.envelopIcon2}
          style={{...styles.profileItemIcon}}
        />
        <TextInput
          editable={false}
          style={{...styles.profileItemTextInput}}
          placeholder={'user@demo.com'}
          placeholderTextColor="black"
          value={this.state.email}
          onChangeText={(text) => {
            this.setState({email: text});
          }}
        />
      </View>
    );
  };

  renderSignout = () => {
    return (
      <View style={{...styles.signOutContainer}}>
        <TouchableOpacity
          style={{...styles.signOutRow}}
          onPress={() => this.onLogout()}>
          <Image
            resizeMode={'contain'}
            source={Images.logoutIcon2}
            style={{...styles.signOutIcon}}
          />
          <Text style={{...styles.signOutText}}>Sign out</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {user} = this.state;
    return (
      <ImageBackground
        source={Images.homeBackgroundImage3}
        resizeMode="cover"
        style={{...styles.container}}>
        <Header
          leftImage={Images.backArrowIcon2}
          leftBtnPress={() => Actions.pop()}
        />

        {user && this.renderHeader()}

        {user && this.renderAccountDetail()}

        {this.renderProfileDetails()}

        {this.renderUserName()}

        {this.renderEmailField()}

        {this.renderSignout()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {logout_user};

export default connect(mapStateToProps, actions)(EditProfileScreen);
