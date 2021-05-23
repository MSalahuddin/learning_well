// @flow
import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

import {Images, Colors} from '../../theme';
import {Header} from '../../components';

const Exercises = () => {
  const [exerciseAnswer, setExerciseAnswer] = useState('');

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

      <ScrollView>
        <View style={{...styles.exercisesContainer}}>
          <Text style={{...styles.chapterName}}>{'Chapter 1'}</Text>
          <Text style={{...styles.chapterExercies}}>{'Exercises'}</Text>

          <View style={{...styles.exerciseListContainer}}>
            <TouchableOpacity style={{...styles.exerciseListItem}}>
              <View style={{...styles.listBullet}} />
              <Text style={{...styles.exerciseName}}>
                <Text style={{...styles.exerciseNumber}}>
                  {'Exercise 1.2: 1.'}
                </Text>{' '}
                {'Write the following numbers in expanded form.'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.exerciseListItem}}>
              <View style={{...styles.listBullet}} />
              <Text style={{...styles.exerciseName}}>
                <Text style={{...styles.exerciseNumber}}>
                  {'Exercise 1.2: 1.'}
                </Text>{' '}
                {'Write the following numbers in expanded form.'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{...styles.exerciseContainer}}>
            <Text style={{...styles.exerciseNameHeading}}>{'Exercise 1'}</Text>
            <View style={{...styles.exerciseQuestionContainer}}>
              <View style={{...styles.questionImageContainer}}>
                <Image
                  source={Images.exampleExercise}
                  resizeMode={'contain'}
                  style={{...styles.questionImage}}
                />
              </View>

              <View style={{...styles.answerContainer}}>
                <TextInput
                  style={{...styles.answerTextInput}}
                  value={exerciseAnswer}
                  onChangeText={(text) => setExerciseAnswer(text)}
                />
                <TouchableOpacity
                  style={{...styles.checkBtn}}
                  onPress={() => {}}>
                  <Text style={{...styles.checkBtnText}}>{'Check'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{...styles.solutionBtnContainer}}>
              <Image
                source={Images.sidemenuArrowIcon}
                resizeMode={'contain'}
                style={{...styles.solutionBtnImage}}
              />
              <TouchableOpacity
                style={{...styles.solutionTextContainer}}
                onPress={() => Actions.exercisesVideo()}>
                <Text style={{...styles.solutionBtnText}}>
                  <Text style={{color: Colors.Venice_Blue}}>{'Goto'}</Text>{' '}
                  {'Solution Video'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Exercises;
