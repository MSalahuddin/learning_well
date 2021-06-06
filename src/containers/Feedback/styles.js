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
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.ratio(32),
  },
  ratingItem: {
    marginHorizontal: Metrics.ratio(4),
  },
  messageContainer: {
    marginHorizontal: Metrics.ratio(32),
    marginTop: Metrics.ratio(48),
  },
  messageLabel: {
    fontSize: Metrics.ratio(12),
    color: Colors.black,
    marginBottom: Metrics.ratio(8),
  },
  messageTextInput: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.ratio(8),
    color: Colors.black,
    fontSize: Metrics.ratio(14),
    textAlignVertical: 'top',
    padding: Metrics.ratio(16),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: Metrics.ratio(32),
    marginVertical: Metrics.ratio(16),
  },
  button: {
    borderRadius: Metrics.ratio(30),
    backgroundColor: Colors.Venice_Blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.ratio(24),
    paddingVertical: Metrics.ratio(6),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    fontSize: Metrics.ratio(14),
    color: Colors.white,
  },
});
