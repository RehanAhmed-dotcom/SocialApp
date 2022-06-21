import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import moment from 'moment';
import {like, blockUser, search, follow, deletePost} from '../../../lib/api';
import {useSelector} from 'react-redux';

import Colors from '../../../../Colors';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import {userProfile} from '../../../lib/api';
// import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
const Home = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(-1);
  const [check, setCheck] = useState(false);
  //   const tabBarHeight = useBottomTabBarHeight();
  const {userData} = useSelector(({USER}) => USER);
  const {id} = route.params;
  // console.log('posts', posts);
  useEffect(() => {
    search({Auth: userData.token, given_id: id}).then(res => {
      console.log('reseeeponces', res);
      setData(res.posts);
    });
  }, [check]);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     userProfile({Auth: userData.token, id: id}).then(res => {
  //       console.log('reseee', res.data);
  //       setData(res.posts);
  //     });
  //   });
  //   return unsubscribe;
  // }, [navigation]);
  // console.log(userData);
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => setShow(-1)}
      activeOpacity={1}
      style={{marginTop: 10}}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              //
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={
                item.user_image
                  ? {uri: item.user_image}
                  : require('../../../assets/images/downloades.jpg')
              }
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
                // fontFamily: 'Poppins-Medium',
                fontSize: 15,
              }}>
              {item.first_name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              follow({Auth: userData.token, user_2: item.user_id}).then(res => {
                console.log(res);
                setCheck(!check);
              })
            }>
            {userData.user.id != item.user_id && (
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  // fontFamily: 'Poppins-Regular',
                }}>
                {item.is_followed == true ? '. Following' : '. Follow'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
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
              top: 20,
              backgroundColor: 'white',
              right: 30,
            }}>
            {userData.user.id == item.user_id ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setShow(-1);
                    deletePost({Auth: userData.token, id: item.id}).then(
                      res => {
                        console.log('res', res);
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
                      console.log(res);
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
      <View
        style={{
          height: 200,
          borderWidth: 0.5,
          borderColor: '#ccc',
          width: '100%',
          marginTop: 10,
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
              console.log('even come here');
              like({Auth: userData.token, post_id: item.id}).then(res => {
                console.log('resee', res);
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
            : `Liked by ${item.likes}`}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Comments', {id: item.id})}
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              // fontFamily: 'Poppins-Regular',
            }}>
            {item.description}
          </Text>
        </TouchableOpacity>
        {/* <Text
          style={{
            color: 'white',
            fontFamily: 'Poppins-Regular',
            marginTop: 5,
            fontSize: 12,
          }}>
          
        </Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.maincolor}}>
      <View
        style={{
          marginTop:Platform.OS==='ios'?25:0,

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
            <Icon2 name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              // fontFamily: 'Poppins-Medium',
              marginLeft: 10,
            }}>
            Explore{' '}
          </Text>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={20} color="white" />
        </TouchableOpacity> */}
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
