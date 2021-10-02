import React, {Component} from 'react';
import {Linking, BackHandler} from 'react-native';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {getVersion} from 'react-native-device-info';

import 'react-native-gesture-handler';

import configureStore from './store';
import AppNavigator from './navigator';
import {createResource} from './config/SimpleApiCalls';
import {VERSION_API} from './config/WebServices';
import {UpdateApp} from './components';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateApp: false,
    };
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    await this.checkVersion();
    await this.getData();
  }

  checkVersion = async () => {
    const version = getVersion();

    let payload = new FormData();
    payload.append('version', version);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const result = await createResource(VERSION_API, payload, null, headers);
      if (result.code === 0) {
        await AsyncStorage.removeItem('@storage_Key');
        this.setState({showUpdateApp: true});
      }
    } catch (error) {
      console.log('error ==> ', error);
    }
  };

  handleDownloadUpdate = () => {
    Linking.openURL('market://details?id=com.learning_well');
    BackHandler.exitApp();
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        Actions.dashboard({type: 'reset'});
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
      } else {
        SplashScreen.hide();
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const {showUpdateApp} = this.state;
    const store = configureStore();
    if (showUpdateApp) {
      return (
        <UpdateApp
          onPressCancel={BackHandler.exitApp}
          onPressConfirm={this.handleDownloadUpdate}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      );
    }
  }
}
