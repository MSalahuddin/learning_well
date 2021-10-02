import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';

import styles from './styles';

import {Images} from '../../theme';

const UpdateApp = (props) => {
  const {onPressCancel, onPressConfirm} = props;

  return (
    <ImageBackground
      source={Images.launchScreenBackground}
      style={{...styles.container}}>
      <View style={{...styles.backdropContainer}}>
        <View style={{...styles.cardContainer}}>
          <Text style={{...styles.title}}>Update Required</Text>
          <Text style={{...styles.message}}>
            A new version of the application is available and is required to
            continue, please click below to update to the latest version.
          </Text>
          <View style={{...styles.buttonRow}}>
            <TouchableOpacity onPress={onPressCancel}>
              <Text style={{...styles.closeButtonText}}>Close App</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressConfirm}
              style={{...styles.downloadButton}}>
              <Text style={{...styles.downloadButtonText}}>
                Download Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

UpdateApp.defaultProps = {
  onPressCancel: undefined,
  onPressConfirm: undefined,
};

UpdateApp.propTypes = {
  onPressCancel: PropTypes.func,
  onPressConfirm: PropTypes.func,
};

export default UpdateApp;
