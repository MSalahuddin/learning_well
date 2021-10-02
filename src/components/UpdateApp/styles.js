// @flow
import {StyleSheet} from 'react-native';

import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backdropContainer: {
    position: 'absolute',
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.ratio(16),
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: Metrics.ratio(4),
    padding: Metrics.ratio(16),
  },
  title: {
    fontSize: Metrics.ratio(24),
    fontWeight: 'bold',
    color: '#2F2E41',
    marginBottom: Metrics.ratio(12),
  },
  message: {
    fontSize: Metrics.ratio(16),
    color: '#2F2E41',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: Metrics.ratio(12),
  },
  closeButtonText: {
    fontSize: Metrics.ratio(13),
    color: '#01875F',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#01875F',
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(8),
    marginLeft: Metrics.ratio(16),
    borderRadius: Metrics.ratio(4),
  },
  downloadButtonText: {
    fontSize: Metrics.ratio(13),
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
