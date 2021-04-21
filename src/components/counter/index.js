import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, ScrollView, ImageBackground, TextInput } from "react-native";
import styles from "./styles";
import Header from '../Header';
import {Images, Metrics, Colors} from '../../theme';

class CounterComponent extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
     
      <ScrollView

      // keyboardShouldPersistTaps="always"
      >
          <ImageBackground source={Images.backgroundImage} style={styles.container} resizeMode = 'auto' resizeMode = 'cover'>
              <TextInput
                style = {{width: Metrics.screenWidth * 0.8, 
                          height: Metrics.ratio(55), 
                          backgroundColor: 'white', 
                          marginHorizontal: Metrics.screenWidth * 0.1,
                          borderColor: Colors.darkStaleBlue,
                          borderWidth: Metrics.ratio(1),
                          borderRadius: Metrics.ratio(40),
                          color: 'grey',
                          fontSize: Metrics.ratio(16),
                          fontWeight: 'bold',
                          paddingLeft: Metrics.ratio(20)
                          }}
                          placeholder = "First Name"
              />
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(CounterComponent);