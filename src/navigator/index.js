// @flow
import React from "react";

import {
  TouchableOpacity,
  Image,
  View,
  BackHandler,
  Keyboard,
  Animated,
  Easing,
  BackAndroid
} from "react-native";
import { connect } from "react-redux";

import {
  Stack,
  Scene,
  Router,
  Actions,
  ActionConst,
  Route,
  Schema,
  Drawer
} from "react-native-router-flux";
import { TabButtonLeft } from "../components";
import { Colors, Metrics, Images } from "../theme";

import styles from "./styles";
import LoginScreen from "../containers/Login";
import SignupScreen from "../containers/Signup";
import HomeScreen from "../containers/Home";
import DrawerMenu from "./DrawerMenu";
import LectureScreen from '../containers/LectureScreen'
import VideoPlayerScreen from '../containers/VideoPlayerScreen';
import EditProfileScreen from '../containers/EditProfile';
import QuizScreen from '../containers/Quiz';
import QuizResultScreen from '../containers/QuizResult';
import ContactUsScreen from '../containers/ContactUs';
import utils from "../util";
function onBackPress() {
  const scene = Actions.currentScene;
  if (scene === "Home" || scene === "loginScreen") {
    utils.showYesNoMessage(
      "Confirm",
      "Are you sure you want to exit?",
      () => {
        BackHandler.exitApp();
      },
      () => { }
    );
    return true;
  } else {
    Actions.pop();
    return true;
  }
}

const auth = <Stack
  titleStyle={styles.title}
  headerStyle={styles.header}
  key="root"
  tintColor={Colors.primary}
>

</Stack>
const navigator = Actions.create(
  <Stack
    titleStyle={styles.title}
    headerStyle={styles.header}
    key="root"
    tintColor={Colors.primary}
  >
    {/* <Scene key="tour" component={CounterComponent} /> */}
    {/* {DrawerMenu.getDrawerMenu()} */}

    <Scene
      tintColor="white"
      title={"LoginScreen"}
      hideNavBar
      key="loginScreen"
      component={LoginScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={"SignupScreen"}
      hideNavBar
      key="signupScreen"
      component={SignupScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={"QuizScreen"}
      hideNavBar
      key="quizScreen"
      component={QuizScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={"QuizResultScreen"}
      hideNavBar
      key="quizResultScreen"
      component={QuizResultScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      )}
    />

    <Scene
      tintColor="white"
      title={"EditProfileScreen"}
      hideNavBar
      key="editProfileScreen"
      component={EditProfileScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      )}
    />
    <Scene
      tintColor="white"
      title={"ContactUsScreen"}
      hideNavBar
      key="contactUsScreen"
      component={ContactUsScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      )}
    />


    {DrawerMenu.getDrawerMenu()}

    <Scene
      tintColor="white"
      title={"LectureScreen"}
      hideNavBar
      key="lectureScreen"
      component={LectureScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      )}
    />

    <Scene
      tintColor="white"
      title={"VideoPlayerScreen"}
      hideNavBar
      key="videoPlayerScreen"
      component={VideoPlayerScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      )}
    />




    <Scene
      tintColor="white"
      hideNavBar
      key="homeScreen"
      component={HomeScreen}
      renderLeftButton={() => (
        <TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      )}
    />
  </Stack>
);

export default () => (
  <AppNavigator backAndroidHandler={onBackPress} navigator={navigator} />
);

const AppNavigator = connect()(Router);
