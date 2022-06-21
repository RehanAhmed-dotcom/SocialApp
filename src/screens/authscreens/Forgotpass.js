import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert, Text, View} from 'react-native';
import Colors from '../../../Colors';
import Button from '../../components/Button';
import {submitEmail} from '../../lib/api';
import InputField from '../../components/inputField';
const Forgotpass = ({navigation}) => {
  const [forgot, setForgot] = useState('');
  const [emailErr, setEmailErr] = useState('');
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
  const validateEmail = emailC => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.Textstyle}>
          Enter your email to reset your password
        </Text>
        <View style={{marginTop: 15}} />
        <InputField
          value={forgot}
          error={emailErr}
          style={{
            borderWidth: 1,
            borderColor: emailErr ? 'red' : Colors.whitecolor,
          }}
          errorFix={setEmailErr}
          onChangeText={setForgot}
          placeholder={'intechsol@gmail.com'}
          RightIcon={() => null}
        />
        <View style={{marginTop: 100}}>
          <Button
            title={'Send'}
            onPress={() => {
              if (validateEmail(forgot)) {
                submitEmail({email: forgot}).then(res => {
                  console.log('res', res);
                  if (res.status == 'success') {
                    navigation.navigate('Code', {forgot});
                  } else {
                    Alert.alert('Email not registered');
                  }
                });
              } else {
                setEmailErr('asd');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Forgotpass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.maincolor,
  },
  subcontainer: {
    // flex: 3,
    // marginTop: 15,
    //    / paddingVertical: 0,
    backgroundColor: Colors.maincolor,
    paddingHorizontal: 12,
  },
  Textstyle: {
    fontSize: 16,
    marginTop: 15,
    paddingVertical: 0,
    // fontFamily: 'Poppins-Regular',
    marginLeft: 8,
    color: Colors.whitecolor,
  },
});
