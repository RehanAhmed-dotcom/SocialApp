import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Colors from '../../../../Colors';
import {showNotification} from '../../../lib/api';
import {useSelector} from 'react-redux';
const Notification = ({navigation}) => {
  const {userData} = useSelector(({USER}) => USER);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (item.type == 'Comment') {
          navigation.navigate('Comments', {id: item.redirect});
        } else if (item.type == 'Like') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('userProfile', {
            id: item.user_id,
            email: item.user_email,
            name: item.user_name,
            image: item.user_image,
          });
        }
      }}
      style={{
        marginTop: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        // paddingBottom: 10,
        paddingVertical: 20,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={
            item.image
              ? {uri: item.image}
              : require('../../../assets/images/holder.png')
          }
          style={{height: 50, borderRadius: 25, width: 50}}
        />
      </View>
      <View
        style={{
          //   backgroundColor: 'red',
          //   width: '85%',
          //   marginTop: 10,
          //   justifyContent: 'space-between',
          //   paddingLeft: 10,
          paddingHorizontal: 10,
        }}>
        <Text>{item.user_name}</Text>
        {/* <Text>{item.time}</Text> */}
        <Text>{item.message}</Text>
        <Text>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
  const [notif, setNotif] = useState([]);
  useEffect(() => {
    console.log('come heree');
    showNotification({Auth: userData.token}).then(res => {
      setNotif(res.data.reverse());
      console.log('not', res);
    });
  }, []);
  return (
    <View
      style={{flex: 1, paddingBottom: 50, backgroundColor: Colors.maincolor}}>
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
            <Icon1 name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              // fontFamily: 'Poppins-Medium',
              marginLeft: 10,
            }}>
            Notification{' '}
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={notif}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
export default Notification;
