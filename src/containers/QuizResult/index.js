import {connect} from 'react-redux';
import React, {Component} from 'react';
import {Text, View, ImageBackground, Image} from 'react-native';
import moment from 'moment';

import styles from './styles';

import {Images} from '../../theme';
import {Header} from '../../components';

class QuizResultScreen extends Component {
  renderRow = (title, value) => {
    return (
      <View style={{...styles.listItem}}>
        <Text style={{...styles.label}}>{title}</Text>

        <Text style={{...styles.value}}>
          {title === 'Percentage' ? `${value}%` : value}
        </Text>
      </View>
    );
  };

  render() {
    const {
      CorrectAnswer,
      WrongAnswer,
      unAnswer,
      chapterName,
      bookName,
    } = this.props;
    const totalQuestion = CorrectAnswer + WrongAnswer + unAnswer;
    const percentage = (CorrectAnswer / totalQuestion) * 100;

    return (
      <ImageBackground
        source={Images.homeBackgroundImage3}
        resizeMode={'cover'}
        style={{...styles.container}}>
        <Header
          leftImage={Images.backArrowIcon2}
          leftBtnPress={() => {
            this.props.navigation.navigate('lectureScreen', {
              screen: 'lectureScreen',
            });
          }}
          headerText={'Quiz Result'}
          headerTextStyle={{...styles.headerTextStyle}}
          // rightImage={Images.quizResultNavIcon}
          // rightImageStyle={{...styles.rightImageStyle}}
        />

        <View style={{...styles.headingContainer}}>
          <View style={{...styles.thankContainer}}>
            <Image
              source={Images.greenTick}
              resizeMode={'contain'}
              style={{...styles.thankImage}}
            />
            <Text style={{...styles.thankText}}>Thank You</Text>
          </View>
          <Text style={{...styles.thankMsg}}>
            Your Quiz is submitted to teacher
          </Text>
        </View>

        <View style={{...styles.listContainer}}>
          {this.renderRow('Book', bookName)}
          {this.renderRow('Chapter', chapterName)}
          {this.renderRow('Correct', CorrectAnswer)}
          {this.renderRow('Wrong', WrongAnswer)}
          {this.renderRow('Unanswer', unAnswer)}
          {this.renderRow('Percentage', percentage)}
          {this.renderRow(
            'Date',
            `${moment().format('L')} - ${moment().format('LTS')}`,
          )}
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(QuizResultScreen);
