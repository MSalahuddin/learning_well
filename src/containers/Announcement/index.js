import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import styles from './styles';

import {Images} from '../../theme';
import {Header, SpinnerLoader} from '../../components';
import {createResource} from '../../config/SimpleApiCalls';
import {ANNOUNCEMENT_API} from '../../config/WebServices';

const Announcement = () => {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      getAnnouncement();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getAnnouncement = async () => {
    let payload = new FormData();
    payload.append('school_id', user.school_id);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      setIsLoading(true);
      const result = await createResource(
        ANNOUNCEMENT_API,
        payload,
        null,
        headers,
      );
      if (result.code === 1) {
        setAnnouncements(result.announcement);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error ==> ', error);
      setIsLoading(false);
    }
  };

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

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={Images.homeBackgroundImage2}
      style={styles.container}>
      <Header
        leftImage={Images.backArrowIcon2}
        leftBtnPress={() => Actions.pop()}
        headerText={'Announcements'}
        headerTextStyle={{...styles.headerTextStyle}}
      />

      <ScrollView style={{...styles.tableContainer}}>
        {announcements.length > 0 &&
          announcements.map((val, index) => (
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.cardContainer,
                borderBottomWidth: index === announcements.length - 1 ? 0 : 1,
              }}>
              <TouchableOpacity style={{...styles.cardRow}}>
                <View style={{...styles.cardImageContainer}}>
                  <Image
                    source={Images.webIcon}
                    resizeMode={'contain'}
                    style={{...styles.cardImage}}
                  />
                </View>
                <View style={{...styles.cardDetailRow}}>
                  <Text style={{...styles.cardTitleText}}>{val.title}</Text>
                  <Text style={{...styles.cardExpiryText}}>
                    {`Expiry Date: ${moment(val.expiry_date).format(
                      'DD-MMM-YYYY',
                    )}`}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        {!isLoading && announcements.length < 1 && (
          <View style={{...styles.notFoundContainer}}>
            <Text style={{...styles.notFoundText}}>No Record Found!</Text>
          </View>
        )}
      </ScrollView>
      <SpinnerLoader isloading={isLoading} />
    </ImageBackground>
  );
};

export default Announcement;