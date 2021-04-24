import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  rightImageStyle: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.ratio(-50),
    marginBottom: Metrics.ratio(12),
  },
  messageText: {
    fontSize: Metrics.ratio(24),
    color: Colors.white,
    marginBottom: Metrics.ratio(4),
  },
  messageName: {
    fontSize: Metrics.ratio(30),
    color: Colors.white,
    fontWeight: 'bold',
  },
  cardListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: Metrics.ratio(12),
  },
});
