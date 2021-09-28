import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

import {Images} from '../../theme';
import {Header, SpinnerLoader} from '../../components';
import {QUIZ_SAVE_API} from '../../config/WebServices';
import {createResource} from '../../config/SimpleApiCalls';

class StartTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: this.props.quiz,
      testName: this.props.testName,
      testId: this.props.testId,
      user: null,
      questionIndex: 0,
      answer: null,
      correctAnswer: 0,
      unAnswer: 0,
      wrongAnswer: 0,
      isloading: false,
    };
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      let parsedValue = JSON.parse(value);
      if (value !== null) {
        this.setState({user: parsedValue});
      }
    } catch (error) {
      console.log('error ==> ', error);
    }
  };

  onNextQuestion = () => {
    const {
      quiz,
      questionIndex,
      answer,
      correctAnswer,
      unAnswer,
      wrongAnswer,
    } = this.state;

    if (questionIndex + 1 < quiz.length) {
      if (JSON.parse(quiz[questionIndex].answer) === answer) {
        this.setState({correctAnswer: correctAnswer + 1});
      } else if (answer === null) {
        this.setState({unAnswer: unAnswer + 1});
      } else {
        this.setState({wrongAnswer: wrongAnswer + 1});
      }
    }

    if (questionIndex + 1 < quiz.length) {
      this.setState({questionIndex: questionIndex + 1, answer: null});
    } else {
      this.saveQuiz();
    }
  };

  handleQuizTimeout = () => {
    const {quiz, correctAnswer, wrongAnswer} = this.state;
    let unAnswer = quiz.length - correctAnswer - wrongAnswer;

    Alert.alert('Ooops!', 'You have reached the time limit set for the quiz.');
    this.setState({unAnswer}, () => {
      this.saveQuiz();
    });
  };

  saveQuiz = async () => {
    const {user, testId, correctAnswer, wrongAnswer, unAnswer} = this.state;
    const {testName, bookName} = this.props;

    const totalQuestion = correctAnswer + wrongAnswer + unAnswer;
    const percentage = (correctAnswer / totalQuestion) * 100;
    // const datetime = `${moment().format('YYYY-MM-DD')} ${moment().format(
    //   'h:mm:ss',
    // )}`;

    // let payload = new FormData();
    // payload.append('user_id', user.loginid);
    // payload.append('school_id', user.school_id);
    // payload.append('test_id', testId);
    // payload.append('right_ans', correctAnswer);
    // payload.append('wrong_ans', wrongAnswer);
    // payload.append('un_ans', unAnswer);
    // payload.append('percentage', percentage);

    console.log({
      test_id: testId,
      user_id: user.loginid,
      school_id: user.school_id,
      right_ans: correctAnswer,
      wrong_ans: wrongAnswer,
      un_ans: unAnswer,
      percentage: percentage,
    });

    // payload.append('datetime', datetime);

    // const headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // };

    try {
      // this.setState({isloading: true});
      // await createResource(QUIZ_SAVE_API, payload, null, headers);
      // Actions.quizResultScreen({
      //   CorrectAnswer: correctAnswer,
      //   WrongAnswer: wrongAnswer,
      //   unAnswer: unAnswer + 1,
      //   testName,
      //   bookName,
      // });
      // this.setState({isloading: false});
    } catch (error) {
      console.log('error ==> ', error);
      this.setState({isloading: false});
    }
  };

  handleBackButton = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to quit?',
      [{text: 'Cancel'}, {text: 'Confirm', onPress: Actions.pop}],
      {cancelable: false},
    );
  };

  renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderQuestion = () => {
    const {quiz, questionIndex, answer, testName} = this.state;

    return (
      <View style={{...styles.questionContainer}}>
        <Text style={{...styles.testName}}>{testName}</Text>
        <View style={{...styles.questionListContainer}}>
          <LinearGradient
            colors={['#10bef0', '#07509e']}
            start={{x: 0.0, y: 2.0}}
            end={{x: 1.0, y: 0.0}}
            style={{...styles.questionView}}>
            <Text style={{...styles.questionText}}>
              {questionIndex + 1}. {quiz[questionIndex].question_name.trim()}
            </Text>
          </LinearGradient>
          <TouchableOpacity
            style={{...styles.optionContainer}}
            onPress={() => this.setState({answer: 1})}>
            <View style={{...styles.radioCircle}}>
              {answer === 1 && <View style={{...styles.radioInnerCircle}} />}
            </View>
            <Text style={{...styles.optionText}}>
              {quiz[questionIndex].answer1.trim()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.optionContainer}}
            onPress={() => this.setState({answer: 2})}>
            <View style={{...styles.radioCircle}}>
              {answer === 2 && <View style={{...styles.radioInnerCircle}} />}
            </View>
            <Text style={{...styles.optionText}}>
              {quiz[questionIndex].answer2.trim()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.optionContainer}}
            onPress={() => this.setState({answer: 3})}>
            <View style={{...styles.radioCircle}}>
              {answer === 3 && <View style={{...styles.radioInnerCircle}} />}
            </View>
            <Text style={{...styles.optionText}}>
              {quiz[questionIndex].answer3.trim()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.optionContainer}}
            onPress={() => this.setState({answer: 4})}>
            <View style={{...styles.radioCircle}}>
              {answer === 4 && <View style={{...styles.radioInnerCircle}} />}
            </View>
            <Text style={{...styles.optionText}}>
              {quiz[questionIndex].answer4.trim()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {quiz} = this.state;
    return (
      <ImageBackground
        source={Images.homeBackgroundImage3}
        resizeMode={'cover'}
        style={{...styles.container}}>
        <Header
          leftImage={Images.backArrowIcon2}
          leftBtnPress={this.handleBackButton}
          headerText={'Test'}
          headerTextStyle={{...styles.headerTextStyle}}
        />

        {quiz && (
          <View style={{...styles.countDownCounter}}>
            <CountDown
              until={60 * 10}
              onFinish={this.handleQuizTimeout}
              size={20}
              timeToShow={['M', 'S']}
              timeLabels={{m: 'Min', s: 'Sec'}}
              showSeparator
              digitStyle={{...styles.digitStyle}}
              digitTxtStyle={{...styles.digitTxtStyle}}
              timeLabelStyle={{...styles.timeLabelStyle}}
              separatorStyle={{...styles.separatorStyle}}
            />
          </View>
        )}

        <ScrollView>
          {quiz && this.renderQuestion()}
          {quiz && (
            <View style={{...styles.buttonContainer}}>
              {/* <TouchableOpacity onPress={() => {}} style={{...styles.button}}>
                <Text style={{...styles.buttonText}}>Previous</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={this.onNextQuestion}>
                <LinearGradient
                  colors={['#10bef0', '#07509e']}
                  start={{x: 0.0, y: 2.0}}
                  end={{x: 1.0, y: 0.0}}
                  style={{...styles.button}}>
                  <Text style={{...styles.buttonText}}>Next</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        {this.renderOverlaySpinner()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(StartTest);
