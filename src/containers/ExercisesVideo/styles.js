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
  exerciseVideoContainer: {
    marginBottom: Metrics.ratio(24),
  },
  exerciseVideo: {
    marginRight: Metrics.ratio(16),
    marginVertical: Metrics.ratio(8),
    overflow: 'hidden',
    borderRadius: Metrics.ratio(8),
    width: Metrics.screenWidth * 0.7,
    height: Metrics.ratio(160),
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
    width: Metrics.screenWidth * 0.7,
    height: Metrics.ratio(160),
    overflow: 'hidden',
  },
});
