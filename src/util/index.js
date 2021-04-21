import React, { Component } from "react";
import { Platform, ToastAndroid, Text, Alert } from "react-native";
import { Colors, Metrics } from "../theme";
import NetInfo from "@react-native-community/netinfo";

class Util {
  isPlatformAndroid = () => Platform.OS === "android";

  showToast(message: String) {
    if (this.isPlatformAndroid()) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      const style = {
        backgroundColor: Colors.punch,
        width: 300,
        height: Metrics.ratio(50),
        color: "#ffffff",
        fontSize: Metrics.ratio(15),
        lineHeight: 2,
        lines: 4,
        borderRadius: 15,
        fontWeight: "bold",
        yOffset: 40
      };
      
    //   Toast.show(message, Toast.SHORT, Toast.BOTTOM);
    }
  }

  isConnected() {
    let isConnected;
    NetInfo.addEventListener(state => { isConnected = state.isConnected })
    return isConnected
  }

  isJSDebugMode() {
    return typeof atob !== "undefined";
  }

  isPlatformAndroid = () => Platform.OS === "android";

  renderActionSheetOption = text => {
    if (Platform.OS === "android") {
      return (
        <Text
          style={{ color: Colors.primary, fontSize: Metrics.ratio(14) }}
          type="AvenirNextMedium"
        >
          {text}
        </Text>
      );
    } else {
      return text;
    }
  };

  showAlertWithDelay(title, message, delay = 150) {
    setTimeout(() => {
      this.showCommonMessage(title, message);
    }, delay);
  }

  showCommonMessage(
    title,
    message,
    onOkPressed = () => console.log("OK Pressed")
  ) {
    Alert.alert(
      title,
      message,
      [
        {
          text: "ok",
          onPress: onOkPressed
        }
      ],
      { cancelable: false }
    );
  }

  showYesNoMessage(title, message, onYes, onNo) {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [
          {
            text: "Yes",
            onPress: onYes
          },
          {
            text: "No",
            onPress: onNo,
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    }, 150);
  }
}
export default new Util();