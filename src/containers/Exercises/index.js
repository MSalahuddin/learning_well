// @flow
import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ProgressImage from 'react-native-image-progress';

import styles from './styles';

import {Images, Metrics, Fonts, Colors} from '../../theme';
import {Header} from '../../components';

const Exercises = () => {
  return (
    <ImageBackground
      resizeMode={'cover'}
      source={Images.homeBackgroundImage2}
      style={styles.container}>
      <Header
        leftImage={Images.backArrowIcon2}
        leftBtnPress={() => Actions.pop()}
        rightImage={Images.contactUsIcon}
        rightImageStyle={styles.rightImageStyle}
      />

      <View style={{...styles.courseNameContainer}}>
        <Text style={{...styles.courseName}}>{'Subject 1'}</Text>
        <Text style={{...styles.courseDetails}}>
          {13} Chapters | {100} Videos
        </Text>
      </View>

      <View style={{...styles.exercisesContainer}}>
        <Text style={{...styles.chapterName}}>{'Chapter 1'}</Text>
        <Text style={{...styles.chapterExercies}}>{'Exercises'}</Text>

        <View style={{...styles.exerciseListContainer}}>
          <View style={{...styles.exerciseListItem}}>
            <View style={{...styles.listBullet}} />
            <Text style={{...styles.exerciseName}}>
              <Text style={{...styles.exerciseNumber}}>
                {'Exercise 1.2: 1.'}
              </Text>{' '}
              {'Write the following numbers in expanded form.'}
            </Text>
          </View>

          <View style={{...styles.exerciseListItem}}>
            <View style={{...styles.listBullet}} />
            <Text style={{...styles.exerciseName}}>
              <Text style={{...styles.exerciseNumber}}>
                {'Exercise 1.2: 1.'}
              </Text>{' '}
              {'Write the following numbers in expanded form.'}
            </Text>
          </View>
        </View>

        <View style={{...styles.exerciseVideoContainer}}>
          <Text style={{...styles.exerciseVideoName}}>{'Exercise 1'}</Text>
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

          <View style={{...styles.solutionBtnContainer}}>
            <Image
              source={Images.sidemenuArrowIcon}
              resizeMode={'contain'}
              style={{...styles.solutionBtnImage}}
            />
            <TouchableOpacity style={{...styles.solutionTextContainer}}>
              <Text style={{...styles.solutionBtnText}}>
                <Text style={{color: Colors.Venice_Blue}}>{'Goto'}</Text>{' '}
                {'Solution Video'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView />
    </ImageBackground>
  );
};

export default Exercises;
