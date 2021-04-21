import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View , ImageBackground, TouchableOpacity, Image, TextInput, ScrollView} from "react-native";
import styles from "./styles";
import {Images, Metrics, Colors} from '../../theme';
import { Actions } from "react-native-router-flux";
import moment from 'moment';

class QuizResultScreen extends Component {
  
  renderRow = (title, value) => {
    return(
      <View style = {{flexDirection: 'row'}}>
                <View style = {{ width: Metrics.ratio(80), marginRight: Metrics.ratio(50), alignItems: 'flex-end' }}>
                <Text style = {{fontSize: Metrics.ratio(14), color: 'black'}}>{title}</Text>
                </View>
               
                <Text style = {{fontSize: Metrics.ratio(14), 
                                color: 'black', 
                                marginRight: Metrics.ratio(40)}}>{title === "Percentage" ? `${value} %` : value}</Text>
    </View>
    )
  }
  render() {
    
    const {CorrectAnswer, WrongAnswer, unAnswer,  chapterName, bookName} = this.props;
    const totalQuestion = CorrectAnswer + WrongAnswer + unAnswer
    const percentage = (CorrectAnswer/totalQuestion) * 100
    return (
      <ImageBackground
        source={Images.quizResultBackground}
        resizeMode="auto"
        resizeMode= "stretch"
        style={[styles.container]}
      >
        <TouchableOpacity onPress = {() => {
           this.props.navigation.navigate("lectureScreen", {
            screen: "lectureScreen"
          });
        }}>
            <Image
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
                marginTop: Metrics.ratio(20),
                marginLeft: Metrics.ratio(10),
                borderRadius: 100
                
              }}
              resizeMode="auto"
              resizeMode="cover"
              source = {Images.backArrowIcon}
              
            />
         </TouchableOpacity>

         <Text style = {{fontSize: Metrics.ratio(20), fontWeight: 'bold', color: 'black', marginVertical: Metrics.ratio(20), marginHorizontal: Metrics.ratio(30)}}>Quiz Result</Text>
        <View style = {{width: Metrics.screenWidth, alignItems: 'center', marginTop: Metrics.ratio(40), justifyContent: 'center'}}>
              <Text style = {{marginVertical: Metrics.ratio(2), fontSize: Metrics.ratio(20), fontWeight: 'bold', color: Colors.darkStaleBlue}}>Thank You</Text>
              <Text style = {{marginVertical: Metrics.ratio(2), fontSize: Metrics.ratio(12), fontWeight: 'bold', color: 'black'}}>Your Quiz is submitted to teacher</Text>
              <View style = {{marginTop: Metrics.ratio(20)}}>
                {this.renderRow("Book", bookName)}
                {this.renderRow("Chapter", chapterName)}
                {this.renderRow("Correct", CorrectAnswer)}
                {this.renderRow("Wrong", WrongAnswer)}
                {this.renderRow("Unanswer", unAnswer)}
                {this.renderRow("Percentage", percentage)}
                {this.renderRow("Date", moment().format('LL'))}
              </View>
        </View>
   </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(QuizResultScreen);
