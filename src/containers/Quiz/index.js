// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View , ImageBackground, TouchableOpacity, Image, TextInput, ScrollView, Alert} from "react-native";
import styles from "./styles";
import {Images, Metrics, Colors} from '../../theme';
import CountDown from 'react-native-countdown-component';
import {get_quiz_API} from '../../config/WebServices';
import axios from 'axios';
import { Actions } from "react-native-router-flux";
import { SpinnerLoader } from "../../components";

class QuizScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      quiz: null,
      questionIndex: 0,
      answer: null,
      correctAnswer: 0,
      unAnswer: 0,
      wrongAnswer: 0,
      isloading: true
    }
  }

  componentWillMount(){
    this.getData();

  }

  getData = async () => {
    this.setState({quiz: this.props.quiz, isloading: false})
    try{
      const quiz = await this.getQuiz();
     this.setState({quiz: quiz.data.data, isloading: false})
    }
    catch(ex){
      if(ex && ex.data && ex.data.message){
        Alert.alert("", ex.data.message)
      }
      console.log(ex,'jjjjjjjjjjjjjjjjjjjj')
      this.setState({isloading: false})
    }
  }

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
    const {quiz, questionIndex, answer, correctAnswer, unAnswer,  wrongAnswer} = this.state;
    const {chapterName, bookName} = this.props
    console.log(quiz)

    if(questionIndex + 1 < quiz.length ){
    
      if(JSON.parse(quiz[questionIndex].answer) === answer){
        this.setState({correctAnswer: correctAnswer + 1})
      }
      else if(answer === null){
        this.setState({unAnswer: unAnswer + 1})
      }
      else{
        this.setState({wrongAnswer: wrongAnswer + 1})
      }
    }
  
    if(questionIndex + 1 < quiz.length ){
      this.setState({questionIndex: questionIndex + 1, answer: null})
      }
    else{
     
      Actions.quizResultScreen({CorrectAnswer: correctAnswer , WrongAnswer: wrongAnswer, unAnswer:  unAnswer + 1, chapterName, bookName   })
    }
  }

  renderOverlaySpinner = () => {
    const { isloading } = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderQuestion = () => {
    const {quiz, questionIndex, answer} = this.state;
    
    return(
      <View style = {{marginHorizontal: Metrics.screenWidth * 0.05, marginTop: Metrics.ratio(35)}}>
           {/* <Text style = {{fontSize: Metrics.ratio(14), fontWeight: 'bold', color: 'black'}}>What is a computer and what it can do?</Text> */}
            <View style = {{marginHorizontal: Metrics.screenWidth * 0.05, marginTop: Metrics.ratio(15)}}>
              <View style = {{width: Metrics.screenWidth * 0.8,  elevation: 4, paddingHorizontal: Metrics.ratio(5), paddingVertical: Metrics.ratio(10), backgroundColor: Colors.darkStaleBlue, borderRadius: Metrics.ratio(20)}}>
              <Text style = {{fontSize: Metrics.ratio(16),  color: 'white', }}>{questionIndex + 1}. {quiz[questionIndex].question_name}</Text>
              </View>
              <View style = {{width: Metrics.screenWidth * 0.8, 
                              marginTop: Metrics.ratio(10),
                              paddingHorizontal: Metrics.ratio(5), 
                              flexDirection: 'row', 
                              paddingVertical: Metrics.ratio(10), 
                              borderColor: Colors.darkStaleBlue, 
                              borderWidth: Metrics.ratio(1),
                              elevation: 2,
                              borderRadius: Metrics.ratio(20)}}>
                              <TouchableOpacity onPress = {()=> this.setState({answer: 1})} style={styles.circle} >
                                {answer === 1 && <View style={styles.checkedCircle} />}
                              </TouchableOpacity>
                              <Text style = {{fontSize: Metrics.ratio(16),  color: 'black', }}>{quiz[questionIndex].answer1}</Text>
              </View>
              <View style = {{width: Metrics.screenWidth * 0.8, 
                              marginTop: Metrics.ratio(10),
                              paddingHorizontal: Metrics.ratio(5), 
                              flexDirection: 'row', 
                              paddingVertical: Metrics.ratio(10), 
                              borderColor: Colors.darkStaleBlue, 
                              borderWidth: Metrics.ratio(1),
                              elevation: 2,
                              borderRadius: Metrics.ratio(20)}}>
                              <TouchableOpacity onPress = {()=> this.setState({answer: 2})} style={styles.circle} >
                              {answer === 2 && <View style={styles.checkedCircle} />}
                              </TouchableOpacity>
                              <Text style = {{fontSize: Metrics.ratio(16),  color: 'black', }}>{quiz[questionIndex].answer2}</Text>
              </View>
              <View style = {{width: Metrics.screenWidth * 0.8, 
                              marginTop: Metrics.ratio(10),
                              paddingHorizontal: Metrics.ratio(5), 
                              flexDirection: 'row', 
                              paddingVertical: Metrics.ratio(10), 
                              borderColor: Colors.darkStaleBlue, 
                              borderWidth: Metrics.ratio(1),
                              elevation: 2,
                              borderRadius: Metrics.ratio(20)}}>
                              <TouchableOpacity onPress = {()=> this.setState({answer: 3})} style={styles.circle} >
                              {answer === 3 && <View style={styles.checkedCircle} />}
                              </TouchableOpacity>
                              <Text style = {{fontSize: Metrics.ratio(16),  color: 'black', }}>{quiz[questionIndex].answer3}</Text>
              </View>
              <View style = {{width: Metrics.screenWidth * 0.8, 
                              marginTop: Metrics.ratio(10),
                              paddingHorizontal: Metrics.ratio(5), 
                              flexDirection: 'row', 
                              paddingVertical: Metrics.ratio(10), 
                              borderColor: Colors.darkStaleBlue, 
                              borderWidth: Metrics.ratio(1),
                              elevation: 2,
                              borderRadius: Metrics.ratio(20)}}>
                              <TouchableOpacity onPress = {()=> this.setState({answer: 4})} style={styles.circle} >
                              {answer === 4 && <View style={styles.checkedCircle} />}
                              </TouchableOpacity>
                              <Text style = {{fontSize: Metrics.ratio(16),  color: 'black', }}>{quiz[questionIndex].answer4}</Text>
              </View>
            </View>
         </View>
    )
  }

  render() {
    const {quiz, questionIndex} = this.state;
    return (
      <ImageBackground
        source={Images.quizBackground}
        resizeMode="auto"
        resizeMode= "stretch"
        style={[styles.container]}
      >
      {/* questionIndex === 0 && */}
        <TouchableOpacity onPress = {() => { Actions.pop()}}>
            <Image
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
                marginTop: Metrics.ratio(20),
                marginLeft: Metrics.ratio(10),
                borderRadius: 100
                
              }}
              resizeMode="auto"
              resizeMode= "cover"
              source = {Images.backArrowIcon}
              
            />
         </TouchableOpacity>

         <Text style = {{fontSize: Metrics.ratio(25), fontWeight: 'bold', color: 'black', marginVertical: Metrics.ratio(20), marginHorizontal: Metrics.ratio(30)}}>Quiz</Text>
         {quiz && <View style = {{width: Metrics.screenWidth * 0.4,
                         height: Metrics.ratio(50), 
                         marginHorizontal: Metrics.ratio(50), marginVertical:Metrics.ratio(10), paddingRight: Metrics.ratio(80)}}>
         <CountDown
            until={60 * 10}
            onFinish={() => alert('finished')}
            onPress={() => alert('hello')}
            size={20}
            digitStyle={{backgroundColor: Colors.black, borderWidth: 2, borderColor: 'black'}}
            digitTxtStyle={{color: 'white'}}
            timeLabelStyle={{color: 'black', fontWeight: 'bold'}}
            timeToShow={['M', 'S']}
            timeLabels={{m: 'Min', s: 'Sec'}}
            showSeparator
            separatorStyle={{color: 'black', marginTop: Metrics.ratio(-20)}}
          />
         </View>}
        <ScrollView>
        {quiz && this.renderQuestion()}
         {quiz && <TouchableOpacity 
            onPress = {() => {
             this.onNextQuestion()
              }} 
              style = {{width: Metrics.screenWidth * 0.25, height: Metrics.ratio(44), borderRadius: Metrics.ratio(20), backgroundColor: Colors.darkStaleBlue, justifyContent: 'center', alignItems: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(10), marginLeft: Metrics.screenWidth * 0.65}}>
           <Text style = {{fontSize: Metrics.ratio(16), color: 'white'}}>Next</Text>
         </TouchableOpacity>}
        </ScrollView>
        {this.renderOverlaySpinner()}
     </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(QuizScreen);
