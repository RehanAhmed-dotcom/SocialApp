import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../../Colors';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
const ExploreTemp = ({navigation}) => {
  const [filt, setFilt] = useState('');
  const DATA = ['All', 'Text1', 'Text2', 'Text3', 'Text4', 'Text5', 'Text6'];
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => setFilt(item)}
      style={{
        height: 40,
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: filt == item ? 'skyblue' : 'white',
        // alignItems:"center",justifyContent:"center",
        paddingHorizontal: 20,
        borderRadius: 25,
        minWidth: 50,
        alignItems: 'center',
        marginLeft: 10,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: filt == item ? 'white' : 'black',
          // fontFamily: 'Poppins-Regular',
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
  const renderItem1 = () => (
    <View style={{marginTop: 10}}>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/images/downloades.jpg')}
            style={{height: 50, width: 50, borderRadius: 25}}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('userProfile')}
            style={{marginLeft: 10}}>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'Poppins-Medium',
                fontSize: 15,
              }}>
              stevesmith.
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  // fontFamily: 'Poppins-Regular',
                }}>
                {' '}
                Follow
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <Icon1 name="dots-three-vertical" color="black" size={15} />
      </View>
      <View
        style={{
          height: 200,
          borderWidth: 0.5,
          borderColor: '#ccc',
          width: '100%',
          marginTop: 10,
        }}>
        <Image
          source={require('../../../assets/images/image.jpg')}
          style={{height: '100%', width: '100%'}}
        />
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            width: '100%',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Videos')}>
            <Icon3 name="play" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 10, paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icon2 name="like1" color="white" size={20} />
          <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
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
          Liked by johndoe and 504 others
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Comments')}
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
            John lorem ipsum dolar sit amet...
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            marginTop: 5,
            fontSize: 12,
            // fontFamily: 'Poppins-Regular',
          }}>
          12th May
        </Text>
      </View>
    </View>
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
        data={DATA}
        renderItem={renderItem}
        horizontal
        keyExtractor={item => item}
      />
      <FlatList
        data={['1', '2', '3']}
        renderItem={renderItem1}
        keyExtractor={item => item}
      />
    </View>
  );
};
export default ExploreTemp;
