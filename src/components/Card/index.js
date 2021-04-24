import React from 'react';
import PropTypes from 'prop-types';
import {Text, Image, TouchableOpacity} from 'react-native';

import styles from './styles';

const Card = (props) => {
  const {containerStyle, onPress, image, imageStyle, name, nameStyle} = props;

  return (
    <TouchableOpacity
      disabled={!onPress}
      style={{...styles.containerStyle, ...containerStyle}}
      onPress={onPress}>
      <Image
        resizeMode={'contain'}
        style={{...styles.imageStyle, ...imageStyle}}
        source={image}
      />
      <Text style={{...styles.nameStyle, ...nameStyle}}>{name}</Text>
    </TouchableOpacity>
  );
};

Card.defaultProps = {
  containerStyle: {},
  onPress: undefined,
  image: undefined,
  imageStyle: {},
  name: '',
  nameStyle: {},
};

Card.propTypes = {
  containerStyle: PropTypes.object,
  onPress: PropTypes.func,
  image: PropTypes.string,
  imageStyle: PropTypes.object,
  name: PropTypes.string,
  nameStyle: PropTypes.object,
};

export default Card;
