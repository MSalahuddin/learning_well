// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBannerContainer: {
    width: Metrics.screenWidth,
    marginTop: Metrics.ratio(-16),
    marginBottom: Metrics.ratio(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBannerImage: {
    width: Metrics.ratio(200),
    height: Metrics.ratio(108),
  },
  headerBannerText: {
    fontSize: Metrics.ratio(16),
    color: 'white',
    position: 'absolute',
    bottom: Metrics.ratio(10),
  },
  accountContainer: {
    paddingHorizontal: Metrics.screenWidth * 0.025,
    marginBottom: Metrics.ratio(16),
  },
  accountHeading: {
    fontSize: Metrics.ratio(14),
    color: 'black',
    marginVertical: Metrics.ratio(16),
  },
  phoneNumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  phoneNumIcon: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
  phoneNumText: {
    fontSize: Metrics.ratio(13),
    color: 'black',
    marginLeft: Metrics.ratio(16),
  },
  seprator: {
    width: Metrics.screenWidth * 0.975,
    height: Metrics.ratio(1),
    alignSelf: 'flex-end',
    backgroundColor: '#eee',
    marginBottom: Metrics.ratio(4),
  },
  profileDetailContainer: {
    paddingHorizontal: Metrics.screenWidth * 0.025,
    marginBottom: Metrics.ratio(16),
  },
  profileDetailHeading: {
    fontSize: Metrics.ratio(14),
    color: 'black',
    marginTop: Metrics.ratio(16),
  },
  profileItemContainer: {
    paddingLeft: Metrics.screenWidth * 0.025,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileItemIcon: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
  profileItemTextInput: {
    marginLeft: Metrics.ratio(16),
    flex: 1,
    fontSize: Metrics.ratio(13),
    color: 'black',
    borderBottomColor: Colors.white,
    borderBottomWidth: Metrics.ratio(1),
  },
  signOutContainer: {
    paddingLeft: Metrics.screenWidth * 0.025,
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutIcon: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
  },
  signOutText: {
    marginLeft: Metrics.ratio(16),
    fontSize: Metrics.ratio(13),
    color: 'black',
    flex: 1,
    paddingVertical: Metrics.ratio(16),
    borderBottomColor: Colors.white,
    borderBottomWidth: Metrics.ratio(1),
  },
});
