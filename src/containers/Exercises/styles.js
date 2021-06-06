import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  leftImageContainerStyle: {
    alignSelf: 'flex-start',
  },
  rightImageStyle: {
    width: Metrics.ratio(125),
    height: Metrics.ratio(85),
  },
  courseNameContainer: {
    marginHorizontal: Metrics.ratio(16),
    marginTop: Metrics.ratio(-12),
  },
  courseName: {
    fontSize: Metrics.ratio(24),
    color: Colors.white,
    fontWeight: 'bold',
  },
  courseDetails: {
    color: Colors.white,
    fontSize: Metrics.ratio(10),
  },
  exercisesContainer: {
    marginTop: Metrics.ratio(8),
    paddingHorizontal: Metrics.ratio(16),
  },
  chapterName: {
    fontSize: Metrics.ratio(16),
    fontWeight: 'bold',
    color: 'black',
    marginTop: Metrics.ratio(8),
  },
  chapterExercies: {
    fontSize: Metrics.ratio(12),
    color: 'black',
    marginTop: Metrics.ratio(4),
  },
  exerciseListContainer: {
    marginVertical: Metrics.ratio(24),
    marginLeft: Metrics.ratio(16),
  },
  exerciseListItem: {
    flexDirection: 'row',
    marginBottom: Metrics.ratio(8),
  },
  listBullet: {
    width: Metrics.ratio(8),
    height: Metrics.ratio(8),
    backgroundColor: 'red',
    borderRadius: Metrics.ratio(8),
    marginTop: Metrics.ratio(6),
  },
  exerciseName: {
    marginLeft: Metrics.ratio(8),
    fontSize: Metrics.ratio(13),
    color: '#6e6e6e',
  },
  exerciseNumber: {
    fontWeight: 'bold',
  },
  exerciseContainer: {
    marginBottom: Metrics.ratio(24),
  },
  exerciseNameHeading: {
    fontSize: Metrics.ratio(14),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: Metrics.ratio(8),
  },
  exerciseQuestionContainer: {
    width: Metrics.screenWidth * 0.6,
    height: Metrics.ratio(180),
    backgroundColor: '#FFF',
    marginBottom: Metrics.ratio(8),
    paddingHorizontal: Metrics.ratio(8),
    paddingVertical: Metrics.ratio(8),
  },
  questionImageContainer: {
    flex: 1,
  },
  questionImage: {
    width: '100%',
    height: '100%',
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.ratio(8),
  },
  answerTextInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: Metrics.ratio(1),
    paddingVertical: 0,
    fontSize: Metrics.ratio(14),
    marginRight: Metrics.ratio(8),
    color: '#000',
  },
  checkBtn: {
    paddingHorizontal: Metrics.ratio(8),
    paddingVertical: Metrics.ratio(4),
    backgroundColor: Colors.Venice_Blue,
    borderColor: Colors.Venice_Blue,
    borderWidth: Metrics.ratio(1),
  },
  checkBtnText: {
    fontSize: Metrics.ratio(14),
    color: '#FFF',
  },
  solutionBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  solutionBtnImage: {
    width: Metrics.ratio(45),
    height: Metrics.ratio(45),
  },
  solutionTextContainer: {
    marginLeft: Metrics.ratio(8),
  },
  solutionBtnText: {
    fontSize: Metrics.ratio(13),
    fontWeight: 'bold',
    color: '#000',
  },
});
