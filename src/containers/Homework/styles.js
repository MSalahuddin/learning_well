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
});
