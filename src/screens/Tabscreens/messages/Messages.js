import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import moment from 'moment';
import Colors from '../../../../Colors';
import {chatAd} from '../../../lib/api';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
const Messages = ({navigation}) => {
  const [list, setList] = useState([]);
  const [chatImg, setChatImg] = useState('');
  const {userData} = useSelector(({USER}) => USER);
  const tabBarHeight = useBottomTabBarHeight();
  const emailToUniqueString = email => email.replace(/[^a-zA-Z0-9 ]/g, '');
  useEffect(() => {
    chatAd({Auth: userData.token}).then(res => {
      setChatImg(res.Ads.image);
    });
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      database()
        .ref('roomList')
        .child(`user${emailToUniqueString(userData.user.email)}`)
        .on('value', dataSnapshot => {
          let users = [];
          dataSnapshot.forEach(child => {
            users.push({
              key: child.key,
              ...child.val(),
            });
          });
          setList(users);
        });
    });
    return unsubscribe;
  }, [navigation]);
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat', {
          email: item.key.split('user')[1],
          image: item.info.image,
          name: item.info.name,
        });
        // console.log(item.key.split('user')[1]);
      }}
      style={{
        marginTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          alignItems: 'center',
          marginTop: item.info.messageInfo.counts ? 0 : 10,
        }}>
        {item.info.messageInfo.counts > 0 && (
          <View
            style={{
              backgroundColor: 'black',
              height: 20,
              left: 10,
              top: 5,
              zIndex: 1,
              width: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>{item.info.messageInfo.counts}</Text>
          </View>
        )}

        <Image
          source={{uri: item.info.image}}
          style={{height: 50, borderRadius: 25, width: 50}}
        />
      </View>
      <View
        style={{
          //   backgroundColor: 'red',
          width: '85%',
          marginTop: 10,
          justifyContent: 'space-between',
          //   paddingLeft: 10,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 15}}>{item.info.name}</Text>
          <Text style={{fontSize: 14}}>{moment(item.info.date).fromNow()}</Text>
        </View>
        {/* <Text style={{fontSize: 15,}}>
          {item.info.messageInfo.messageText.substring(0, 20)}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
  console.log('users', list);
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: tabBarHeight,
        backgroundColor: Colors.maincolor,
      }}>
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
        <Text style={{color: 'white', fontSize: 18}}>Chat </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {chatImg ? (
        <View style={{width: '100%'}}>
          <Image source={{uri: chatImg}} style={{height: 50, width: '100%'}} />
        </View>
      ) : null}
      <FlatList
        data={list}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({});
