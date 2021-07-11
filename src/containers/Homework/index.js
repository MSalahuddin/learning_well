import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import {Images} from '../../theme';
import {Header, CustomTable} from '../../components';
import {createResource} from '../../config/SimpleApiCalls';
import {HOMEWORK_API} from '../../config/WebServices';

const Homework = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      getHomework();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getHomework = async () => {
    let payload = new FormData();
    payload.append('school_id', user.school_id);
    payload.append('section_id', user.section_id);
    payload.append('class_id', user.class_id);
    payload.append('user_id', user.loginid);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const homework = await createResource(
        HOMEWORK_API,
        payload,
        null,
        headers,
      );
      console.log(homework, 'homework');
    } catch (error) {
      console.log('error ==> ', error);
    }
  };

  const getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      let parsedValue = JSON.parse(value);
      if (value !== null) {
        setUser(parsedValue);
      }
    } catch (error) {
      console.log('error ==> ', error);
    }
  };

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
