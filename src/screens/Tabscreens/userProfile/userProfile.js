import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  Image,
  View,
} from 'react-native';
import {usersProfile, follow} from '../../../lib/api';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/Feather';
import Colors from '../../../../Colors';
import {useDispatch, useSelector} from 'react-redux';
const userProfile = ({navigation, route}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState({});
  const [column, setColumn] = useState(3);
  const {id, email, name, image} = route.params;
  // console.log(email);

  useEffect(() => {
    usersProfile({Auth: userData.token, id}).then(res => {
      setProfile(res.profile);
      console.log('userProfile', res.profile);
    });
  }, []);
  const renderItem1 = ({item}) => (
    <>
      {item.image ? (
        <View
          style={{
            height: 150,
            width: '33%',
            borderWidth: 0.5,
            borderColor: '#ccc',
            marginVertical: 1,
            marginRight: 1,
          }}>
          <Image
            source={{uri: item.image}}
            style={{width: '100%', height: '100%'}}
          />
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
  const renderItem = ({item}) => (
    <>
      {item.video ? (
        <View
          style={{
            height: 150,
            width: '30%',
            borderWidth: 0.5,
            borderColor: '#ccc',
            marginVertical: 1,
            marginRight: 1,
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
        // paddingBottom: tabBarHeight,
        backgroundColor: Colors.maincolor,
      }}>
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
              // fontFamily: 'Poppins-Medium',
              fontSize: 18,
              marginLeft: 10,
            }}>
            {Object.keys(profile).length == 0
              ? 'name'
              : profile.user_data[0].first_name}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={24} color="white" />
        </TouchableOpacity>
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
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>{profile.Follow}</Text>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'Poppins-Regular',
                marginTop: 10,
              }}>
              Following
            </Text>
          </View>
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
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>{profile.Followers}</Text>
            <Text
              style={{
                color: 'white',
                // fontFamily: 'Poppins-Regular',
                marginTop: 10,
              }}>
              Followers
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: 'white',}}>
            {Object.keys(profile).length == 0
              ? 'name'
              : profile.user_data[0].first_name}
          </Text>
          {id !== userData.user.id && (
            <View
              style={{
                width: '100%',
                //   height: 30,
                //   backgroundColor: 'red',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  follow({Auth: userData.token, user_2: id}).then(res => {
                    console.log(res);
                    if (res.Message == 'User Followed') {
                      Alert.alert('Started Following');
                      navigation.goBack();
                    } else {
                      Alert.alert('Un Followed');
                      navigation.goBack();
                    }
                  })
                }
                style={{
                  width: 100,
                  marginTop: 10,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  backgroundColor: 'white',
                }}>
                <Text style={{}}>
                  {profile.is_followed == false ? 'Follow' : 'Following'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Chat', {id, email, image, name})
                }
                style={{
                  width: 100,
                  marginTop: 10,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  marginLeft: 10,
                  backgroundColor: 'white',
                }}>
                <Text style={{}}>Message</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text
            style={{
              color: 'white',
              marginTop: 10,
              // fontFamily: 'Poppins-Regular',
            }}>
            Lorem ipsum dolor sit amet, consectetur
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: 10,
              // fontFamily: 'Poppins-Regular',
            }}>
            adipiscing elit
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
              key={column}
              renderItem={renderItem}
              horizontal={false}
              numColumns={column}
              keyExtractor={item => item.id}
            />
          ) : (
            <FlatList
              data={profile.images_upload}
              key={column}
              horizontal={false}
              renderItem={renderItem1}
              numColumns={column}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </ScrollView>
      {/* <View style={{height: 50}}></View> */}
    </View>
  );
};

export default userProfile;

const styles = StyleSheet.create({});
