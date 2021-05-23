// @flow
import React from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

import {Images} from '../../theme';
import {Header, CustomTable} from '../../components';

const Result = () => {
  const tableHead = [
    {
      name: 'Name',
      image: null,
    },
    {
      name: 'Subject',
      image: Images.editPen,
    },
    {
      name: 'Date',
      image: Images.editPen,
    },
  ];

  const tableKeys = ['name', 'subject', 'date'];

  const tableData = [
    {
      name: 'Test 1',
      subject: 'Subject 1',
      date: '30-June-2021',
    },
    {
      name: 'Test 2',
      subject: 'Subject 2',
      date: '25-July-2021',
    },
    {
      name: 'Test 3',
      subject: 'Subject 3',
      date: '20-August-2021',
    },
  ];

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={Images.homeBackgroundImage2}
      style={styles.container}>
      <Header
        leftImage={Images.backArrowIcon2}
        leftBtnPress={() => Actions.pop()}
        rightImage={Images.resultNavIcon}
        rightImageStyle={styles.rightImageStyle}
      />

      <ScrollView style={{...styles.tableContainer}}>
        <CustomTable
          tableHead={tableHead}
          tableData={tableData}
          tableKeys={tableKeys}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default Result;
