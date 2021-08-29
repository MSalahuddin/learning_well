// @flow
import {StyleSheet} from 'react-native';

import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingVertical: Metrics.ratio(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftImageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.ratio(12),
  },
  leftImageStyle: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
  headerTextContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontSize: Metrics.ratio(24),
    color: Colors.white,
  },
  headerSubTextStyle: {
    fontSize: Metrics.ratio(10),
    color: Colors.white,
  },
  rightImageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.ratio(12),
  },
  rightImageStyle: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
});
