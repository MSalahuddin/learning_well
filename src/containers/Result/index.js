import React, {useState, useEffect} from 'react';
import {ImageBackground, ScrollView, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import styles from './styles';

import {Images} from '../../theme';
import {Header, ListCard, SpinnerLoader} from '../../components';
import {createResource} from '../../config/SimpleApiCalls';
import {QUIZ_RESULT_API} from '../../config/WebServices';

const Result = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      getQuizResults();
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

  const getQuizResults = async () => {
    let payload = new FormData();
    payload.append('user_id', user.loginid);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      setIsLoading(true);
      const result = await createResource(
        QUIZ_RESULT_API,
        payload,
        null,
        headers,
      );
      if (result.code === 1) {
        setQuizResults(result.quizresult);
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
        headerText={'Result'}
        headerTextStyle={{...styles.headerTextStyle}}
      />
      <ScrollView style={{...styles.tableContainer}}>
        {quizResults.length > 0 &&
          quizResults.map((val) => {
            return (
              <ListCard
                leftTopText={val.book_name}
                leftBottomText={val.chapter_name}
                rightText={`Date: ${moment(val.date).format('DD-MMM-YYYY')}`}
              />
            );
          })}

        {!isLoading && quizResults.length < 1 && (
          <View style={{...styles.notFoundContainer}}>
            <Text style={{...styles.notFoundText}}>No Record Found!</Text>
          </View>
        )}
      </ScrollView>
      <SpinnerLoader isloading={isLoading} />
    </ImageBackground>
  );
};

export default Result;
