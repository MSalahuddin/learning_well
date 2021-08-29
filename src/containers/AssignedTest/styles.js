import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyle: {
    fontWeight: 'bold',
  },
  tableContainer: {
    paddingTop: Metrics.screenHeight * 0.03,
  },
  notFoundContainer: {
    flex: 1,
    height: Metrics.screenHeight * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: Metrics.ratio(16),
    color: '#6e6e6e',
  },
});
