import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Modal,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';
import ImagePicker from 'react-native-image-crop-picker';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Button from '../../../components/Button';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../../Colors';
const AddpostEmpty = ({navigation}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const [pic, setPic] = useState('');
  const [thumb, setThumb] = useState('');
  const [check, setCheck] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const choosePic = type => {
    console.log('type', type);
    type == 'camera'
      ? ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {
          // setPic(image.path);
          console.log('i set camera');
        })
      : type == 'video'
      ? ImagePicker.openPicker({
          mediaType: 'video',
        }).then(video => {
          console.log('i set video');
          setPic(video.path);
          // createThumbnail({
          //   url: video.path,
          //   timeStamp: 100,
          // })
          // .then(responce => {
          //   console.log(setThumb(responce.path));
          // })
          // .catch(err => console.log({err}));
          // console.log(video);
        })
      : console.log('Image picker');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPic(image.path);
      console.log('i set pic');
    });
  };
  const myModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: '40%',
            width: '90%',
            backgroundColor: Colors.maincolor,
            borderRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: 10,
              marginTop: 10,
            }}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Icon1 name="circle-with-cross" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, paddingHorizontal: 10, justifyContent: 'center'}}>
            <Button
              title={'Video'}
              onPress={() => {
                choosePic('video');
                setModalVisible(!modalVisible);
                setCheck('video');
              }}
            />
            <View style={{marginTop: 20}} />
            <Button
              title={'Picture'}
              onPress={() => {
                choosePic('picture');
                setModalVisible(!modalVisible);
                setCheck('image');
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

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
          elevation: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          shadowColor: 'white',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          //   elevation: 2
        }}>
        <Text style={{color: 'white', fontSize: 18}}>Add post </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView>
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
              <Icon1 name="cross" size={25} color="white" />
              <TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    // fontFamily: 'Poppins-Regular',
                    marginLeft: 10,
                  }}>
                  New post
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('addCaption', {
                  picture: pic && pic,
                  check,
                  thumb,
                })
              }>
              <Icon2 name="arrowright" size={25} color="white" />
            </TouchableOpacity>
          </View>
          {!pic ? (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                height: 250,
                width: '100%',
                // backgroundColor: 'white',
                marginTop: 10,
                alignItems: 'center',
                shadowColor: 'white',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 5,
                backgroundColor: Colors.maincolor,
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../assets/images/downloadplaceholder.png')}
                style={{width: 150, height: 150}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                height: 250,
                width: '100%',
                // backgroundColor: 'red',
                marginTop: 10,
              }}>
              <Image
                source={
                  pic
                    ? {uri: pic}
                    : require('../../../assets/images/images.jpg')
                }
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              paddingHorizontal: 20,
            }}>
            <View></View>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                Gallery
              </Text>
              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                }}
                onPress={() => setShow(!show)}>
                <Icon2
                  name={!show ? 'down' : 'up'}
                  size={15}
                  color="white"
                  // style={{marginLeft: 10}}
                />
              </TouchableOpacity>
            </View> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  choosePic('camera');
                  setCheck('image');
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ccc',
                  height: 35,
                  width: 35,
                  marginLeft: 10,
                  // paddingVertical: 5,
                  // paddingHorizontal: 10,
                  borderRadius: 20,
                }}>
                <Icon2 name="camerao" color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {myModal()}
    </View>
  );
};

export default AddpostEmpty;

const styles = StyleSheet.create({});
