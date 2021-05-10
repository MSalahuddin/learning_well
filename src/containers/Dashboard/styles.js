// @flow
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
  cardContainerStyle: {
    height: Metrics.screenWidth * 0.25,
  },
  cardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: Metrics.ratio(12),
  },
  moreBtn: {
    alignSelf: 'center',
    padding: Metrics.ratio(8),
    marginVertical: Metrics.ratio(24),
  },
  moreIcon: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
  },
});
