import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import Colors from '../../../Colors';
import {changePassword} from '../../lib/api';
import InputField from '../../components/inputField';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/Entypo';
const Newpassword = ({navigation, route}) => {
  const [pass, setPass] = useState('');
  const [passErr, setPassErr] = useState('');
  const [conPassErr, setConPassErr] = useState('');
  const [conPass, setConPass] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
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
  const {forgot, token} = route.params;
  console.log('asd', pass.length, conPass.length);
  console.log('asd', pass, conPass);

  return (
    <View style={styles.container}>
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
          value={pass}
          secure={true}
          show={show}
          error={passErr}
          errorFix={setPassErr}
          style={{
            // marginVertical: 12,
            borderWidth: 1,
            borderColor: passErr ? 'red' : Colors.whitecolor,
          }}
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
          secure={true}
          error={conPassErr}
          errorFix={setConPassErr}
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
              console.log('come here');
              if (pass.length >= 6 && conPass.length >= 6) {
                if (pass != conPass) {
                  setPassErr('asd');
                  setConPassErr('asd');
                } else {
                  console.log('Even also come here');
                  changePassword({
                    email: forgot,
                    password: pass,
                    confirm_password: conPass,
                    token,
                  }).then(res => {
                    console.log('rse', res);
                    if (res.status == 'success') {
                      navigation.navigate('Login');
                    } else {
                      Alert.alert('Something went wrong');
                    }
                  });
                }
              } else {
                if (!pass && !conPass) {
                  setPassErr('sdf');
                  setConPassErr('sd');
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

export default Newpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.maincolor,
  },
  subcontainer: {
    // flex: 3,
    paddingHorizontal: 12,
    backgroundColor: Colors.maincolor,
  },
});
