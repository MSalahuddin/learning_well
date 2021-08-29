import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyle: {
    fontWeight: 'bold',
  },
  headerContainer: {
    paddingVertical: Metrics.ratio(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.ratio(12),
  },
  leftBtnImage: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
  bookNameContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bookName: {
    fontSize: Metrics.ratio(32),
    fontWeight: 'bold',
    color: Colors.white,
    marginHorizontal: Metrics.ratio(12),
  },
  pdfStyle: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
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
    textAlign: 'center',
  },
});
