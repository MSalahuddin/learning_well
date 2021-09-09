import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyle: {
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headingContainer: {
    width: Metrics.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: Colors.black,
  },
  thankMsg: {
    fontSize: Metrics.ratio(12),
    color: Colors.black,
    fontWeight: 'bold',
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
    color: '#808080',
    marginHorizontal: Metrics.ratio(16),
    textAlign: 'right',
  },
  value: {
    flex: 1.5,
    fontSize: Metrics.ratio(14),
    color: '#808080',
    marginHorizontal: Metrics.ratio(16),
    textAlign: 'left',
  },
});
