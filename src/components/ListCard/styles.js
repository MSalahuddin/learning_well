// @flow
import {StyleSheet} from 'react-native';

import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  containerStyle: {
    marginHorizontal: Metrics.ratio(14),
    paddingBottom: Metrics.ratio(8),
    marginBottom: Metrics.ratio(8),
  },
  cardContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.Venice_Blue,
    borderRadius: Metrics.ratio(6),
    overflow: 'hidden',
  },
  cardIconContainer: {
    width: Metrics.ratio(55),
    height: Metrics.ratio(60),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cardIcon: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
  cardDetailContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.ratio(12),
    paddingVertical: Metrics.ratio(8),
    borderLeftColor: Colors.Venice_Blue,
    borderLeftWidth: 1,
  },
  leftTextContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: Metrics.ratio(4),
  },
  leftTopText: {
    fontSize: Metrics.ratio(10),
    color: '#3D4647',
  },
  leftBottomText: {
    fontSize: Metrics.ratio(10),
    color: '#3D4647',
  },
  centerText: {
    flex: 1,
    fontSize: Metrics.ratio(14),
    color: '#3D4647',
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: Metrics.ratio(4),
  },
  rightText: {
    fontSize: Metrics.ratio(10),
    color: '#3D4647',
    alignSelf: 'center',
    marginLeft: Metrics.ratio(4),
  },
});
