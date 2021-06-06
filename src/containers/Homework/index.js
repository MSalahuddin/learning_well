// @flow
import React from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

import {Images} from '../../theme';
import {Header, CustomTable} from '../../components';

const Homework = () => {
  const tableHead = [
    {
      name: 'Subject',
      image: Images.editPen,
    },
    {
      name: 'Submission Date',
      image: Images.dateTable,
    },
  ];

  const tableKeys = ['subject', 'date'];

  const tableData = [
    {
      subject: 'Subject 1',
      date: '30-June-2021',
    },
    {
      subject: 'Subject 2',
      date: '25-July-2021',
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
        rightImage={Images.homeworkNavIcon}
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

export default Homework;
