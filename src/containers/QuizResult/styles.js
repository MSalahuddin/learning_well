import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  rightImageStyle: {
    width: Metrics.ratio(125),
    height: Metrics.ratio(50),
  },
  headingContainer: {
    width: Metrics.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.ratio(20),
  },
  thankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.ratio(8),
  },
  thankImage: {
    width: Metrics.ratio(18),
    height: Metrics.ratio(18),
  },
  thankText: {
    marginLeft: Metrics.ratio(10),
    fontSize: Metrics.ratio(22),
    color: Colors.white,
  },
  thankMsg: {
    fontSize: Metrics.ratio(12),
    color: Colors.white,
  },
  listContainer: {
    marginTop: Metrics.ratio(48),
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: Metrics.ratio(12),
  },
  label: {
    flex: 1,
    fontSize: Metrics.ratio(14),
    color: Colors.black,
    marginHorizontal: Metrics.ratio(16),
    textAlign: 'right',
  },
  value: {
    flex: 1.5,
    fontSize: Metrics.ratio(14),
    color: Colors.black,
    marginHorizontal: Metrics.ratio(16),
    textAlign: 'left',
  },
});
