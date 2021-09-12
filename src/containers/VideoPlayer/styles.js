import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'white',
    elevation: 4,
    flexDirection: 'row',
  },
  backImage: {
    width: Metrics.ratio(40),
    height: Metrics.ratio(40),
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(10),
    marginLeft: Metrics.ratio(10),
    borderRadius: 100,
  },
  headingContainer: {
    width: Metrics.screenWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: Metrics.ratio(20),
    color: 'black',
  },
});
