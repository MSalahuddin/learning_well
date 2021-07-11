import React, {useState, useEffect} from 'react';
import {ImageBackground, ScrollView, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import {Images} from '../../theme';
import {Header, CustomTable, SpinnerLoader} from '../../components';
import {createResource} from '../../config/SimpleApiCalls';
import {ASSIGNED_TEST_API} from '../../config/WebServices';

const AssignedTest = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [assignedTest, setAssignedTest] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      getAssignedTest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem('@storage_Key');
      let parsedValue = JSON.parse(value);
      setIsLoading(false);
      if (value !== null) {
        setUser(parsedValue);
      }
    } catch (error) {
      console.log('error ==> ', error);
      setIsLoading(false);
    }
  };

  const getAssignedTest = async () => {
    let payload = new FormData();
    payload.append('school_id', user.school_id);
    payload.append('class_id', user.class_id);
    payload.append('sec_id', user.section_id);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      setIsLoading(true);
      const result = await createResource(
        ASSIGNED_TEST_API,
        payload,
        null,
        headers,
      );
      console.log(result, 'result');
      if (result.code === 1) {
        setAssignedTest(result.assignedtest);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error ==> ', error);
      setIsLoading(false);
    }
  };

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
      image: Images.dateTable,
    },
  ];

  const tableKeys = ['name', 'book', 'date'];

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={Images.homeBackgroundImage2}
      style={styles.container}>
      <Header
        leftImage={Images.backArrowIcon2}
        leftBtnPress={() => Actions.pop()}
        rightImage={Images.assignedTestNavIcon}
        rightImageStyle={styles.rightImageStyle}
      />

      <ScrollView style={{...styles.tableContainer}}>
        {assignedTest.length > 0 && (
          <CustomTable
            tableHead={tableHead}
            tableData={assignedTest}
            tableKeys={tableKeys}
            isDate={true}
            dateIndex={2}
          />
        )}

        {!isLoading && assignedTest.length < 1 && (
          <View style={{...styles.notFoundContainer}}>
            <Text style={{...styles.notFoundText}}>No Record Found!</Text>
          </View>
        )}
      </ScrollView>
      <SpinnerLoader isloading={isLoading} />
    </ImageBackground>
  );
};

export default AssignedTest;
