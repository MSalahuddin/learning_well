// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import _ from 'lodash';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  AsyncStorage,
  ImageBackground,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Metrics, Colors, Images} from '../../theme';
// import Icon from "react-native-vector-icons/FontAwesome";
import styles from './styles';
//import { logout as logout_user } from "../../actions/Login";
import Icon from 'react-native-vector-icons/FontAwesome';
import {logout as logout_user} from '../../actions/Login';
import Share from 'react-native-share';
import utils from '../../util';

const url =
  'https://play.google.com/store/apps/details?id=com.learning_well&hl=en';
const title = 'Learning Well';
const message = 'Please check the app';
const options = Platform.select({
  ios: {
    activityItemSources: [
      {
        placeholderItem: {type: 'url', content: url},
        item: {
          default: {type: 'url', content: url},
        },
        subject: {
          default: title,
        },
        linkMetadata: {originalUrl: url, url, title},
      },
      {
        placeholderItem: {type: 'text', content: message},
        item: {
          default: {type: 'text', content: message},
          message: null, // Specify no text to share via Messages app.
        },
      },
    ],
  },
  default: {
    title,
    subject: title,
    message: `${message} ${url}`,
  },
});

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   isAccountExpand: false,
      user: null,
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      let user = JSON.parse(value);
      if (value !== null) {
        this.setState({user: user});
      }
    } catch (e) {
      console.log(e);
    }
  };

  onLogout = async () => {
    utils.showYesNoMessage(
      'Confirm',
      'Do you want to logout',
      async () => {
        try {
          await AsyncStorage.setItem('@storage_Key', '');
          this.props.logout_user('API_LOGOUT');
          this.props.navigation.closeDrawer();
          setTimeout(() => {
            Actions.loginScreen({type: 'replace'});
            // this.props.navigation.navigate("loginScreen", {
            //   screen: "loginScreen",
            //   isLogout: true
            // });
          }, 1000);
          // this.props.updateUser(user)
        } catch (e) {
          console.log(e, 'kkkkkkkklllllllllll');
          // saving error
        }
      },
      () => {},
    );
  };

  navigateContactus = () => {
    this.props.navigation.navigate('contactUsScreen', {
      screen: 'contactUsScreen',
    });
  };

  navigateShareApp = () => {
    Share.open(options);
  };

  // navigateAgency = () => {
  //   // this.props.get_products("products");
  //   this.props.navigation.navigate("agencyScreen", {
  //     screen: "agencyScreen"
  //   });
  //   this.props.navigation.closeDrawer();
  // };

  // navigateActivityLogs = () => {
  //   this.props.navigation.navigate("activityLogScreen", {
  //     screen: "activityLogScreen"
  //   });
  //   this.props.navigation.closeDrawer();
  // };

  // navigateProject = () => {
  //   this.props.navigation.navigate("projectScreen", {
  //     screen: "projectScreen"
  //   });
  //   this.props.navigation.closeDrawer();
  // };

  // navigateWorkDairy = () => {
  //   // this.props.get_services("services");
  //   this.props.navigation.navigate("workDairyScreen", {
  //     screen: "workDairyScreen"
  //   });
  //   this.props.navigation.closeDrawer();
  // };

  // navigateReports = () => {
  //   this.props.navigation.navigate("reportScreen", {
  //     screen: "reportScreen"
  //   });
  //   this.props.navigation.closeDrawer();
  // };

  // navigateAccounts = () => {
  //   this.props.navigation.navigate("accountScreen", {
  //     screen: "accountScreen"
  //   });
  //   this.props.navigation.closeDrawer();
  // };

  // navigateChangePlan = () => {
  //   this.props.navigation.navigate("changePlanScreen", {
  //     screen: "changePlanScreen"
  //   });
  //   this.props.navigation.closeDrawer();
  // };

  // expandAccount = () => {
  //   const { isAccountExpand } = this.state;
  //   this.setState({ isAccountExpand: !isAccountExpand });
  // };

  // renderPenIcon = () => {
  //   return (
  //     <View style={styles.penIconCont}>
  //       <Image source={Images.editIcon} style={styles.penIcon} />
  //     </View>
  //   );
  // };

  renderSeparator = () => {
    return (
      <View
        style={{
          width: Metrics.screenWidth * 0.62,
          height: Metrics.ratio(1.5),
          marginLeft: Metrics.screenWidth * 0.18,
          backgroundColor: '#EEE',
        }}
      />
    );
  };

  // renderUserCard = () => {
  //   const { user } = this.state;
  //   const username = user && user.FullName && user.FullName;

  //   return (
  //     <View
  //       style={{
  //         justifyContent: "center",
  //         flex: 7
  //       }}
  //     >
  //       <Text
  //         style={{
  //           color: Colors.white,
  //           fontSize: Metrics.ratio(18)
  //         }}
  //       >
  //         {username}
  //       </Text>
  //     </View>
  //   );
  // };

  renderMenuHeader = () => {
    const {login} = this.props;
    const {user} = this.state;
    return (
      <View
        style={{
          width: Metrics.screenWidth * 0.8,
          height: Metrics.screenHeight * 0.22,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('editProfileScreen', {
              screen: 'editProfileScreen',
            });
          }}>
          <Image
            style={{
              width: Metrics.ratio(75),
              height: Metrics.ratio(75),
              borderRadius: 100,
              marginHorizontal: Metrics.ratio(10),
              backgroundColor: 'white',
              elevation: 8,
            }}
            source={Images.sidemenuProfileIcon}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Metrics.screenWidth * 0.35,
            justifyContent: 'center',
          }}>
          <View
            style={{flexDirection: 'row', width: Metrics.screenWidth * 0.3}}>
            {user && (
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: Metrics.ratio(16),
                  fontWeight: 'bold',
                }}>
                {user && user.fullname}
                {/* {user && user.first_name && user.first_name }
              {" "}
              {user && user.last_name && user.last_name } */}
                {/* {login && login.data && login.data.data && login.data.data.first_name && login.data.data.first_name }{" "}
              {login && login.data && login.data.data && login.data.data.last_name && login.data.data.last_name } */}
              </Text>
            )}
          </View>
          <Text
            style={{
              fontSize: Metrics.ratio(16),
              color: '#FFFFFF',
            }}>
            class {user && user.class_id && user.class_id}
          </Text>
        </View>
        {/*  */}
        <TouchableOpacity onPress={() => this.props.navigation.closeDrawer()}>
          <Image
            style={{
              width: Metrics.ratio(40),
              height: Metrics.ratio(40),
              borderRadius: 100,
              // backgroundColor: Colors.darkStaleBlue,
              marginLeft: Metrics.ratio(10),
            }}
            source={Images.sidemenuArrowIcon2}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderRow = (title, onPress, icon, extraView = null) => {
    return (
      <TouchableOpacity style={[styles.listView]} onPress={onPress}>
        <Image
          style={[
            {
              width: Metrics.ratio(20),
              height: Metrics.ratio(20),
              marginLeft: Metrics.ratio(20),
            },
            title === 'Notifications' && {
              width: Metrics.ratio(23),
              height: Metrics.ratio(28),
            },
          ]}
          source={icon}
        />

        <View
          style={{
            justifyContent: 'center',
            marginLeft: Metrics.ratio(25),
            height: Metrics.ratio(32),
            flex: 1,
          }}>
          <Text style={[styles.listTitle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderBody = () => {
    return (
      <View
        style={{
          flex: 1,
        }}>
        {/* {this.renderRow("Notifications", this.navigateActivityLogs, Images.sidemenuBellIcon)} */}

        {this.renderSeparator()}

        {this.renderRow(
          'Share The App',
          this.navigateShareApp,
          Images.sidemenuSendImage2,
        )}

        {this.renderSeparator()}

        {this.renderRow(
          'Contact Us',
          this.navigateContactus,
          Images.sidemenuCallIcon2,
        )}

        {this.renderSeparator()}

        {/* {this.renderRow(
          "Terms & Conditions",
          this.navigateActivityLogs,
          Images.sidemenuFileIcon
        )} */}

        {/* {this.renderSeparator()} */}
        {/* {this.renderRow("Logout", this.onLogout, "sign-out")} */}
        {/* {this.renderSeparator()} */}
      </View>
    );
  };

  render() {
    const {appConfig} = this.props;

    return (
      <ImageBackground
        resizeMode="auto"
        resizeMode="stretch"
        source={Images.sidemenuBackground2}
        style={styles.container}>
        {this.renderMenuHeader()}
        {/* {this.renderSeparator()} */}
        {this.renderBody()}
        <TouchableOpacity
          style={{
            backgroundColor: Colors.Venice_Blue,
            width: Metrics.ratio(260),
            height: Metrics.ratio(50),
            borderRadius: Metrics.ratio(30),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: Metrics.ratio(40),
            marginLeft: Metrics.screenWidth * 0.04,
          }}
          onPress={() => this.onLogout()}>
          <Text
            style={{
              color: 'white',
              marginLeft: Metrics.ratio(5),
              fontSize: Metrics.ratio(14),
            }}>
            Logout
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => this.onLogout()}>
          <ImageBackground
            style={{
              width: Metrics.ratio(260),
              height: Metrics.ratio(50),
              borderRadius: Metrics.ratio(30),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: Metrics.ratio(40),
              marginLeft: Metrics.screenWidth * 0.04,
            }}
            source={Images.sidemenuButtonImage}>
            <Image
              style={{width: 25, height: 25}}
              source={Images.logout_icon}
            />
            <Text
              style={{
                color: 'white',
                marginLeft: Metrics.ratio(5),
                fontSize: Metrics.ratio(14),
              }}>
              Logout
            </Text>
          </ImageBackground>
        </TouchableOpacity> */}
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({login: state.login});

const actions = {logout_user};

export default connect(mapStateToProps, actions)(Sidebar);
