import React, {useState, useEffect, useRef} from 'react';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/EvilIcons';
import Video from 'react-native-video';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {video, like, videoAd} from '../../../lib/api';
import Slider from '@react-native-community/slider';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import Colors from '../../../../Colors';
import moment from 'moment';
const Videos = ({navigation, route}) => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [value, setValue] = useState(0);
  const [videoImg, setVideoImg] = useState('');
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {item} = route.params;
  const [videos, setVideos] = useState([]);
  const {userData} = useSelector(({USER}) => USER);
  const [likes, setLike] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    video({Auth: userData.token, id: item.user_id}).then(res => {
      setVideos(res.data);
    });
    setLike(item.is_like);
    videoAd({Auth: userData.token}).then(res => {
      setVideoImg(res.Ads.image);
    });
  }, []);

  const onProgress = data => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading && !paused) {
      setCurrentTime(data.currentTime);
      setValue(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
    setPaused(false);
  };

  const onLoadStart = () => {
    setIsLoading(true);
    setCurrentTime(0);
    setPaused(true);
  };

  const onSlidingStart = time => {
    setPaused(true);
    setCurrentTime(time);
  };

  const onSlidingComplete = time => {
    setValue(time);
    setCurrentTime(time);
    setPaused(false);
    videoRef.current.seek(time);
  };

  const onValueChange = time => {
    setCurrentTime(time);
  };

  console.log(userData.user.id);
  // console.log(videos[0]?.user_id);
  console.log('iteme', item);
  console.log('item', videos);
  return (
    <View style={{flex: 1, backgroundColor: Colors.maincolor}}>
      <View
        style={{
          marginTop: Platform.OS === 'ios' ? 25 : 0,
          height: 56,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          backgroundColor: Colors.maincolor,
          shadowColor: 'white',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon1 name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              marginLeft: 10,
              fontSize: 18,
              // fontFamily: 'Poppins-Medium',
            }}>
            Video
          </Text>
        </View>
      </View>
      {videoImg ? (
        <View style={{width: '100%'}}>
          <Image source={{uri: videoImg}} style={{height: 50, width: '100%'}} />
        </View>
      ) : null}
      <View>
        <View style={{height: 250, marginTop: 10}}>
          <Video
            onEnd={() => setPaused(!paused)}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            ref={videoRef}
            resizeMode="contain"
            poster={item.thumbnil}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            source={{uri: item.video}}
          />
          {/* <View style={styles.sliderSection}>
            <View style={styles.sliderContainer}>
              <Text style={styles.currentTime}>
                {(currentTime / 60).toFixed(2)}
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                step={1}
                maximumValue={duration}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#000000"
                value={value}
                onValueChange={onValueChange}
                onSlidingStart={onSlidingStart}
                onSlidingComplete={onSlidingComplete}
                thumbTintColor="#000"
              />
              <Text style={styles.duration}>
                {((duration - currentTime) / 60).toFixed(2)}
              </Text>
            </View>
            <View style={styles.controlsContainer}>
              <FontAwesome name="backward" size={25} color="grey" />
              <TouchableOpacity
                onPress={() => setPaused(!paused)}
                activeOpacity={1}
                style={styles.playPause}>
                <FontAwesome
                  name={paused ? 'play' : 'pause'}
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
              <FontAwesome name="forward" size={25} color="grey" />
            </View>
          </View> */}

          {/* <Video
            onEnd={() => setPaused(!paused)}
            resizeMode="contain"
            // setControls={true}

            paused={paused}
            // controls={true}
        // ignoreSilentSwitch="ignore"

            // paused={false}
            poster={item.thumbnil}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            source={{uri: item.video}}
          />
          <View
            style={{
              position: 'absolute',
              height: 250,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              {paused ? (
                <Icon
                  name={'controller-play'}
                  onPress={() => setPaused(paused)}
                 

                  // onPress={alert('ather')}
                  size={40}
                  color="white"
                />
              ) : (
                <Icon1
                  name={'pause'}
                  onPress={() => setPaused(!paused)}
                  size={40}
                  color="white"
                />
              )}

            </View>
          </View> */}
          <View
            style={{
              //   flexDirection: 'row',
              position: 'absolute',

              //   backgroundColor: 'red',
              height: 250,
              alignItems: 'flex-end',
              width: '100%',
              justifyContent: 'flex-end',
              paddingRight: 10,
              paddingBottom: 10,
            }}>
            <Icon2 name={'fullscreen'} size={20} color={'white'} />
          </View>
        </View>
        <ScrollView style={{height: '55%'}}>
          <View style={{paddingHorizontal: 20, marginTop: 10}}>
            <Text
              style={{
                color: 'skyblue',
                fontSize: 13,
                // fontFamily: 'Poppins-Regular',
              }}>
              #Lorem #ipsum #Lorem
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  // fontFamily: 'Poppins-Regular',
                }}>
                {item.description}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                //   justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: '#ccc',
                  marginLeft: 20,
                  fontSize: 13,
                  // fontFamily: 'Poppins-Regular',
                }}>
                {moment(video.created_at).fromNow()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
                paddingHorizontal: 30,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    like({Auth: userData.token, post_id: item.id}).then(res => {
                      console.log('res', res);
                      if (res == 'Liked') {
                        setLike(true);
                      } else {
                        setLike(false);
                      }
                    });
                  }}
                  style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 13,
                      // fontFamily: 'Poppins-Regular',
                      fontSize: 13,
                      // fontFamily: 'Poppins-Regular',
                    }}>
                    {item.likes}
                  </Text>
                  <Icon
                    style={{marginLeft: 3}}
                    name="thumbs-up"
                    color={item.is_like || likes ? '#1473E6' : '#ccc'}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Comments', {id: item.id})}
                style={{alignItems: 'center'}}>
                <Icon3 name="comment" size={30} color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: '#ccc',
              marginTop: 2,
            }}></View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('userProfile', {
                id: item.user_id,
                email: item.user_email,
                name: item.first_name,
                image: item.user_image,
              })
            }
            style={{
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              borderBottomColor: '#ccc',
              marginTop: 5,
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingBottom: 5,
            }}>
            <Image
              source={
                item.user_image
                  ? {uri: item.user_image}
                  : require('../../../assets/images/download.jpg')
              }
              style={{height: 30, width: 30, borderRadius: 15}}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                // fontFamily: 'Poppins-Medium',
                marginLeft: 10,
              }}>
              {item.first_name}
              {/* {userData.user.id != videos[0]?.user_id && (
                <Text style={{}}> . Follow</Text>
              )} */}

              {/* <Text style={{fontFamily: 'Poppins-Regular'}}> Unfollow</Text> */}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              marginTop: 10,
              paddingHorizontal: 20,
              fontSize: 16,
              // fontFamily: 'Poppins-Medium',
              // fontWeight: 'bold',
            }}>
            Similar Video
          </Text>
          {videos.map((item, index) => (
            <View key={index + 'a'}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Videos', {item})}
                style={{height: 250, marginTop: 10}}>
                <Image
                  source={{uri: item.thumbnil}}
                  style={{width: '100%', height: '100%'}}
                />
                <View
                  style={{
                    position: 'absolute',
                    height: 250,
                    width: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      backgroundColor: 'black',
                      paddingVertical: 5,
                      borderRadius: 20,
                      marginBottom: 10,
                      marginRight: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                        // fontFamily: 'Poppins-Regular',
                      }}>
                      05:25
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  // alignItems: 'center',
                  paddingHorizontal: 40,
                }}>
                <Image
                  source={
                    item.user_image
                      ? {uri: item.user_image}
                      : require('../../../assets/images/download.jpg')
                  }
                  style={{height: 30, width: 30, borderRadius: 15}}
                />
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      // fontFamily: 'Poppins-Medium',
                    }}>
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      // fontFamily: 'Poppins-Regular',
                    }}>
                    {moment(item.created_at).fromNow()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  videoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  videoSubContainer: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  video: {
    // height: hp(40),
    backgroundColor: 'black',
    // width: wp(90),
  },
  info: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 16,
    // fontFamily: 'Ubuntu-Medium',
  },
  sliderSection: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentTime: {
    color: 'grey',
    fontSize: 16,
    // fontFamily: 'Ubuntu-Regular',
  },
  slider: {
    width: 220,
    height: 40,
  },
  duration: {
    color: 'black',
    fontSize: 16,
    // fontFamily: 'Ubuntu-Regular',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  playPause: {
    backgroundColor: 'black',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
export default Videos;
