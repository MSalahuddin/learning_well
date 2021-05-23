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
    marginBottom: Metrics.screenHeight * 0.17,
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
  exerciseVideoContainer: {
    marginBottom: Metrics.ratio(24),
  },
  exerciseVideoName: {
    fontSize: Metrics.ratio(14),
    fontWeight: 'bold',
    color: '#000',
  },
  exerciseVideo: {
    marginRight: Metrics.ratio(16),
    marginVertical: Metrics.ratio(8),
    overflow: 'hidden',
    borderRadius: Metrics.ratio(8),
    width: Metrics.screenWidth * 0.5,
    height: Metrics.ratio(120),
    borderColor: Colors.white,
    borderWidth: Metrics.ratio(1),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseProgressImage: {
    width: Metrics.screenWidth * 0.5,
    height: Metrics.ratio(120),
    overflow: 'hidden',
  },
  solutionBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  solutionBtnImage: {
    width: Metrics.ratio(35),
    height: Metrics.ratio(35),
  },
  solutionTextContainer: {
    marginLeft: Metrics.ratio(16),
  },
  solutionBtnText: {
    fontSize: Metrics.ratio(13),
    fontWeight: 'bold',
    color: '#000',
  },
});
