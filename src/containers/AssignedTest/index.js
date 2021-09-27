import React, {useState, useEffect} from 'react';
import {ImageBackground, ScrollView, View, Text, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import styles from './styles';

import {Images} from '../../theme';
import {Header, ListCard, SpinnerLoader} from '../../components';
import {createResource} from '../../config/SimpleApiCalls';
import {ASSIGNED_TEST_API, START_TEST_API} from '../../config/WebServices';

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
      if (result.code === 1) {
        setAssignedTest(result.assignedtest);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error ==> ', error);
      setIsLoading(false);
    }
  };

  const onPressAssignedTest = async ({testId, chapterName, bookName}) => {
    let payload = new FormData();
    payload.append('test_id', testId);
    payload.append('user_id', user.loginid);
    payload.append('school_id', user.school_id);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      setIsLoading(true);
      const result = await createResource(
        START_TEST_API,
        payload,
        null,
        headers,
      );
      if (result.code === 1) {
        // Actions.TestScreen({
        //   // quiz: result.data.questions,
        //   chapterName,
        //   chapterId: testId,
        //   bookName,
        // });
      } else if (result.code === 0) {
        Alert.alert('Message', result.msg);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error ==> ', error);
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={Images.homeBackgroundImage3}
      style={{...styles.container}}>
      <Header
        leftImage={Images.backArrowIcon2}
        leftBtnPress={() => Actions.pop()}
        headerText={'Assigned Test'}
        headerTextStyle={{...styles.headerTextStyle}}
      />

      <ScrollView style={{...styles.tableContainer}}>
        {assignedTest.length > 0 &&
          assignedTest.map((val, index) => {
            return (
              <ListCard
                onPress={() =>
                  onPressAssignedTest({
                    chapterName: val.name,
                    testId: val.id,
                    bookName: val.book,
                  })
                }
                leftTopText={val.book}
                leftBottomText={'Chapter'}
                centerText={val.name}
                rightText={`Date: ${moment(val.date).format('DD-MMM-YYYY')}`}
              />
            );
          })}
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
