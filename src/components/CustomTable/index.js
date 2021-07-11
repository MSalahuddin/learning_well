import React from 'react';
import {Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

import styles from './styles';

const CustomTable = (props) => {
  const {tableHead, tableData, tableKeys, isDate, dateIndex} = props;

  return (
    <View style={{...styles.table}}>
      <View style={{...styles.thead}}>
        <View style={{...styles.theadRow}}>
          {tableHead.map((val) => {
            return (
              <View key={val.name} style={{...styles.th}}>
                <Text style={{...styles.thText}}>{val.name}</Text>
                {val.image ? (
                  <Image
                    source={val.image}
                    resizeMode={'contain'}
                    style={{...styles.thImage}}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
      <View style={{...styles.tbody}}>
        {tableData.map((item, iIndex) => {
          return (
            <View style={{...styles.tbodyRow}}>
              {tableKeys.map((key, kIndex) => {
                return (
                  <View key={`${iIndex}-${kIndex}`} style={{...styles.td}}>
                    {isDate && dateIndex === kIndex ? (
                      <Text style={{...styles.tdText}}>
                        {moment(item[key]).format('DD-MMMM-YYYY')}
                      </Text>
                    ) : (
                      <Text style={{...styles.tdText}}>{item[key]}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

CustomTable.defaultProps = {
  tableHead: [],
  tableData: [],
  tableKeys: [],
};

CustomTable.propTypes = {
  tableHead: PropTypes.array,
  tableData: PropTypes.array,
  tableKeys: PropTypes.array,
};

export default CustomTable;
