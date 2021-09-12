import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Video from 'react-native-video-controls';

import styles from './styles';

import {SpinnerLoader} from '../../components';
import {Images} from '../../theme';

const VideoPlayer = (props) => {
  const [videoConfig, setVideoConfig] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.videoUrl) {
      getVideoConfig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.videoUrl]);

  const getVideoConfig = async () => {
    const {videoUrl} = props;
    try {
      setIsLoading(true);
      const response = await fetch(`${videoUrl}/config`);
      const {request} = await response.json();
      setVideoConfig({
        videoUrl: request.files.hls.cdns[request.files.hls.default_cdn].url,
        // thumbnailUrl: video.thumbs['640'],
        // video: video,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{...styles.container}}>
      <TouchableOpacity
        style={{...styles.headerContainer}}
        onPress={() => {
          Actions.pop();
        }}>
        <Image
          style={{...styles.backImage}}
          resizeMode={'contain'}
          source={Images.backArrowIcon}
        />
        <View style={{...styles.headingContainer}}>
          <Text style={{...styles.headingText}}>{props.topic}</Text>
        </View>
      </TouchableOpacity>

      {videoConfig?.videoUrl ? (
        <Video
          source={{uri: videoConfig?.videoUrl}}
          navigator={props.navigator}
          disableFullscreen={true}
          disableBack={true}
          resizeMode={'contain'}
          onError={(error) => console.log(error, 'error')}
        />
      ) : null}

      <SpinnerLoader isloading={isLoading} />
    </View>
  );
};

export default VideoPlayer;
