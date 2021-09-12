import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ProgressImage from 'react-native-image-progress';
import {useDispatch} from 'react-redux';

import styles from './styles';

import {Images, Colors} from '../../theme';
import {Header, SpinnerLoader} from '../../components';
import {createResource} from '../../config/SimpleApiCalls';
import {EXERCISES_API} from '../../config/WebServices';
import {drawerMenuSwitched as navigationChanged} from '../../actions/navigationActions';

const Exercises = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({});
  // const [exerciseAnswer, setExerciseAnswer] = useState('');

  useEffect(() => {
    if (props.chapterId) {
      getExercises();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chapterId]);

  const getExercises = async () => {
    let payload = new FormData();
    payload.append('chapter_id', props.chapterId);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      setIsLoading(true);
      const result = await createResource(
        EXERCISES_API,
        payload,
        null,
        headers,
      );
      if (result.code === 1 && result.exercises.length) {
        setExercises(result.exercises);
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
        headerText={props.bookName}
        headerTextStyle={{...styles.headerTextStyle}}
      />

      {exercises.length ? (
        <ScrollView>
          <View style={{...styles.exercisesContainer}}>
            <Text style={{...styles.chapterName}}>{props.chapterName}</Text>
            <Text style={{...styles.chapterExercies}}>{'Exercises'}</Text>

            <View style={{...styles.exerciseListContainer}}>
              {exercises.map((exercise) => {
                return (
                  <TouchableOpacity
                    style={{...styles.exerciseListItem}}
                    onPress={() => setSelectedExercises(exercise)}>
                    <View style={{...styles.listBullet}} />
                    <Text style={{...styles.exerciseName}}>
                      <Text style={{...styles.exerciseNumber}}>
                        {exercise.exercise_topic.split(':')[0]}
                      </Text>{' '}
                      {exercise.exercise_topic.split(':')[1]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {selectedExercises?.exercise_path ? (
              <TouchableOpacity
                style={{...styles.videoPreviewCard}}
                onPress={() => {
                  dispatch(navigationChanged('', 'videoPlayer'));
                  Actions.VideoPlayer({
                    videoUrl: selectedExercises.exercise_path,
                    topic: selectedExercises.exercise_topic,
                  });
                }}>
                <ProgressImage
                  resizeMode={'stretch'}
                  style={{...styles.videoPreviewImage}}
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1hdGh8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                  }}
                  indicatorProps={{
                    borderWidth: 0,
                    color: Colors.Venice_Blue,
                    unfilledColor: 'rgba(200, 200, 200, 0.2)',
                  }}
                />
              </TouchableOpacity>
            ) : null}

            {/* <View style={{...styles.exerciseContainer}}>
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
                source={Images.goToSolution}
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
          </View> */}
          </View>
        </ScrollView>
      ) : null}

      {!isLoading && exercises.length < 1 && (
        <View style={{...styles.notFoundContainer}}>
          <Text style={{...styles.notFoundText}}>No Record Found!</Text>
        </View>
      )}

      <SpinnerLoader isloading={isLoading} />
    </ImageBackground>
  );
};

export default Exercises;
