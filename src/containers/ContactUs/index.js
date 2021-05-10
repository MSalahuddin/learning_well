// @flow
import React from 'react';
import {Text, View, ImageBackground, Image, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

import {Images} from '../../theme';
import {Header} from '../../components';

const ContactUs = () => {
  return (
    <ImageBackground
      resizeMode={'cover'}
      source={Images.homeBackgroundImage2}
      style={styles.container}>
      <Header
        leftImage={Images.backArrowIcon2}
        leftBtnPress={() => Actions.pop()}
        rightImage={Images.contactUsIcon}
        rightImageStyle={styles.rightImageStyle}
      />

      <ScrollView>
        <Image
          source={Images.logo}
          resizeMode={'contain'}
          style={{...styles.logo}}
        />

        <View style={{...styles.contentContainer}}>
          <View>
            <View style={{...styles.bodyItem}}>
              <Text style={{...styles.officeCity}}>
                Karachi Corporate Office
              </Text>
              <Text style={{...styles.officeAddress}}>
                Bungalow # B-50, Block-1, Near Continental Bakery,
                Gulistan-e-Jauhar, Karachi-75290
              </Text>
              <Text style={{...styles.officeNo}}>
                Tel: 021-34662780 - 34662790, Cell: 0333-1209813
              </Text>
            </View>

            <View style={{...styles.bodyItem}}>
              <Text style={{...styles.officeCity}}>Lahore Office</Text>
              <Text style={{...styles.officeAddress}}>
                Main Walton Road, Kouray Stop, Lahore.
              </Text>
              <Text style={{...styles.officeNo}}>
                Tel: 042-36626012, Cell: 0333-1209808 - 0321-4320166
              </Text>
            </View>

            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.bodyItem,
                borderBottomWidth: 0,
              }}>
              <Text style={{...styles.officeCity}}>Islamabad Office</Text>
              <Text style={{...styles.officeAddress}}>
                Plot # 32, Flat # 1, 1st Floor, Shangrela Plaza, Razzaq Valley,
                Express Way Islamabad.
              </Text>
              <Text style={{...styles.officeNo}}>
                Cell: 0300-5175171 - 0333-1209811
              </Text>
            </View>
          </View>

          <View style={{...styles.footer}}>
            <View style={{...styles.footerItem}}>
              <Image
                source={Images.mailIcon}
                resizeMode={'contain'}
                style={{...styles.footerItemImage}}
              />
              <Text style={{...styles.footerItemText}}>
                info@learningwell.pk
              </Text>
            </View>

            <View style={{...styles.footerItem}}>
              <Image
                source={Images.webIcon}
                resizeMode={'contain'}
                style={{...styles.footerItemImage}}
              />
              <Text style={{...styles.footerItemText}}>
                www.learningwell.pk
              </Text>
            </View>

            <View style={{...styles.footerItem}}>
              <Image
                source={Images.facebookIcon}
                resizeMode={'contain'}
                style={{...styles.footerItemImage}}
              />
              <Text style={{...styles.footerItemText}}>
                facebook.com/LearningWellOfficial
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ContactUs;
