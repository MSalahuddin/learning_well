import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

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
  popupBackdrop: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    paddingHorizontal: Metrics.ratio(16),
  },
  popupContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.ratio(16),
    paddingBottom: Metrics.ratio(16),
    paddingTop: Metrics.ratio(40),
    borderRadius: Metrics.ratio(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  popupIconContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    width: Metrics.ratio(60),
    height: Metrics.ratio(60),
    borderRadius: Metrics.ratio(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: Metrics.ratio(-30),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  popupIcon: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
  popupItemContainer: {
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(4),
  },
  popupItemLabel: {
    fontSize: Metrics.ratio(14),
    color: '#3D4647',
    fontWeight: 'bold',
    flex: 1,
  },
  popupItemValue: {
    fontSize: Metrics.ratio(14),
    color: '#3D4647',
    flex: 1,
  },
  startTestBtnContainer: {
    alignSelf: 'center',
    marginTop: Metrics.ratio(16),
  },
  startTestBtnGradient: {
    borderRadius: Metrics.ratio(20),
    backgroundColor: Colors.Venice_Blue,
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  startTestBtnText: {
    fontSize: Metrics.ratio(14),
    fontWeight: 'bold',
    color: 'white',
  },
});
