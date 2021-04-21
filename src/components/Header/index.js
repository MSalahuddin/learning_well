  
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Images, Metrics } from "../../theme";
import PropTypes from "prop-types";

class Header extends Component {
  static propTypes = {
    //selectedTab: PropTypes.oneOf(["mycars", "addcar"]),
    headerText: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    leftBtnPress: PropTypes.func,
    rightBtnPress: PropTypes.func,
    leftIconStyle: PropTypes.object,
    headerTextStyle: PropTypes.object,
    rightIconStyle: PropTypes.object,
    productQuantity: PropTypes.number,
    itemQuantity: PropTypes.number
  };
  static defaultProps = {
    headerText: "",
    leftIcon: undefined,
    rightIcon: undefined,
    leftBtnPress: undefined,
    leftIconStyle: undefined,
    headerTextStyle: undefined,
    rightIconStyle: undefined,
    rightBtnPress: undefined,
    productQuantity: undefined,
    itemQuantity: undefined
  };
  render() {
    const {
      headerText,
      leftIcon,
      rightIcon,
      leftBtnPress,
      headerTextStyle,
      rightIconStyle,
      rightBtnPress,
      itemQuantity
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.TouchableMenu,
            { justifyContent: "center", alignItems: "center" }
          ]}
          onPress={leftBtnPress}
        >
          <Image style={styles.menuImage} source={leftIcon} />
        </TouchableOpacity>

        <Text style={[styles.headerText, headerTextStyle]}>{headerText}</Text>

        <TouchableOpacity
          onPress={rightBtnPress}
          style={[
            styles.TouchableMenu,
            rightIconStyle,
            { marginTop: Metrics.ratio(20), marginLeft: Metrics.ratio(30) }
          ]}
        >
          {itemQuantity && (
            <View
              style={{
                width: Metrics.ratio(20),
                height: Metrics.ratio(20),
                backgroundColor: "green",
                borderRadius: Metrics.ratio(5),
                borderWidth: Metrics.ratio(2),
                borderColor: "white",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: 1,
                marginLeft: Metrics.ratio(-13),
                marginTop: Metrics.ratio(-10)
              }}
            >
              <Text
                style={{
                  color: "white"
                }}
              >
                {itemQuantity}
              </Text>
            </View>
          )}

          <Image style={styles.menuImage} source={rightIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

// const mapStateToProps = () => ({});

// const actions = {};

// export default connect(
//   mapStateToProps,
//   actions
// )(Empty);

export default Header;