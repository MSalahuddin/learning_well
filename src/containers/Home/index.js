import React, {useState, useEffect} from 'react';
import {Text, View, ImageBackground, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import {Images} from '../../theme';
import {Header, Card} from '../../components';

const Home = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const _user = await AsyncStorage.getItem('@storage_Key');
      if (_user !== null) {
        let userParsed = JSON.parse(_user);
        setUser(userParsed);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cardList = [
    {
      name: 'Announcement',
      image: Images.announcementIcon,
      onPress: '',
    },
    {
      name: 'Subject',
      image: Images.subjectIcon,
      onPress: () => Actions.Subjects(),
    },
    {
      name: 'Homework',
      image: Images.homeworkIcon,
      onPress: () => Actions.Homework(),
    },
    {
      name: 'Assigned Test',
      image: Images.assignedTestIcon,
      onPress: () => Actions.AssignedTest(),
    },
    {
      name: 'Result',
      image: Images.resultIcon,
      onPress: () => Actions.Result(),
    },
    {
      name: 'Feedback',
      image: Images.feedbackIcon,
      onPress: '',
    },
  ];

  return (
    <ImageBackground
      source={Images.homeBackgroundImage2}
      resizeMode={'cover'}
      style={{...styles.container}}>
      <Header
        leftImage={Images.sideMenuIcon2}
        leftBtnPress={() => props.navigation.openDrawer()}
        rightImage={Images.logo}
        rightImageStyle={styles.rightImageStyle}
      />
      <View style={{...styles.messageContainer}}>
        <Text style={{...styles.messageText}}>{'Hello !'}</Text>
        <Text style={{...styles.messageName}}>{user?.fullname}</Text>
      </View>
      <ScrollView>
        <View style={{...styles.cardListContainer}}>
          {cardList.map((val) => (
            <Card image={val.image} name={val.name} onPress={val.onPress} />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;
