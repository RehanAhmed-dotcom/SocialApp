import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View, Platform} from 'react-native';
import Colors from '../../../../Colors';
import InputField from '../../../components/inputField';
import Button from '../../../components/Button';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import {updatePassword} from '../../../lib/api';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
const ChangePassword = ({navigation}) => {
  const [pass, setPass] = useState('');
  const [passErr, setPassErr] = useState('');
  const [conPassErr, setConPassErr] = useState('');

  const [conPass, setConPass] = useState('');
  const [oldErr, setOldErr] = useState('');

  const [old, setOld] = useState('');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show1, setShow1] = useState(false);
  const {userData} = useSelector(({USER}) => USER);
  useEffect(() => {
    navigation.setOptions({
      title: 'Forget password',
      headerTitleStyle: {
        right: 10,
        fontSize: 18,
        // fontFamily: 'Poppins-Medium',
        color: Colors.whitecolor,
      },
      headerTintColor: Colors.whitecolor,
      headerStyle: {
        backgroundColor: Colors.maincolor,
        elevation: 2,
      },
    });
  }, []);
  return (
    <View style={styles.container}>
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
            Change Password{' '}
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon2 name="bell" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.subcontainer}>
        <Text
          style={{
            fontSize: 16,
            // fontFamily: 'Poppins-Regular',
            marginLeft: 6,
            color: Colors.whitecolor,
            paddingVertical: 15,
            // marginTop: 15,
          }}>
          Please enter your new Password
        </Text>
        <InputField
          value={old}
          secure={true}
          error={oldErr}
          errorFix={setOldErr}
          //   style={(backgroundColor = 'red')}
          style={{
            // marginVertical: 12,
            borderWidth: 1,
            borderColor: oldErr ? 'red' : Colors.whitecolor,
          }}
          show={show2}
          onChangeText={setOld}
          RightIcon={() => (
            <TouchableOpacity onPress={() => setShow2(!show2)}>
              <Icon name="eye" color={!show2 ? 'black' : '#1473E6'} size={25} />
            </TouchableOpacity>
          )}
          placeholder={'Old password'}
        />
        <View style={{height: 20}} />
        <InputField
          value={pass}
          secure={true}
          error={passErr}
          errorFix={setPassErr}
          style={{
            // marginVertical: 12,
            borderWidth: 1,
            borderColor: passErr ? 'red' : Colors.whitecolor,
          }}
          //   style={backgroundColor: 'red'}
          show={show}
          onChangeText={setPass}
          RightIcon={() => (
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Icon name="eye" color={!show ? 'black' : '#1473E6'} size={25} />
            </TouchableOpacity>
          )}
          placeholder={'New password'}
        />
        <View style={{height: 20}} />
        <InputField
          RightIcon={() => (
            <TouchableOpacity onPress={() => setShow1(!show1)}>
              <Icon name="eye" color={!show1 ? 'black' : '#1473E6'} size={25} />
            </TouchableOpacity>
          )}
          value={conPass}
          error={conPassErr}
          errorFix={setConPassErr}
          secure={true}
          style={{
            // marginVertical: 12,
            borderWidth: 1,
            borderColor: conPassErr ? 'red' : Colors.whitecolor,
          }}
          show={show1}
          onChangeText={setConPass}
          placeholder={'Confirm new password'}
        />
        <View style={{marginTop: 100}}>
          <Button
            title={'UPDATE'}
            onPress={() => {
              if (pass.length >= 6 && conPass.length >= 6 && old.length >= 6) {
                if (pass != conPass) {
                  setPassErr('asd');
                  setConPassErr('asd');
                } else if (pass.length < 6) {
                  Alert.alert('Password must be greater then 5 characters');
                } else {
                  updatePassword({
                    Auth: userData.token,
                    password: old,
                    new_password: pass,
                    confirm_password: conPass,
                  }).then(res => {
                    console.log('res', res);
                    if (res.status == 'success') {
                      navigation.navigate('Profile');
                    }
                  });
                }
              } else {
                if (!pass && !conPass && !old) {
                  setPassErr('sdf');
                  setConPassErr('sd');
                  setOldErr('asdd');
                } else if (!old) {
                  setOldErr('ad');
                } else if (!pass) {
                  setPassErr('ds');
                } else if (!conPass) {
                  setConPassErr('sdf');
                }
              }
            }}
          />
        </View>
      </View>
      {/* <View style={styles.btmcontainer}>

            </View> */}
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.maincolor,
  },
  subcontainer: {
    // flex: 3,
    paddingHorizontal: 12,
    backgroundColor: Colors.maincolor,
    marginTop:Platform.OS==='ios'?20:0
  },
});
