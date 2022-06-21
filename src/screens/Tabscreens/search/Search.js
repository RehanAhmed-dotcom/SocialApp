import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Text,
  View,
  Platform,
} from 'react-native';
import Colors from '../../../../Colors';
import {useDispatch, useSelector} from 'react-redux';
import {search} from '../../../lib/api';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
const Search = ({navigation}) => {
  const [filt, setFilt] = useState('');
  const {userData} = useSelector(({USER}) => USER);
  const [searchUser, setSearchUser] = useState('');
  const tabBarHeight = useBottomTabBarHeight();
  const [users, setUsers] = useState([]);
  const DATA = ['Traveling', 'Sports', 'Fashion', 'Trends', 'Nature'];
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      search({Auth: userData.token, title: searchUser}).then(res => {
        console.log('re', res);
        setUsers(res.posts);
      });
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    search({Auth: userData.token, title: searchUser}).then(res => {
      // console.log('reseee', res);
      setUsers(res.posts);
    });
  }, [searchUser]);
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setFilt(item);
        setSearchUser(item);
        // navigation.navigate('ExploreTemp');
      }}
      style={{
        height: 40,
        marginTop: 10,
        backgroundColor: filt == item ? '#1473E6' : 'white',
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
  const renderItem1 = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Explore', {
          id: item.id,
        })
      }
      style={{
        height: 150,
        width: '33%',
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
        source={
          item.image
            ? {uri: item.image}
            : require('../../../assets/images/download.jpg')
        }
        style={{width: '100%', height: '100%'}}
      />
    </TouchableOpacity>
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
        <Text
          style={{color: 'white', fontSize: 18,}}>
          Search
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 10}}>
        <View
          style={{
            backgroundColor: 'grey',
            paddingHorizontal: 15,
            height: 40,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon1 name="search1" size={15} color="#ccc" />
          <View>
          <TextInput
          style={{backgroundColor:'red'}}
            placeholder={'Search here'}
            placeholderTextColor="#ccc"
            value={searchUser}
            // textAlignVertical="center"
            onChangeText={text => {
              setSearchUser(text);
              search({Auth: userData.token, title: text}).then(res => {
                console.log('resep', res);
                setUsers(res.posts);
              });
            }}
            // textAlignVertical="bottom"
            style={{
              flex: 1,
              marginTop:Platform.OS==='ios'?0: 5,
              color: 'black',
              alignItems: 'center',
              // textAlign: 'left',
              height: '100%',
              // backgroundColor: 'red',
              paddingHorizontal: 10,
              // fontFamily: 'Poppins-Regular',
              justifyContent: 'center',
            }}
          />
          </View>
        </View>
        {/* <View style={{backgroundColor:'red'}}> */}
        <FlatList
          data={DATA}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          horizontal
          keyExtractor={item => item}
        />
        {/* </View> */}
      </View>
      <View style={{flex: 1, marginTop: 10}}>
        <FlatList
          data={users}
          renderItem={renderItem1}
          numColumns={3}
          keyExtractor={item => item.id}
          //   cont={{alignItems: 'center'}}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
