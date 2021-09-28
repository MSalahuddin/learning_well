import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

import {Images} from '../../theme';
import {SpinnerLoader, Header} from '../../components';
import {createResource} from '../../config/SimpleApiCalls';
import {BOOK_PAGES_API} from '../../config/WebServices';

const Image = createImageProgress(FastImage);

const BookPdf = (props) => {
  const {bookId, bookName} = props;

  const [isLoading, setIsLoading] = useState(null);
  const [bookPdf, setBookPdf] = useState([]);
  const [startValue, setStartValue] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getBookPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValue]);

  const getBookPdf = async () => {
    let payload = new FormData();
    payload.append('book_id', bookId);
    payload.append('start_value', startValue);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      setIsLoading(true);
      const result = await createResource(
        BOOK_PAGES_API,
        payload,
        null,
        headers,
      );
      if (result.code === 1 && result.bookpages.length) {
        setBookPdf([...bookPdf, ...result.bookpages]);
        setTotalPages(result.totalpages);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error ==> ', error);
      setIsLoading(false);
    }
  };

  const onPressLoadMore = () => {
    setStartValue(startValue + 15);
  };

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={Images.homeBackgroundImage3}
      style={styles.container}>
      <Header
        leftImage={Images.backArrowIcon2}
        leftBtnPress={() => Actions.pop()}
        headerText={bookName}
        headerTextStyle={{...styles.headerTextStyle}}
      />

      {/* {bookPdf.length ? (
        <Pdf
          source={{
            uri: `https://learningwell.pk/${bookPdf}`,
            cache: true,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={{...styles.pdfStyle}}
        />
      ) : null} */}

      {bookPdf.length ? (
        <FlatList
          data={bookPdf}
          renderItem={({item}) => {
            return (
              <View style={{...styles.bookPageContainer}}>
                <Image
                  style={{...styles.bookPageImage}}
                  source={{
                    uri: `https://learningwell.pk/${item.image_path}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </View>
            );
          }}
          ListFooterComponent={() =>
            startValue < totalPages ? (
              <TouchableOpacity
                onPress={onPressLoadMore}
                style={{...styles.loadMoreBtnContainer}}>
                <LinearGradient
                  colors={['#10bef0', '#07509e']}
                  start={{x: 0.0, y: 2.0}}
                  end={{x: 1.0, y: 0.0}}
                  style={{...styles.loadMoreBtn}}>
                  <Text style={{...styles.loadMoreBtnText}}>Load More</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : null
          }
        />
      ) : null}

      {!isLoading && !bookPdf.length && (
        <View style={{...styles.notFoundContainer}}>
          <Text style={{...styles.notFoundText}}>
            {'Sorry, something went wrong.\nNo book found.'}
          </Text>
        </View>
      )}

      <SpinnerLoader isloading={isLoading} />
    </ImageBackground>
  );
};

export default BookPdf;
