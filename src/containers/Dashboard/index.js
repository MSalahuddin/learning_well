import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
import {Modalize} from 'react-native-modalize';

import styles from './styles';

import {Images, Metrics, Colors} from '../../theme';
import {request as get_books} from '../../actions/GetBooks';
import {SpinnerLoader, Header, Card} from '../../components';
import Util from '../../util';
import {createResource} from '../../config/SimpleApiCalls';
import {get_books_API} from '../../config/WebServices';

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      books: [],
      isloading: false,
      selectedSubjectDetail: null,
      itemPerPage: 10,
    };
  }

  componentWillMount() {
    this.getUserDetail();
    Util.isConnected();
  }

  getUserDetail = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      let user = JSON.parse(value);
      if (value !== null) {
        this.setState({user}, () => {
          this.getBooks();
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getBooks = async () => {
    const {user} = this.state;

    let payload = new FormData();
    payload.append('class_id', user.class_id);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      this.setState({isloading: true});
      const result = await createResource(
        get_books_API,
        payload,
        null,
        headers,
      );
      if (result.code === 1) {
        this.setState({books: result.book, isloading: false});
      }
      this.setState({isloading: false});
    } catch (error) {
      console.log('error ==> ', error);
      this.setState({isloading: false});
    }
  };

  onPressSubject = (subjectDetail) => {
    this.setState({selectedSubjectDetail: subjectDetail}, () =>
      this.modalizeRef.open(),
    );
  };

  onPressBook = (selectedSubject) => {
    this.modalizeRef.close();
    this.setState({bookBtnPress: false});
    Actions.BookPdfScreen({
      bookId: selectedSubject?.bookId,
      bookName: selectedSubject?.bookName,
    });
  };

  onPressLectures = (selectedSubject) => {
    this.modalizeRef.close();
    this.setState({lecturesBtnPress: false});
    Actions.lectureScreen({
      bookId: selectedSubject?.bookId,
      bookName: selectedSubject?.bookName,
    });
  };

  renderModalizeContent = () => {
    const {selectedSubjectDetail, bookBtnPress, lecturesBtnPress} = this.state;

    return (
      <View style={{...styles.modalizeContentContainer}}>
        <View>
          <Text style={{...styles.modalizeHeadingText}}>Please Choose</Text>
          <View style={{...styles.modalizeHeadingUnderline}} />
        </View>
        <View style={{...styles.buttonRow}}>
          <TouchableHighlight
            underlayColor={Colors.Venice_Blue}
            onHideUnderlay={() => this.setState({bookBtnPress: false})}
            onShowUnderlay={() => this.setState({bookBtnPress: true})}
            style={{...styles.lectureBtn}}
            onPress={() => this.onPressBook(selectedSubjectDetail)}>
            <Text
              style={{
                ...styles.lectureBtnText,
                color: bookBtnPress ? Colors.white : Colors.black,
              }}>
              Book
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.Venice_Blue}
            onHideUnderlay={() => this.setState({lecturesBtnPress: false})}
            onShowUnderlay={() => this.setState({lecturesBtnPress: true})}
            style={{...styles.lectureBtn}}
            onPress={() => this.onPressLectures(selectedSubjectDetail)}>
            <Text
              style={{
                ...styles.lectureBtnText,
                color: lecturesBtnPress ? Colors.white : Colors.black,
              }}>
              Lectures
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  render() {
    const {isloading, books, itemPerPage} = this.state;

    return (
      <ImageBackground
        source={Images.homeBackgroundImage2}
        resizeMode={'cover'}
        style={{...styles.container}}>
        <Header
          leftImage={Images.backArrowIcon2}
          leftBtnPress={() => Actions.pop()}
          rightImage={Images.subjectNavIcon}
          rightImageStyle={styles.rightImageStyle}
        />

        {books.length > 0 ? (
          <ScrollView>
            <View style={{...styles.cardListContainer}}>
              {books?.map(({BookName, Id}, index) => {
                if (index < itemPerPage) {
                  return (
                    <Card
                      name={BookName}
                      onPress={() =>
                        this.onPressSubject({
                          bookId: Id,
                          bookName: BookName,
                        })
                      }
                      containerStyle={styles.cardContainerStyle}
                    />
                  );
                }
              })}
            </View>
          </ScrollView>
        ) : null}

        {!isloading && books.length > 0 && books.length > itemPerPage && (
          <TouchableOpacity
            onPress={() => this.setState({itemPerPage: itemPerPage + 10})}
            style={{...styles.moreBtn}}>
            <Image source={Images.moreIcon} style={{...styles.moreIcon}} />
          </TouchableOpacity>
        )}

        {!isloading && books.length < 1 && (
          <View style={{...styles.notFoundContainer}}>
            <Text style={{...styles.notFoundText}}>
              {
                'Sorry, something went wrong.\nNo subject found, please try agian later.'
              }
            </Text>
          </View>
        )}

        <Modalize
          ref={(ref) => (this.modalizeRef = ref)}
          modalStyle={{...styles.modalStyle}}
          handleStyle={{...styles.handleStyle}}
          handlePosition={'inside'}
          adjustToContentHeight={false}
          modalTopOffset={Metrics.screenHeight * 0.6}>
          {this.renderModalizeContent()}
        </Modalize>

        <SpinnerLoader isloading={isloading} />
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
  getBooks: state.getBooks,
});

const actions = {get_books};

export default connect(mapStateToProps, actions)(Subjects);
