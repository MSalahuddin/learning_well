import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import {Header, SpinnerLoader} from '../../components';
import {Metrics, Colors, Images} from '../../theme';
import {createResource} from '../../config/SimpleApiCalls';
import {FEEDBACK_API} from '../../config/WebServices';

const Feedback = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [user, setUser] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

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

  const onChangeMessage = (text) => setMessage(text);

  const checkValidation = () => {
    if (ratingCount === 0) {
      setMessageError('Rating is required!');
      setTimeout(() => {
        setMessageError('');
      }, 3000);
    } else if (!message) {
      setMessageError('Message is required!');
      setTimeout(() => {
        setMessageError('');
      }, 3000);
    } else {
      sendFeedback();
    }
  };

  const sendFeedback = async () => {
    let payload = new FormData();
    payload.append('user_id', user.loginid);
    payload.append('school_id', user.school_id);
    payload.append('stars', ratingCount);
    payload.append('message', message);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      setIsLoading(true);
      const result = await createResource(FEEDBACK_API, payload, null, headers);
      if (result.code === 1) {
        Alert.alert('Thank You!', 'Your message has been submitted.', [
          {
            text: 'Ok',
            onPress: () => Actions.pop(),
          },
        ]);
      }
      console.log(result.code);
      setIsLoading(false);
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
        rightImage={Images.feedbackNavIcon}
        rightImageStyle={styles.rightImageStyle}
      />

      <View style={{...styles.ratingContainer}}>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setRatingCount(item)}
              style={{...styles.ratingItem}}>
              <MaterialCommunityIcons
                name={'star'}
                color={
                  item <= ratingCount ? Colors.Yellow_Orange : Colors.white
                }
                size={Metrics.ratio(30)}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{...styles.messageContainer}}>
        <Text style={{...styles.messageLabel}}>Message</Text>
        <TextInput
          value={message}
          onChangeText={onChangeMessage}
          multiline={true}
          numberOfLines={8}
          placeholder={'Type a message...'}
          style={{...styles.messageTextInput}}
        />
        <Text style={{...styles.messageErrorText}}>{messageError}</Text>
      </View>

      <View style={{...styles.buttonContainer}}>
        <TouchableOpacity onPress={checkValidation} style={{...styles.button}}>
          <Text style={{...styles.buttonText}}>Send</Text>
        </TouchableOpacity>
      </View>
      <SpinnerLoader isloading={isLoading} />
    </ImageBackground>
  );
};

export default Feedback;
