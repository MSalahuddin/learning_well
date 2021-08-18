// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

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
    paddingHorizontal: Metrics.ratio(16),
  },
  cardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: Metrics.ratio(12),
  },
  moreBtn: {
    alignSelf: 'center',
    padding: Metrics.ratio(8),
    marginVertical: Metrics.ratio(8),
  },
  moreIcon: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
  },
  modalStyle: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: Metrics.ratio(0),
    borderTopRightRadius: Metrics.ratio(0),
    paddingVertical: Metrics.ratio(24),
  },
  handleStyle: {
    backgroundColor: '#000',
    height: Metrics.ratio(3),
    width: Metrics.ratio(20),
    borderRadius: Metrics.ratio(0),
  },
  modalizeContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenHeight * 0.3,
  },
  modalizeHeadingText: {
    fontSize: Metrics.ratio(16),
    color: Colors.black,
    textAlign: 'center',
  },
  modalizeHeadingUnderline: {
    width: Metrics.ratio(80),
    height: Metrics.ratio(2),
    backgroundColor: Colors.Venice_Blue,
    alignSelf: 'center',
    marginTop: Metrics.ratio(2),
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(24),
  },
  bookBtn: {
    width: Metrics.screenWidth * 0.35,
    borderRadius: Metrics.ratio(32),
    backgroundColor: Colors.Venice_Blue,
    paddingVertical: Metrics.ratio(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.ratio(8),
  },
  bookBtnText: {
    fontSize: Metrics.ratio(14),
    color: Colors.white,
  },
  lectureBtn: {
    borderColor: Colors.Venice_Blue,
    borderWidth: Metrics.ratio(1),
    borderRadius: Metrics.ratio(32),
    width: Metrics.screenWidth * 0.35,
    paddingVertical: Metrics.ratio(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.ratio(8),
  },
  lectureBtnText: {
    fontSize: Metrics.ratio(14),
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
