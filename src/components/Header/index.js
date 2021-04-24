import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import styles from './styles';

const Header = (props) => {
  const {
    headerText,
    headerTextContainerStyle,
    headerTextStyle,
    leftImage,
    leftImageContainerStyle,
    leftImageStyle,
    leftBtnPress,
    rightImage,
    rightImageContainerStyle,
    rightImageStyle,
    rightBtnPress,
  } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!leftBtnPress}
        style={{...styles.leftImageContainerStyle, ...leftImageContainerStyle}}
        onPress={leftBtnPress}>
        <Image
          resizeMode={'contain'}
          style={{...styles.leftImageStyle, ...leftImageStyle}}
          source={leftImage}
        />
      </TouchableOpacity>

      <View
        style={{
          ...styles.headerTextContainerStyle,
          ...headerTextContainerStyle,
        }}>
        <Text style={{...styles.headerTextStyle, ...headerTextStyle}}>
          {headerText}
        </Text>
      </View>

      <TouchableOpacity
        disabled={!rightBtnPress}
        style={{
          ...styles.rightImageContainerStyle,
          ...rightImageContainerStyle,
        }}
        onPress={rightBtnPress}>
        <Image
          resizeMode={'contain'}
          style={{...styles.rightImageStyle, ...rightImageStyle}}
          source={rightImage}
        />
      </TouchableOpacity>
    </View>
  );
};

Header.defaultProps = {
  headerText: '',
  headerTextContainerStyle: {},
  headerTextStyle: {},
  leftImage: undefined,
  leftImageContainerStyle: {},
  leftImageStyle: {},
  leftBtnPress: undefined,
  rightImage: undefined,
  rightImageContainerStyle: {},
  rightImageStyle: {},
  rightBtnPress: undefined,
};

Header.propTypes = {
  headerText: PropTypes.string,
  headerTextContainerStyle: PropTypes.object,
  headerTextStyle: PropTypes.object,
  leftImage: PropTypes.string,
  leftImageContainerStyle: PropTypes.object,
  leftImageStyle: PropTypes.object,
  leftBtnPress: PropTypes.func,
  rightImage: PropTypes.string,
  rightImageContainerStyle: PropTypes.object,
  rightImageStyle: PropTypes.object,
  rightBtnPress: PropTypes.func,
};

export default Header;
