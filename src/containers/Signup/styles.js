import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headingText: {
    fontSize: Metrics.ratio(24),
    color: Colors.white,
    marginTop: Metrics.screenHeight * 0.04,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: Metrics.screenHeight * 0.04,
    alignItems: 'center',
  },
  textInput: {
    width: Metrics.screenWidth * 0.85,
    height: Metrics.ratio(50),
    backgroundColor: 'white',
    marginHorizontal: Metrics.screenWidth * 0.075,
    borderColor: Colors.Venice_Blue,
    borderWidth: Metrics.ratio(1),
    borderRadius: Metrics.ratio(40),
    color: 'grey',
    fontSize: Metrics.ratio(16),
    paddingLeft: Metrics.ratio(20),
    marginTop: Metrics.ratio(10),
  },
  modalDropdown: {
    width: Metrics.screenWidth * 0.85,
    height: Metrics.ratio(50),
    backgroundColor: 'white',
    marginHorizontal: Metrics.screenWidth * 0.075,
    borderColor: Colors.Venice_Blue,
    borderWidth: Metrics.ratio(1),
    borderRadius: Metrics.ratio(40),
    color: 'grey',
    fontSize: Metrics.ratio(16),
    paddingLeft: Metrics.ratio(20),
    paddingTop: Metrics.ratio(12),
    marginTop: Metrics.ratio(10),
  },
  dropdownStyle: {
    width: Metrics.screenWidth * 0.85,
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'grey',
    fontSize: Metrics.ratio(16),
  },
  submitButton: {
    width: Metrics.screenWidth * 0.85,
    height: Metrics.ratio(50),
    marginHorizontal: Metrics.screenWidth * 0.75,
    marginTop: Metrics.ratio(10),
    backgroundColor: Colors.Venice_Blue,
    borderRadius: Metrics.ratio(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: Metrics.ratio(18),
    color: 'white',
  },
  signInContainer: {
    marginTop: Metrics.screenHeight * 0.02,
    alignItems: 'center',
  },
  signInHeading: {
    fontSize: Metrics.ratio(24),
    color: Colors.Venice_Blue,
    marginBottom: Metrics.ratio(8),
  },
  signInMsgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInMsgText: {
    fontSize: Metrics.ratio(16),
    color: 'grey',
    marginBottom: Metrics.ratio(8),
  },
  signInText: {
    fontSize: Metrics.ratio(16),
    color: Colors.Venice_Blue,
    marginBottom: Metrics.ratio(8),
  },
});
