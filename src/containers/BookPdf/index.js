import React, {useState, useEffect} from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Pdf from 'react-native-pdf';

import styles from './styles';

import {Images} from '../../theme';
import {SpinnerLoader, Header} from '../../components';
import {createResource} from '../../config/SimpleApiCalls';
import {BOOK_PDF_API} from '../../config/WebServices';

const BookPdf = (props) => {
  const {bookId, bookName} = props;

  const [isLoading, setIsLoading] = useState(null);
  const [bookPdf, setBookPdf] = useState(null);

  useEffect(() => {
    getBookPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBookPdf = async () => {
    let payload = new FormData();
    payload.append('book_id', bookId);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      setIsLoading(true);
      const result = await createResource(BOOK_PDF_API, payload, null, headers);
      if (result.code === 1 && result.bookpdf[0].file_path) {
        setBookPdf(result.bookpdf[0].file_path);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error ==> ', error);
      setIsLoading(false);
    }
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

      {bookPdf ? (
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
      ) : null}

      {!isLoading && !bookPdf && (
        <View style={{...styles.notFoundContainer}}>
          <Text style={{...styles.notFoundText}}>
            {'Sorry, something went wrong.\nNo Pdf file found.'}
          </Text>
        </View>
      )}

      <SpinnerLoader isloading={isLoading} />
    </ImageBackground>
  );
};

export default BookPdf;
