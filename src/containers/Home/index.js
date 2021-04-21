import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import { Images, Metrics, Colors } from "../../theme";
import { Actions } from "react-native-router-flux";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={Images.homeBackgroundImage}
          resizeMode="auto"
          resizeMode="cover"
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
            Home Screen
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(HomeScreen);
