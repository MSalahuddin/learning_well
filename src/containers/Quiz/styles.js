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
  questionContainer: {
    marginHorizontal: Metrics.ratio(16),
    marginTop: Metrics.ratio(40),
  },
  chapterName: {
    fontSize: Metrics.ratio(15),
    color: Colors.black,
    marginBottom: Metrics.ratio(16),
  },
  questionListContainer: {
    marginHorizontal: Metrics.ratio(12),
  },
  questionView: {
    paddingHorizontal: Metrics.ratio(14),
    paddingVertical: Metrics.ratio(10),
    backgroundColor: Colors.Venice_Blue,
    borderRadius: Metrics.ratio(50),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  questionText: {
    fontSize: Metrics.ratio(15),
    color: Colors.white,
  },
  optionContainer: {
    marginTop: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(14),
    paddingVertical: Metrics.ratio(10),
    borderColor: Colors.Venice_Blue,
    borderWidth: Metrics.ratio(1),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Metrics.ratio(50),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  radioCircle: {
    height: Metrics.ratio(18),
    width: Metrics.ratio(18),
    borderRadius: Metrics.ratio(9),
    borderWidth: 1,
    borderColor: Colors.Venice_Blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInnerCircle: {
    width: Metrics.ratio(12),
    height: Metrics.ratio(12),
    borderRadius: Metrics.ratio(6),
    backgroundColor: Colors.Venice_Blue,
  },
  optionText: {
    fontSize: Metrics.ratio(15),
    color: Colors.black,
    marginLeft: Metrics.ratio(8),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: Metrics.ratio(24),
    marginVertical: Metrics.ratio(20),
  },
  button: {
    borderRadius: Metrics.ratio(30),
    backgroundColor: Colors.Venice_Blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.ratio(24),
    paddingVertical: Metrics.ratio(8),
    marginHorizontal: Metrics.ratio(4),
  },
  buttonText: {
    fontSize: Metrics.ratio(14),
    color: Colors.white,
  },
});
