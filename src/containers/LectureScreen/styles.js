import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyle: {
    fontWeight: 'bold',
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
  lectureContainer: {
    marginTop: Metrics.screenHeight * 0.01,
    marginBottom: Metrics.screenHeight * 0.17,
  },
  chapterHeadingText: {
    fontSize: Metrics.ratio(16),
    fontWeight: 'bold',
    color: 'black',
    marginTop: Metrics.ratio(8),
  },
  notContentAvailable: {
    fontSize: Metrics.ratio(12),
    color: 'black',
    marginVertical: Metrics.ratio(12),
  },
  chapterVideoHeading: {
    fontSize: Metrics.ratio(13),
    color: 'black',
    marginTop: Metrics.ratio(8),
  },
  chapterVideoContainer: {
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
  chapterVideoProgressImage: {
    width: Metrics.screenWidth * 0.5,
    height: Metrics.ratio(120),
    overflow: 'hidden',
  },
  chapterVideoBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  chapterVideoBtn: {
    borderRadius: Metrics.ratio(20),
    backgroundColor: Colors.Venice_Blue,
    marginVertical: Metrics.ratio(8),
    paddingHorizontal: Metrics.ratio(18),
    paddingVertical: Metrics.ratio(6),
  },
  chapterVideoBtnText: {
    fontSize: Metrics.ratio(12),
    fontWeight: 'bold',
    color: 'white',
  },
});
