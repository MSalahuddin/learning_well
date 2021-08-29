import React, {useEffect, useState} from 'react';
import {ImageBackground, ScrollView, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import styles from './styles';

import {Images} from '../../theme';
import {Header, ListCard, SpinnerLoader} from '../../components';
import {createResource} from '../../config/SimpleApiCalls';
import {HOMEWORK_API} from '../../config/WebServices';

const Homework = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      getHomework();
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
      setIsLoading(true);
      const result = await createResource(HOMEWORK_API, payload, null, headers);
      if (result.code === 1) {
        setHomeworks(result.homework);
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
      style={styles.container}>
      <Header
        leftImage={Images.backArrowIcon2}
        leftBtnPress={() => Actions.pop()}
        headerText={'Homework'}
        headerTextStyle={{...styles.headerTextStyle}}
      />

      <ScrollView style={{...styles.tableContainer}}>
        {homeworks.length > 0 &&
          homeworks.map((val) => {
            return (
              <ListCard
                centerText={val.book_name}
                centerTextStyle={{...styles.centerTextStyle}}
                rightText={`Submission Date: ${moment(val.exp_date).format(
                  'DD-MMM-YYYY',
                )}`}
              />
            );
          })}

        {!isLoading && homeworks.length < 1 && (
          <View style={{...styles.notFoundContainer}}>
            <Text style={{...styles.notFoundText}}>No Record Found!</Text>
          </View>
        )}
      </ScrollView>
      <SpinnerLoader isloading={isLoading} />
    </ImageBackground>
  );
};

export default Homework;
