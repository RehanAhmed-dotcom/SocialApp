import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../../Colors';
const Addpost = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.maincolor}}>
      <View
        style={{
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
        <Text style={{color: 'white'}}>Add pos </Text>
        <Icon name="bell" size={20} color="white" />
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
            <Icon1 name="cross" size={25} color="white" />
            <TouchableOpacity onPress={() => navigation.navigate('addCaption')}>
              <Text style={{color: 'white', marginLeft: 10}}>New post</Text>
            </TouchableOpacity>
          </View>
          <Icon2 name="arrowright" size={25} color="white" />
        </View>
        <View
          style={{
            height: 250,
            width: '100%',
            // backgroundColor: 'red',
            marginTop: 10,
          }}>
          <Image
            source={require('../../../assets/images/images.jpg')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Gallery</Text>
            <Icon2 name="up" size={15} color="white" style={{left: 10}} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ccc',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 20,
              }}>
              <Icon3
                name="checkbox-multiple-blank-outline"
                color="white"
                size={25}
              />
              <Text style={{color: 'white', marginLeft: 5}}>
                Select Multiple
              </Text>
            </View>
            <View
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
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              //   justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '30%',
                borderWidth: 0.5,
                borderColor: 'white',
                height: 100,
              }}>
              <Image
                source={require('../../../assets/images/download.jpg')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{
                width: '30%',
                borderWidth: 0.5,
                borderColor: 'white',
                height: 100,
              }}>
              <Image
                source={require('../../../assets/images/download.jpg')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{
                width: '30%',
                borderWidth: 0.5,
                borderColor: 'white',
                height: 100,
              }}>
              <Image
                source={require('../../../assets/images/download.jpg')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              //   justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '30%',
                borderWidth: 0.5,
                borderColor: 'white',
                height: 100,
              }}>
              <Image
                source={require('../../../assets/images/download.jpg')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{
                width: '30%',
                borderWidth: 0.5,
                borderColor: 'white',
                height: 100,
              }}>
              <Image
                source={require('../../../assets/images/download.jpg')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{
                width: '30%',
                borderWidth: 0.5,
                borderColor: 'white',
                height: 100,
              }}>
              <Image
                source={require('../../../assets/images/download.jpg')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              //   justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '30%',
                borderWidth: 0.5,
                borderColor: 'white',
                height: 100,
              }}>
              <Image
                source={require('../../../assets/images/download.jpg')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{
                width: '30%',
                borderWidth: 0.5,
                borderColor: 'white',
                height: 100,
              }}>
              <Image
                source={require('../../../assets/images/download.jpg')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View
              style={{
                width: '30%',
                borderWidth: 0.5,
                borderColor: 'white',
                height: 100,
              }}>
              <Image
                source={require('../../../assets/images/download.jpg')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Addpost;

const styles = StyleSheet.create({});
