import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
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
});
