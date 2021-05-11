import React, {Component} from 'react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import configureStore from './store';
import AppNavigator from './navigator';

export default class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    setTimeout(() => {
      this.getData();
    }, 1000);
  }

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
    const store = configureStore();
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
