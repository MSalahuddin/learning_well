import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  rightImageStyle: {
    width: Metrics.ratio(125),
    height: Metrics.ratio(50),
  },
  tableContainer: {
    marginTop: Metrics.screenHeight * 0.065,
  },
  notFoundContainer: {
    flex: 1,
    height: Metrics.screenHeight * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: Metrics.ratio(16),
    color: '#6e6e6e',
  },
});
