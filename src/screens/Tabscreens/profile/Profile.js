import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  View,
} from 'react-native';
import {usersProfile} from '../../../lib/api';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {logoutuser} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../../../Colors';
const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(({USER}) => USER);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      usersProfile({Auth: userData.token, id: userData.user.id}).then(res => {
        setProfile(res.profile);
        console.log('profile', res.profile);
      });
    });
    return unsubscribe;
  }, [navigation]);
  console.log(userData);
  console.log('imgskjdhfjsd', userData);
  const tabBarHeight = useBottomTabBarHeight();
  const renderItem1 = ({item}) => (
    <>
      {item.image ? (
        <View
          style={{
            height: 150,
            width: '33%',
            // marginBottom: tabBarHeight,
            borderWidth: 0.5,
            borderColor: '#ccc',
            marginVertical: 1,
            marginRight: 1,
            // backgroundColor: 'red',
            // marginTop: 10,
            // backgroundColor: 'white',
            // alignItems:"center",justifyContent:"center",
            // paddingHorizontal: 10,
            // borderRadius: 15,

            // marginLeft: 10,
            // justifyContent: 'center',
          }}>
          <Image
            source={{uri: item.image}}
            style={{width: '100%', height: '100%'}}
          />
          {/* {show && (
            <View
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red',
                height: 150,
                width: '100%',
              }}>
              <Icon1 name="play" size={20} color="white" />
            </View>
          )} */}
        </View>
      ) : (
        <View
          style={{
            height: 150,
            width: '33%',
            // marginBottom: tabBarHeight,
            borderWidth: 0.5,
            borderColor: '#ccc',
            marginVertical: 1,
            marginRight: 1,
          }}>
          <Image
            source={require('../../../assets/images/notAvalible.jpg')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      )}
    </>
  );
  const renderItem = ({item}) => (
    <>
      {item.video ? (
        <View
          style={{
            height: 150,
            width: '33%',
            // marginBottom: tabBarHeight,
            borderWidth: 0.5,
            borderColor: '#ccc',
            marginVertical: 1,
            marginRight: 1,
            // backgroundColor: 'red',
            // marginTop: 10,
            // backgroundColor: 'white',
            // alignItems:"center",justifyContent:"center",
            // paddingHorizontal: 10,
            // borderRadius: 15,

            // marginLeft: 10,
            // justifyContent: 'center',
          }}>
          <Image
            source={{uri: item.thumbnil}}
            style={{width: '100%', height: '100%'}}
          />

          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
              height: 150,
              width: '100%',
            }}>
            <Icon1 name="play" size={20} color="white" />
          </View>
        </View>
      ) : (
        <View
          style={{
            height: 150,
            width: '33%',
            // marginBottom: tabBarHeight,
            borderWidth: 0.5,
            borderColor: '#ccc',
            marginVertical: 1,
            marginRight: 1,
            // backgroundColor: 'red',
            // marginTop: 10,
            // backgroundColor: 'white',
            // alignItems:"center",justifyContent:"center",
            // paddingHorizontal: 10,
            // borderRadius: 15,

            // marginLeft: 10,
            // justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/images/notAvalible.jpg')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      )}
    </>
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
        <Text style={{color: 'white', fontSize: 18}}>Profile </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Icon name="bell" size={23} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logoutuser(false)(dispatch)}>
            <Icon2
              name="poweroff"
              size={15}
              style={{marginLeft: 10}}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 15,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('List', {type: 'following'})}
            style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>
              {profile.Follow ? profile.Follow : 0}
            </Text>
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                // fontFamily: 'Poppins-Regular',
              }}>
              Following
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              // borderWidth: 1,
              // borderColor: '#ccc',
              // borderRadius: 20,
            }}>
            <Image
              source={
                Object.keys(profile).length == 0
                  ? require('../../../assets/images/holder.png')
                  : profile?.user_data[0]?.image
                  ? {uri: profile?.user_data[0]?.image}
                  : require('../../../assets/images/holder.png')
              }
              style={{
                height: '100%',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                width: '100%',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('List', {type: 'follower'})}
            style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>{profile.Followers}</Text>
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                // fontFamily: 'Poppins-Regular',
              }}>
              Followers
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: 'white'}}>{userData.user.first_name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={{
                width: 80,
                marginTop: 10,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                backgroundColor: 'white',
              }}>
              <Text style={{}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}
              style={{
                // width: 80,
                marginTop: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                marginLeft: 10,
                backgroundColor: 'white',
              }}>
              <Text style={{}}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: 'white',
              marginTop: 10,
              // fontFamily: 'Poppins-Regular',
            }}>
            {userData.user.about}
          </Text>
        </View>
        <View
          style={{marginTop: 20, flexDirection: 'row', paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => setShow(false)}
            style={{width: '50%', alignItems: 'center'}}>
            <Text
              style={{
                color: !show ? 'white' : 'grey',
                // fontFamily: 'Poppins-Regular',
              }}>
              Images
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{width: '50%', alignItems: 'center'}}>
            <Text
              style={{
                color: show ? 'white' : 'grey',
                // fontFamily: 'Poppins-Regular',
              }}>
              Videos
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          {show ? (
            <FlatList
              data={profile.video_upload}
              renderItem={renderItem}
              numColumns={3}
              keyExtractor={item => item}
            />
          ) : (
            <FlatList
              data={profile.images_upload}
              renderItem={renderItem1}
              numColumns={3}
              keyExtractor={item => item}
            />
          )}
        </View>
      </ScrollView>
      {/* <View style={{height: 50}}></View> */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
