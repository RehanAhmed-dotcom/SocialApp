import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  Modal,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Colors from '../../../../Colors';
import {EditProfile} from '../../../lib/api';
import {useSelector, useDispatch} from 'react-redux';
import Input from '../../../components/inputField';
// import {Post} from '../../../lib/api';
import Button from '../../../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import {update} from '../../../redux/actions';
import Icon1 from 'react-native-vector-icons/AntDesign';
const EditProfiles = ({navigation}) => {
  //   const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const [contact, setContact] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [about, setAbout] = useState('');
  const [img, setImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const {userData} = useSelector(({USER}) => USER);
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
  useEffect(() => {
    setFirst(userData.user.first_name);
    setLast(userData.user.last_name);
    setContact(userData.user.contact_no);
    setImg(userData.user.image);
    setAbout(userData.user.about);
  }, []);
  console.log('check', userData);
  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImg(image.path);
    });
  };
  console.log(userData.token);
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
            <Icon1 name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              // fontFamily: 'Poppins-Medium',
              marginLeft: 10,
            }}>
            Profile
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Icon name="bell" size={23} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            //   backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:10,
            marginBottom:5
          }}>
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{
              height: 100,
              width: 100,
              // backgroundColor: 'red',
              borderRadius: 75,
            }}>
            <Image
              source={
                img ? {uri: img} : require('../../../assets/images/holder.png')
              }
              style={{height: '100%', width: '100%', borderRadius: 75}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, paddingHorizontal: 20}}>
          <Input
            placeholder={'First Name'}
            style={{marginVertical: 12}}
            value={first}
            onChangeText={setFirst}
            secure={null}
            RightIcon={() => null}
          />
          <Input
            placeholder={'Last Name'}
            style={{marginVertical: 12}}
            value={last}
            onChangeText={setLast}
            secure={null}
            RightIcon={() => null}
          />
          <Input
            placeholder={'Contact Number'}
            style={{marginVertical: 12}}
            value={contact}
            onChangeText={setContact}
            secure={null}
            RightIcon={() => null}
          />
          <Input
            placeholder={'About'}
            style={{marginVertical: 12, height: 80}}
            value={about}
            // multiLine={true}÷\
            onChangeText={setAbout}
            secure={null}
            RightIcon={() => null}
          />

          <View style={{marginTop: 100}}>
            <Button
              title={'UPDATE'}
              onPress={() => {
                setShowModal(!showModal);
                // if (contact) {
                const data1 = new FormData();
                {
                  img != null &&
                    data1.append('image', {
                      uri: img,
                      type: 'image/jpeg',
                      name: 'image' + new Date() + '.jpg',
                    });
                }
                data1.append('first_name', first);
                data1.append('last_name', last);
                data1.append('contact_no', contact);
                data1.append('about', about);
                EditProfile({Auth: userData.token}, data1).then(res => {
                  console.log('ressee', res);
                  if (res.status == 'success') {
                    setShowModal(!showModal);
                    update(res.message)(dispatch);
                    navigation.navigate('Profile');
                  } else {
                    setShowModal(!showModal);
                    Alert.alert('Something went wrong');
                  }
                });
                // }
                //  navigation.navigate('Profile')
              }}
              style={{marginBottom: 10}}
            />
          </View>
        </View>
      </ScrollView>
      {myModal()}
    </View>
  );
};
export default EditProfiles;
