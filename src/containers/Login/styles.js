import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    marginTop: Metrics.screenHeight * 0.15,
    alignItems: 'center',
  },
  logo: {
    width: Metrics.ratio(109.2),
    height: Metrics.ratio(123.3),
    marginBottom: Metrics.ratio(32),
  },
  headingText: {
    fontSize: Metrics.ratio(24),
    color: Colors.Venice_Blue,
    marginVertical: Metrics.ratio(16),
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
  },
  button: {
    width: Metrics.screenWidth * 0.85,
    height: Metrics.ratio(50),
    marginHorizontal: Metrics.screenWidth * 0.75,
    marginTop: Metrics.ratio(10),
    backgroundColor: Colors.Venice_Blue,
    borderRadius: Metrics.ratio(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Metrics.ratio(18),
    color: 'white',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(10),
  },
  forgotPasswordText: {
    fontSize: Metrics.ratio(16),
    color: 'grey',
  },
  clickHereText: {
    fontSize: Metrics.ratio(14),
    color: Colors.Venice_Blue,
    fontWeight: 'bold',
    marginLeft: Metrics.ratio(5),
  },
  registerContainer: {
    marginTop: Metrics.screenHeight * 0.03,
    alignItems: 'center',
  },
  registerHeading: {
    fontSize: Metrics.ratio(24),
    color: Colors.Venice_Blue,
    marginBottom: Metrics.ratio(8),
  },
  registerMsgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerMsgText: {
    fontSize: Metrics.ratio(14),
    color: 'grey',
    marginBottom: Metrics.ratio(8),
  },
  registerText: {
    color: Colors.Venice_Blue,
    fontSize: Metrics.ratio(14),
    marginBottom: Metrics.ratio(8),
  },
});
