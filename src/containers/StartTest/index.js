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
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

import {Images} from '../../theme';
import {Header, SpinnerLoader} from '../../components';
import {SAVE_TEST_API} from '../../config/WebServices';
import {createResource} from '../../config/SimpleApiCalls';

const ansStatusEnum = {
  CORRECT_ANSWER: 2,
  WRONG_ANSWER: 1,
  UN_ANSWER: 3,
};

class StartTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: this.props.quiz,
      testName: this.props.testName,
      testId: this.props.testId,
      resultId: this.props.resultId,
      user: null,
      questionIndex: 0,
      answer: null,
      correctAnswer: 0,
      unAnswer: 0,
      wrongAnswer: 0,
      isloading: false,
      question_save: [],
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
      user,
      quiz,
      questionIndex,
      answer,
      correctAnswer,
      unAnswer,
      wrongAnswer,
      question_save,
      resultId,
    } = this.state;

    if (JSON.parse(quiz[questionIndex].answer) === answer) {
      const answerDetail = {
        test_id: quiz[questionIndex].test_id.toString(),
        user_id: user.loginid.toString(),
        result_id: resultId.toString(),
        question_id: quiz[questionIndex].question_id.toString(),
        user_ans: answer.toString(),
        ans_status: ansStatusEnum.CORRECT_ANSWER.toString(),
      };

      this.setState(
        {
          question_save: [...question_save, answerDetail],
          correctAnswer: correctAnswer + 1,
        },
        this.setNextQuestion,
      );
    } else if (answer === null) {
      const answerDetail = {
        test_id: quiz[questionIndex].test_id.toString(),
        user_id: user.loginid.toString(),
        result_id: resultId.toString(),
        question_id: quiz[questionIndex].question_id.toString(),
        user_ans: '5', // If user not select any option
        ans_status: ansStatusEnum.UN_ANSWER.toString(),
      };

      this.setState(
        {
          question_save: [...question_save, answerDetail],
          unAnswer: unAnswer + 1,
        },
        this.setNextQuestion,
      );
    } else {
      const answerDetail = {
        test_id: quiz[questionIndex].test_id.toString(),
        user_id: user.loginid.toString(),
        result_id: resultId.toString(),
        question_id: quiz[questionIndex].question_id.toString(),
        user_ans: answer.toString(),
        ans_status: ansStatusEnum.WRONG_ANSWER.toString(),
      };

      this.setState(
        {
          question_save: [...question_save, answerDetail],
          wrongAnswer: wrongAnswer + 1,
        },
        this.setNextQuestion,
      );
    }
  };

  setNextQuestion = () => {
    const {quiz, questionIndex} = this.state;

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
    setTimeout(() => {
      this.setState({unAnswer}, () => {
        this.saveQuiz();
      });
    }, 3000);
  };

  saveQuiz = async () => {
    const {
      user,
      testId,
      correctAnswer,
      wrongAnswer,
      unAnswer,
      resultId,
      question_save,
    } = this.state;

    const totalQuestion = correctAnswer + wrongAnswer + unAnswer;
    const percentage = (correctAnswer / totalQuestion) * 100;

    const json = {
      resultsave: {
        test_id: testId.toString(),
        user_id: user.loginid.toString(),
        result_id: resultId.toString(),
        school_id: user.school_id.toString(),
        right_ans: correctAnswer.toString(),
        wrong_ans: wrongAnswer.toString(),
        un_ans: unAnswer.toString(),
        percentage: percentage.toString(),
      },
      question_save,
    };

    let payload = new FormData();
    payload.append('result_id', resultId.toString());
    payload.append('json', JSON.stringify(json));

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      this.setState({isloading: true});

      await createResource(SAVE_TEST_API, payload, null, headers);

      this.setState({isloading: false});

      Alert.alert(
        'Congratulations!',
        'Your test has been successfully uploaded.',
        [{text: 'Ok', onPress: Actions.pop}],
        {cancelable: false},
      );
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
