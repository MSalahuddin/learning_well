import { Provider } from "react-redux";
import configureStore from "./store";
import {AsyncStorage} from 'react-native'
import CounterComponent from "./components/counter";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigator";
import SplashScreen from 'react-native-splash-screen'
import { Actions } from "react-native-router-flux";
export default class App extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){

    setTimeout(() => {
      this.getData()
    },1000)
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        
        Actions.dashboard({type: 'reset'})
      //   this.props.navigation.navigate("dashboard", {
      //     screen: "dashboard"
      // });
        setTimeout(() => {
          SplashScreen.hide()
        },1000)
      }
      else{
        SplashScreen.hide()
      }
    } catch (e) {
      console.log(e);
      // error reading value
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
