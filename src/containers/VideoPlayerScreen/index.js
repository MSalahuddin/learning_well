// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View , TouchableOpacity, Image, Alert} from "react-native";
import styles from "./styles";
import VideoPlayer from 'react-native-video-controls';
// import WebViewBridge from 'react-native-webview-bridge';
import {Metrics, Images} from '../../theme';
import { drawerMenuSwitched as navigationChanged } from "../../actions/navigationActions";
import { Actions } from "react-native-router-flux";
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
class VideoPlayerScreen extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isVideoPlay: true
        }
    }

    UNSAFE_componentWillMount(){
      this.getVideo();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps,'nextttttttttttttttttttttt')
        if (nextProps.navigation.newView !== this.props.navigation.newView) {
            // this.resetVid();
          }
    }

    getVideo = () => {
      const {lecture} = this.props
      fetch(`${lecture.AnimationPath}/config`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          thumbnailUrl: res.video.thumbs['640'],
          videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
          video: res.video,
        })
      });
    }
    // onBackPress = () => {
    //     this.setState({isVideoPlay: false})
    //     this.props.navigationChanged("", "lectureScreen");
    //     Actions.lectureScreen()
    //     // this.props.navigation.navigate("lectureScreen", {
    //     //     screen: "lectureScreen"
    //     //   });
    // }

  render() {
    const {lecture} = this.props
      const {isVideoPlay} = this.state;
      console.log(lecture,'lecture.AnimationPathlecture.AnimationPath')
    return (
      <View style={styles.container}>
      <TouchableOpacity style = {{backgroundColor: 'white', elevation: 4, flexDirection: 'row'}} onPress = {() => { Actions.pop()}}>
            <Image
              style={{
                width: Metrics.ratio(40),
                height: Metrics.ratio(40),
                marginTop: Metrics.ratio(20),
                marginBottom: Metrics.ratio(10),
                marginLeft: Metrics.ratio(10),
                borderRadius: 100,
              }}
              resizeMode="auto"
              resizeMode="cover"
              source = {Images.backArrowIcon}
              
            />
            <View style = {{width: Metrics.screenWidth * 0.8, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{fontSize: Metrics.ratio(20), color: 'black'}}>{lecture.topic}</Text>
            </View>
         </TouchableOpacity>
        
      {/* <WebView
        style = {{}}
        source={{uri: lecture.AnimationPath}}/> */}
      
       
      <VideoPlayer
        ref={ref => {
          this.player = ref;
        }}
        source={{uri: this.state.videoUrl}}
        navigator={this.props.navigator}
        disableFullscreen = {true}
        disableBack = {true}
        // fullscreen={true}
        resizeMode={'contain'}
      />
        
      </View>
    );
  }
}

const mapStateToProps = (state) => ({navigation: state.navigation});
const actions = {
    navigationChanged,
  };

export default connect(mapStateToProps, actions)(VideoPlayerScreen);
