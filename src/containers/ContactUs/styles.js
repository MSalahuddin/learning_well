// @flow
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
  logo: {
    width: Metrics.ratio(115),
    height: Metrics.ratio(115),
    alignSelf: 'center',
    marginTop: Metrics.screenHeight * 0.025,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: Metrics.screenHeight * 0.05,
  },
  bodyItem: {
    marginVertical: Metrics.ratio(6),
    marginHorizontal: Metrics.ratio(8),
    paddingBottom: Metrics.ratio(12),
    paddingHorizontal: Metrics.ratio(16),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  officeCity: {
    fontSize: Metrics.ratio(14),
    fontWeight: 'bold',
    color: Colors.Venice_Blue,
    textAlign: 'center',
    marginBottom: Metrics.ratio(4),
  },
  officeAddress: {
    fontSize: Metrics.ratio(12),
    color: Colors.black,
    textAlign: 'center',
  },
  officeNo: {
    fontSize: Metrics.ratio(12),
    color: Colors.black,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginVertical: Metrics.ratio(16),
    marginHorizontal: Metrics.ratio(8),
  },
  footerItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.ratio(8),
    marginVertical: Metrics.ratio(4),
  },
  footerItemImage: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
  footerItemText: {
    fontSize: Metrics.ratio(12),
    color: Colors.black,
    marginLeft: Metrics.ratio(8),
  },
});
