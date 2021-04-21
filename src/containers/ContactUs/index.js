// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, ImageBackground, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Metrics, Colors, Images } from "../../theme";
import { Actions } from "react-native-router-flux";

class ContactUsScreen extends Component {
  render() {
    return (
      <ImageBackground resizeMethod = 'auto' resizeMode ='stretch' source = {Images.contactus} style={styles.container}>
        <TouchableOpacity
            style={{
              width: Metrics.ratio(40),
              height: Metrics.ratio(40),
              backgroundColor: "transparent",
              borderRadius: 100,
              elevation: 8,
              marginTop: Metrics.ratio(25),
              marginLeft: Metrics.ratio(10),
              justifyContent: "center",
              alignItems: "center"
            }}
            activeOpacity = {1}
            onPress={() => Actions.pop()}
          >
            {/* <Icon
              style={{}}
              size={20}
              color={Colors.darkStaleBlue}
              name={"bars"}
            /> */}
            <Image source = {Images.backArrowIcon}  
            style={{
              width: Metrics.ratio(40),
              height: Metrics.ratio(40),
              borderRadius: 100,

            }}/>
          </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(ContactUsScreen);
