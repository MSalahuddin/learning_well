// @flow
import React from 'react';
import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ProgressImage from 'react-native-image-progress';

import styles from './styles';

import {Images, Colors} from '../../theme';
import {Header} from '../../components';

const ExercisesVideo = () => {
  return (
    <ImageBackground
      resizeMode={'cover'}
      source={Images.homeBackgroundImage2}
      style={styles.container}>
      <Header
        leftImage={Images.backArrowIcon2}
        leftBtnPress={() => Actions.pop()}
      />

      <View style={{...styles.courseNameContainer}}>
        <Text style={{...styles.courseName}}>{'Subject 1'}</Text>
        <Text style={{...styles.courseDetails}}>
          {13} Chapters | {100} Videos
        </Text>
      </View>

      <View style={{...styles.exercisesContainer}}>
        <Text style={{...styles.chapterName}}>{'Chapter 1'}</Text>
        <Text style={{...styles.chapterExercies}}>{'Solution'}</Text>

        <View style={{...styles.exerciseVideoContainer}}>
          <TouchableOpacity
            style={{...styles.exerciseVideo}}
            onPress={() => {}}>
            <ProgressImage
              resizeMode={'stretch'}
              style={{...styles.exerciseProgressImage}}
              source={{
                uri:
                  'https://learningwell.pk/assets/video/thumbnail/maths3-10-7.png',
              }}
              indicatorProps={{
                borderWidth: 0,
                color: Colors.Venice_Blue,
                unfilledColor: 'rgba(200, 200, 200, 0.2)',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ExercisesVideo;
