import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';
import {Images} from '../../theme';

const ListCard = (props) => {
  const {
    containerStyle,
    cardContainerStyle,
    cardIconContainerStyle,
    cardIconStyle,
    cardDetailContainerStyle,
    leftTextContainerStyle,
    leftTopTextStyle,
    leftBottomTextStyle,
    centerTextStyle,
    rightTextStyle,
    onPress,
    leftTopText,
    leftBottomText,
    centerText,
    rightText,
  } = props;

  return (
    <View style={{...styles.containerStyle, ...containerStyle}}>
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress}
        style={{...styles.cardContainer, ...cardContainerStyle}}>
        <View style={{...styles.cardIconContainer, ...cardIconContainerStyle}}>
          <Image
            source={Images.paperAndPencilIcon}
            resizeMode={'contain'}
            style={{...styles.cardIcon, ...cardIconStyle}}
          />
        </View>
        <View
          style={{...styles.cardDetailContainer, ...cardDetailContainerStyle}}>
          {leftTopText || leftBottomText ? (
            <View
              style={{
                ...styles.leftTextContainer,
                ...leftTextContainerStyle,
              }}>
              <Text
                numberOfLines={1}
                style={{...styles.leftTopText, ...leftTopTextStyle}}>
                {leftTopText}
              </Text>
              <Text
                numberOfLines={1}
                style={{...styles.leftBottomText, ...leftBottomTextStyle}}>
                {leftBottomText}
              </Text>
            </View>
          ) : null}
          {centerText ? (
            <Text
              style={{
                ...styles.centerText,
                ...centerTextStyle,
              }}>
              {centerText}
            </Text>
          ) : null}
          <Text style={{...styles.rightText, ...rightTextStyle}}>
            {rightText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

ListCard.defaultProps = {
  containerStyle: {},
  cardContainerStyle: {},
  cardIconContainerStyle: {},
  cardIconStyle: {},
  cardDetailContainerStyle: {},
  leftTextContainerStyle: {},
  leftTopTextStyle: {},
  leftBottomTextStyle: {},
  centerTextStyle: {},
  rightTextStyle: {},
  onPress: undefined,
  leftTopText: '',
  leftBottomText: '',
  centerText: '',
  rightText: '',
};

ListCard.propTypes = {
  containerStyle: PropTypes.object,
  cardContainerStyle: PropTypes.object,
  cardIconContainerStyle: PropTypes.object,
  cardIconStyle: PropTypes.object,
  cardDetailContainerStyle: PropTypes.object,
  leftTextContainerStyle: PropTypes.object,
  leftTopTextStyle: PropTypes.object,
  leftBottomTextStyle: PropTypes.object,
  centerTextStyle: PropTypes.object,
  rightTextStyle: PropTypes.object,
  onPress: PropTypes.func,
  leftTopText: PropTypes.string,
  leftBottomText: PropTypes.string,
  centerText: PropTypes.string,
  rightText: PropTypes.string,
};

export default ListCard;
