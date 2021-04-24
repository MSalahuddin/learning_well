// @flow
import {StyleSheet} from 'react-native';

import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  containerStyle: {
    width: Metrics.screenWidth * 0.4,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenWidth * 0.4,
    margin: Metrics.ratio(12),
    borderRadius: Metrics.ratio(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageStyle: {
    width: Metrics.ratio(65),
    height: Metrics.ratio(65),
  },
  nameStyle: {
    fontSize: Metrics.ratio(14),
    marginTop: Metrics.ratio(8),
  },
});
