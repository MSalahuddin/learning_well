import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyle: {
    fontWeight: 'bold',
  },
  tableContainer: {
    marginTop: Metrics.screenHeight * 0.2,
  },

  cardContainer: {
    marginHorizontal: Metrics.ratio(14),
    borderBottomColor: '#CCCCCC',
    paddingBottom: Metrics.ratio(8),
    marginBottom: Metrics.ratio(8),
  },
  cardRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.Venice_Blue,
    borderRadius: Metrics.ratio(6),
    overflow: 'hidden',
  },
  cardImageContainer: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: Colors.Venice_Blue,
    borderRightWidth: 1,
  },
  cardImage: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
  cardDetailRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.ratio(12),
  },
  cardTitleText: {
    flex: 1,
    fontSize: Metrics.ratio(14),
    color: Colors.black,
  },
  cardExpiryText: {
    fontSize: Metrics.ratio(10),
    color: Colors.black,
  },

  notFoundContainer: {
    flex: 1,
    height: Metrics.screenHeight * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: Metrics.ratio(16),
    color: '#6e6e6e',
  },
});
