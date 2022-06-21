import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import Colors from '../../../../Colors';
import {useSelector, useDispatch} from 'react-redux';
import {logoutuser} from '../../../redux/actions';
import messaging from '@react-native-firebase/messaging';
import {
  Post,
  like,
  blockUser,
  updateToken,
  homeAd,
  deletePost,
} from '../../../lib/api';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
const Home = ({navigation}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const [posts, setPosts] = useState([]);
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(-1);
  const [homeImg, setHomeImg] = useState('');
  useEffect(() => {
    Post({Auth: userData.token}).then(res => {
      if (res) {
        setPosts(res.data.reverse());
      }
    });
  }, [check]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Post({Auth: userData.token}).then(res => {
        if (res) {
          setPosts(res.data.reverse());
        }
      });
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    SplashScreen.hide();
    homeAd({Auth: userData.token}).then(res => {
      // console.log('avc', res.Ads.image);
      setHomeImg(res.Ads.image);
    });
    getToken();
  }, []);
  console.log('a', userData);
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    updateToken({Auth: userData.token, device_token: fcmToken});
    messaging().onTokenRefresh(token => {
      updateToken({Auth: userData.token, device_token: token});
    });
  };
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => setShow(-1)}
      activeOpacity={1}
      style={{paddingTop: 10, marginBottom: tabBarHeight}}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item.user_image
                ? {uri: item.user_image}
                : require('../../../assets/images/placeholder.png')
            }
            style={{height: 50, width: 50, borderRadius: 25}}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('userProfile', {
                id: item.user_id,
                email: item.user_email,
                name: item.first_name,
                image: item.user_image,
              })
            }
            style={{marginLeft: 10}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                // fontFamily: 'Poppins-Medium',
              }}>
              {item.first_name}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                // fontFamily: 'Poppins-Regular',
              }}>
              {item.location}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => setShow(index)}>
            <Icon1 name="dots-three-vertical" color="white" size={15} />
          </TouchableOpacity>
          {index == show && (
            <View
              style={{
                position: 'absolute',
                width: 150,
                height: 80,
                zIndex: 5,
                // backgroundColor: 'white',
                right: 10,
              }}>
              {userData.user.id == item.user_id ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setShow(-1);
                      deletePost({Auth: userData.token, id: item.id}).then(
                        res => {
                          setCheck(!check);
                        },
                      );
                    }}
                    style={{
                      backgroundColor: 'white',
                      height: 40,
                      justifyContent: 'center',
                      paddingLeft: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: 'black',
                    }}>
                    <Text>Delete Post</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert('User Reported');
                      setShow(-1);
                    }}
                    style={{
                      backgroundColor: 'white',
                      height: 40,
                      justifyContent: 'center',
                      paddingLeft: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: 'black',
                    }}>
                    <Text>Report User</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      blockUser({
                        Auth: userData.token,
                        blocked_user: item.user_id,
                      }).then(res => {
                        Alert.alert('User blocked');
                        setShow(-1);
                        setCheck(!check);
                      })
                    }
                    style={{
                      backgroundColor: 'white',
                      height: 40,
                      justifyContent: 'center',
                      paddingLeft: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: 'black',
                    }}>
                    <Text>Block User</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          height: 200,
          borderWidth: 0.5,
          borderColor: '#ccc',
          width: '100%',
          marginTop: 10,
          zIndex: -1,
        }}>
        {item.video ? (
          <View>
            <Image
              source={{uri: item.thumbnil}}
              style={{height: '100%', width: '100%'}}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Videos', {item})}
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
              }}>
              <Icon3 name="play" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Image
              source={{uri: item.image}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        )}
      </View>
      <View style={{marginTop: 10, paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              like({Auth: userData.token, post_id: item.id}).then(res => {
                setCheck(!check);
              });
            }}>
            <Icon2
              name="like1"
              color={item.is_like ? '#1473E6' : 'white'}
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => navigation.navigate('Comments', {id: item.id})}>
            <Text style={{color: 'white'}}>{item.total_comments}</Text>
            <Icon name="comment" color="white" size={20} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            // fontFamily: 'Poppins-Regular',
            marginTop: 5,
          }}>
          {item.is_like
            ? `Liked by ${item.likes} others`
            : `Liked by ${item.likes} others`}
        </Text>
        <TouchableOpacity
          // onPress={() => navigation.navigate('Comments', {id: item.id})}
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              // fontFamily: 'Poppins-Regular',
              fontSize: 15,
            }}>
            {item.description}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Comments', {id: item.id})}>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              // fontFamily: 'Poppins-Regular',
              marginTop: 5,
              fontSize: 12,
            }}>
            View all comments
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={{color: 'white', fontSize: 18}}>Home </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification');
            // logoutuser(false)(dispatch);
          }}>
          <Icon name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {homeImg ? (
        <View style={{width: '100%'}}>
          <Image source={{uri: homeImg}} style={{height: 50, width: '100%'}} />
        </View>
      ) : null}

      {/* <TouchableOpacity activeOpacity={1} onPress={() => setShow(-1)}> */}
      {/* <View> */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* </View> */}
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    backgroundColor: Colors.maincolor,
  },
});
