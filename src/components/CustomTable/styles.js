import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  table: {
    marginHorizontal: Metrics.ratio(16),
  },
  thead: {
    borderTopWidth: Metrics.ratio(1.5),
    borderTopColor: '#FFF',
    paddingVertical: Metrics.ratio(12),
  },
  theadRow: {
    flex: 1,
    flexDirection: 'row',
  },
  th: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thText: {
    fontSize: Metrics.ratio(16),
    fontWeight: 'bold',
    color: '#FFF',
  },
  thImage: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    marginLeft: Metrics.ratio(4),
  },
  tbodyRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(12),
    borderBottomWidth: Metrics.ratio(1),
    borderBottomColor: '#ccc',
  },
  td: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tdText: {
    fontSize: Metrics.ratio(13),
    color: '#6e6e6e',
  },
});
