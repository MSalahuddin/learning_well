import React from 'react';
import {Text, View, ImageBackground, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from './styles';

import {Images} from '../../theme';
import {Header, Card} from '../../components';

const Home = () => {
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
      onPress: '',
    },
    {
      name: 'Assigned Test',
      image: Images.assignedTestIcon,
      onPress: '',
    },
    {
      name: 'Result',
      image: Images.resultIcon,
      onPress: '',
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
        leftBtnPress={() => {}}
        rightImage={Images.logo}
        rightImageStyle={styles.rightImageStyle}
      />
      <View style={{...styles.messageContainer}}>
        <Text style={{...styles.messageText}}>{'Hello !'}</Text>
        <Text style={{...styles.messageName}}>{'Shariq'}</Text>
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
