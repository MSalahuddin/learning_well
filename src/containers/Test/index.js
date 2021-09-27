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

import {Images, Metrics, Colors} from '../../theme';
import {Header, SpinnerLoader} from '../../components';
import {QUIZ_SAVE_API} from '../../config/WebServices';
import {createResource} from '../../config/SimpleApiCalls';

class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      quiz: this.props.quiz,
      questionIndex: 0,
      answer: null,
      correctAnswer: 0,
      unAnswer: 0,
      wrongAnswer: 0,
      isloading: false,
      chapterName: this.props.chapterName,
      chapterId: this.props.chapterId,
    };
  }

  componentWillMount() {
    this.getUserInfo();
    // this.getData();
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

  // getData = async () => {
  //   this.setState({
  //     quiz: this.props.quiz,
  //     chapterName: this.props.chapterName,
  //     chapterId: this.props.chapterId,
  //     isloading: false,
  //   });
  // };

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
    const {user, chapterId, correctAnswer, wrongAnswer, unAnswer} = this.state;
    const {chapterName, bookName} = this.props;

    const totalQuestion = correctAnswer + wrongAnswer + unAnswer;
    const percentage = (correctAnswer / totalQuestion) * 100;
    const datetime = `${moment().format('YYYY-MM-DD')} ${moment().format(
      'h:mm:ss',
    )}`;

    let payload = new FormData();
    payload.append('user_id', user.loginid);
    payload.append('school_id', user.school_id);
    payload.append('chapter_id', chapterId);
    payload.append('right_ans', correctAnswer);
    payload.append('wrong_ans', wrongAnswer);
    payload.append('un_ans', unAnswer);
    payload.append('percentage', percentage);
    // payload.append('datetime', datetime);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      this.setState({isloading: true});

      await createResource(QUIZ_SAVE_API, payload, null, headers);

      Actions.quizResultScreen({
        CorrectAnswer: correctAnswer,
        WrongAnswer: wrongAnswer,
        unAnswer: unAnswer + 1,
        chapterName,
        bookName,
      });

      this.setState({isloading: false});
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
    const {quiz, questionIndex, answer, chapterName} = this.state;

    return (
      <View style={{...styles.questionContainer}}>
        <Text style={{...styles.chapterName}}>{chapterName}</Text>
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
          <View style={{paddingVertical: Metrics.screenHeight * 0.03}}>
            <CountDown
              until={60 * 10}
              onFinish={this.handleQuizTimeout}
              size={20}
              digitStyle={{
                backgroundColor: Colors.black,
                borderWidth: 2,
                borderColor: 'black',
              }}
              digitTxtStyle={{color: 'white'}}
              timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: 'Min', s: 'Sec'}}
              showSeparator
              separatorStyle={{color: 'black', marginTop: Metrics.ratio(-20)}}
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

export default connect(mapStateToProps, actions)(TestScreen);
