import React from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {Stack, Scene, Router, Actions} from 'react-native-router-flux';

import styles from './styles';
import DrawerMenu from './DrawerMenu';

import LoginScreen from '../containers/Login';
import SignupScreen from '../containers/Signup';
import HomeScreen from '../containers/Home';
import LectureScreen from '../containers/LectureScreen';
import VideoPlayerScreen from '../containers/VideoPlayerScreen';
import VideoPlayer from '../containers/VideoPlayer';
import EditProfileScreen from '../containers/EditProfile';
import QuizScreen from '../containers/Quiz';
import QuizResultScreen from '../containers/QuizResult';
import ContactUsScreen from '../containers/ContactUs';
import Exercises from '../containers/Exercises';
import ExercisesVideo from '../containers/ExercisesVideo';
import Homework from '../containers/Homework';
import Result from '../containers/Result';
import AssignedTest from '../containers/AssignedTest';
import Feedback from '../containers/Feedback';
import BookPdf from '../containers/BookPdf';
import Announcement from '../containers/Announcement';

import {TabButtonLeft} from '../components';
import {Colors} from '../theme';
import utils from '../util';

function onBackPress() {
  const scene = Actions.currentScene;
  if (scene === 'Home' || scene === 'loginScreen') {
    utils.showYesNoMessage(
      'Confirm',
      'Are you sure you want to exit?',
      () => {
        BackHandler.exitApp();
      },
      () => {},
    );
    return true;
  } else {
    Actions.pop();
    return true;
  }
}

const auth = (
  <Stack
    titleStyle={styles.title}
    headerStyle={styles.header}
    key="root"
    tintColor={Colors.primary}
  />
);

const navigator = Actions.create(
  <Stack
    titleStyle={styles.title}
    headerStyle={styles.header}
    key="root"
    tintColor={Colors.primary}>
    {/* <Scene key="tour" component={CounterComponent} /> */}
    {/* {DrawerMenu.getDrawerMenu()} */}

    <Scene
      tintColor="white"
      title={'LoginScreen'}
      hideNavBar
      key="loginScreen"
      component={LoginScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'SignupScreen'}
      hideNavBar
      key="signupScreen"
      component={SignupScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'QuizScreen'}
      hideNavBar
      key="quizScreen"
      component={QuizScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'QuizResultScreen'}
      hideNavBar
      key="quizResultScreen"
      component={QuizResultScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />

    <Scene
      tintColor="white"
      title={'EditProfileScreen'}
      hideNavBar
      key="editProfileScreen"
      component={EditProfileScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'ContactUsScreen'}
      hideNavBar
      key="contactUsScreen"
      component={ContactUsScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'Exercises'}
      hideNavBar
      key="exercises"
      component={Exercises}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'ExercisesVideo'}
      hideNavBar
      key="exercisesVideo"
      component={ExercisesVideo}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'Homework'}
      hideNavBar
      key="Homework"
      component={Homework}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'Result'}
      hideNavBar
      key="Result"
      component={Result}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'AssignedTest'}
      hideNavBar
      key="AssignedTest"
      component={AssignedTest}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={'Feedback'}
      hideNavBar
      key="Feedback"
      component={Feedback}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />

    {DrawerMenu.getDrawerMenu()}

    <Scene
      tintColor="white"
      title={'LectureScreen'}
      hideNavBar
      key="lectureScreen"
      component={LectureScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />

    <Scene
      tintColor="white"
      title={'VideoPlayerScreen'}
      hideNavBar
      key="videoPlayerScreen"
      component={VideoPlayerScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />

    <Scene
      tintColor="white"
      title={'VideoPlayer'}
      hideNavBar
      key="VideoPlayer"
      component={VideoPlayer}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />

    <Scene
      tintColor="white"
      title={'BookPdfScreen'}
      hideNavBar
      key="BookPdfScreen"
      component={BookPdf}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />

    <Scene
      tintColor="white"
      title={'Announcement'}
      hideNavBar
      key="Announcement"
      component={Announcement}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />

    <Scene
      tintColor="white"
      hideNavBar
      key="homeScreen"
      component={HomeScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={['rightArrow']} actions={[Actions.pop]} />
      )}
    />
  </Stack>,
);

export default () => (
  <AppNavigator backAndroidHandler={onBackPress} navigator={navigator} />
);

const AppNavigator = connect()(Router);
