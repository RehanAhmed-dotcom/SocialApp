import React, {useState} from 'react';
import Input from '../../../components/inputField';
import Button from '../../../components/Button';
import {
  StyleSheet,
  Text,
  Modal,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import ImagePicker from 'react-native-image-crop-picker';
// import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Icon1 from 'react-native-vector-icons/Entypo';
import {createPosts} from '../../../lib/api';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Colors from '../../../../Colors';
import {useDispatch, useSelector} from 'react-redux';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
const addCaption = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pic, setPic] = useState('');
  const {userData} = useSelector(({USER}) => USER);
  const {picture, check, thumb} = route.params;
  const [showModal, setShowModal] = useState(false);
  console.log('pic', picture);
  console.log('thumb', thumb);
  const myModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setShowModal(!showModal);
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#00000088',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            height: 100,
            width: 100,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.maincolor} />
        </View>
      </View>
    </Modal>
  );
  // const tabBarHeight = useBottomTabBarHeight();
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
        <Text style={{color: 'white', fontSize: 18}}>Add post </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon1 name="cross" size={25} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'Poppins-Regular',
                marginLeft: 10,
              }}>
              New post
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon2 name="arrowright" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 20}}>
          <Input
            placeholder={'Write a caption'}
            value={email}
            onChangeText={setEmail}
            style={{marginVertical: 12}}
            RightIcon={() => null}
          />
          <Input
            placeholder={'Add Location'}
            style={{marginVertical: 12}}
            value={pass}
            onChangeText={setPass}
            RightIcon={() => null}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          //   backgroundColor: 'red',
          paddingHorizontal: 20,
          paddingBottom: 10,
          justifyContent: 'flex-end',
        }}>
        {/* <View style={{height: 20}} /> */}
        <Button
          onPress={() => {
            setShowModal(!showModal);
            const data1 = new FormData();
            check == 'video'
              ? data1.append('video', {
                  uri: picture,
                  type: 'video/mp4',
                  name: 'video' + new Date() + '.mp4',
                })
              : data1.append('image', {
                  uri: picture,
                  type: 'image/jpeg',
                  name: 'image' + new Date() + '.jpg',
                });
            check == 'video' &&
              data1.append('thumbnil', {
                uri: thumb,
                type: 'image/jpeg',
                name: 'image' + new Date() + '.jpg',
              });
            data1.append('description', email);
            data1.append('location', pass);
            createPosts({Auth: userData.token}, data1).then(res => {
              console.log('res1', res);
              if (res.status == 'success') {
                setShowModal(!showModal);
                navigation.navigate('Home');
              } else {
                setShowModal(!showModal);
                Alert.alert('Some thing went wrong');
              }
            });
            //
          }}
          title={'UPLOAD'}
        />
      </View>
      {myModal()}
    </View>
  );
};
export default addCaption;
