import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

import {Header} from '../../components';
import {Metrics, Colors, Images} from '../../theme';

const Feedback = () => {
  const [ratingCount, setRatingCount] = useState(3);
  const [message, setMessage] = useState('');

  const onChangeMessage = (text) => setMessage(text);

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
      </View>

      <View style={{...styles.buttonContainer}}>
        <TouchableOpacity onPress={() => {}} style={{...styles.button}}>
          <Text style={{...styles.buttonText}}>Send</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Feedback;
