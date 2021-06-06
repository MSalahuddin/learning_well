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

import styles from './styles';

import {Images, Metrics, Colors} from '../../theme';
import {Header, SpinnerLoader} from '../../components';

class QuizScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: null,
      questionIndex: 0,
      answer: null,
      correctAnswer: 0,
      unAnswer: 0,
      wrongAnswer: 0,
      isloading: true,
      chapterName: '',
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({
      quiz: this.props.quiz,
      chapterName: this.props.chapterName,
      isloading: false,
    });
    try {
      const quiz = await this.getQuiz();
      this.setState({quiz: quiz.data.data, isloading: false});
    } catch (ex) {
      if (ex && ex.data && ex.data.message) {
        Alert.alert('', ex.data.message);
      }
      this.setState({isloading: false});
    }
  };

  // getQuiz = () => {
  //   const {chapterId} = this.props;
  //   console.log(this.props.chapterId,'chapterIdchapterId')
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(`${get_quiz_API}/${chapterId}`, {//${chapterId}
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json"
  //           // Authorization: bearer
  //         }
  //       })
  //       .then(response => {
  //         console.log(response,'reeeeeeeeeeeeeeeeeeeeee')
  //         resolve(response);
  //       })
  //       .catch(error => {
  //         console.log(error,'errrrrrrrrrrrrrrrr')
  //         reject(error.response);
  //       });
  //   });
  // }

  onNextQuestion = () => {
    const {
      quiz,
      questionIndex,
      answer,
      correctAnswer,
      unAnswer,
      wrongAnswer,
    } = this.state;
    const {chapterName, bookName} = this.props;

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
      Actions.quizResultScreen({
        CorrectAnswer: correctAnswer,
        WrongAnswer: wrongAnswer,
        unAnswer: unAnswer + 1,
        chapterName,
        bookName,
      });
    }
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
          <View style={{...styles.questionView}}>
            <Text style={{...styles.questionText}}>
              {questionIndex + 1}. {quiz[questionIndex].question_name}
            </Text>
          </View>
          <View style={{...styles.optionContainer}}>
            <TouchableOpacity
              onPress={() => this.setState({answer: 1})}
              style={{...styles.radioCircle}}>
              {answer === 1 && <View style={{...styles.radioInnerCircle}} />}
            </TouchableOpacity>
            <Text style={{...styles.optionText}}>
              {quiz[questionIndex].answer1}
            </Text>
          </View>
          <View style={{...styles.optionContainer}}>
            <TouchableOpacity
              onPress={() => this.setState({answer: 2})}
              style={{...styles.radioCircle}}>
              {answer === 2 && <View style={{...styles.radioInnerCircle}} />}
            </TouchableOpacity>
            <Text style={{...styles.optionText}}>
              {quiz[questionIndex].answer2}
            </Text>
          </View>
          <View style={{...styles.optionContainer}}>
            <TouchableOpacity
              onPress={() => this.setState({answer: 3})}
              style={{...styles.radioCircle}}>
              {answer === 3 && <View style={{...styles.radioInnerCircle}} />}
            </TouchableOpacity>
            <Text style={{...styles.optionText}}>
              {quiz[questionIndex].answer3}
            </Text>
          </View>
          <View style={{...styles.optionContainer}}>
            <TouchableOpacity
              onPress={() => this.setState({answer: 4})}
              style={{...styles.radioCircle}}>
              {answer === 4 && <View style={{...styles.radioInnerCircle}} />}
            </TouchableOpacity>
            <Text style={{...styles.optionText}}>
              {quiz[questionIndex].answer4}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {quiz} = this.state;
    return (
      <ImageBackground
        source={Images.homeBackgroundImage2}
        resizeMode={'cover'}
        style={{...styles.container}}>
        <Header
          leftImage={Images.backArrowIcon2}
          leftBtnPress={() => Actions.pop()}
          rightImage={Images.quizNavIcon}
          rightImageStyle={{...styles.rightImageStyle}}
        />

        {quiz && (
          <View
            style={{
              width: Metrics.screenWidth * 0.4,
              height: Metrics.ratio(50),
              marginHorizontal: Metrics.ratio(50),
              marginVertical: Metrics.ratio(10),
              paddingRight: Metrics.ratio(80),
            }}>
            <CountDown
              until={60 * 10}
              onFinish={() => alert('finished')}
              onPress={() => alert('hello')}
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
              <TouchableOpacity
                onPress={this.onNextQuestion}
                style={{...styles.button}}>
                <Text style={{...styles.buttonText}}>Next</Text>
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

export default connect(mapStateToProps, actions)(QuizScreen);
