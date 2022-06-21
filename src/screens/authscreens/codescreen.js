import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Colors from '../../../Colors';
import Button from '../../components/Button';
import {otp} from '../../lib/api';

const CodeScreen = ({navigation, route}) => {
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
  const {forgot} = route.params;
  // const { email } = route.params;
  // console.log('email', forgot);
  const [token, setValue] = useState('');
  const [valueErr, setValueErr] = useState('');
  const [codeErr, setCodeErr] = useState('');

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({token, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    token,
    setValue,
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.maincolor,
        paddingHorizontal: 12,
      }}>
      <View style={{paddingHorizontal: 8}}>
        <Text
          style={{
            color: Colors.whitecolor,
            fontSize: 16,
            // fontFamily: 'Poppins-Regular',
            letterSpacing: 0.3,
            // paddingVertical: 12,
            marginTop: 15,
          }}>
          Please enter your Verification Code
        </Text>
        <Text
          style={{
            color: Colors.grey,
            fontSize: 14,
            marginTop: 10,
            // fontFamily: 'Poppins-Regular',
            letterSpacing: 0.3,
          }}>
          We have send a verification code to your registered email ID.
        </Text>
      </View>
      <View style={{paddingHorizontal: 6, marginVertical: 10}}>
        <CodeField
          ref={ref}
          {...props}
          value={token}
          onChangeText={text => {
            valueErr ? setValueErr('') : null;
            codeErr ? setCodeErr('') : null;
            setValue(text);
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[
                symbol
                  ? styles.cellRoot
                  : valueErr
                  ? styles.cellRoot2
                  : styles.cirlecolor,
                isFocused && styles.focusCell,
              ]}>
              <Text
                style={[styles.cellText, {color: codeErr ? 'red' : 'grey'}]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={{marginTop: 100}}>
        {codeErr ? (
          <Text style={{color: 'red', textAlign: 'center'}}>{codeErr}</Text>
        ) : null}
      </View>

      <Button
        title={'Verify'}
        onPress={() => {
          console.log('email', token);
          if (token) {
            otp({token}).then(res => {
              if (res.status == 'success') {
                navigation.navigate('Newpassword', {forgot, token});
                console.log('res', res);
              } else {
                Alert.alert('Wrong OTP Entred');
              }
            });
          } else {
            setValueErr('asd');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 20},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    // lineHeight: 38,
    borderRadius: 50,
    borderBottomColor: 'red',
    borderWidth: 1,
    borderColor: Colors.whitecolor,
    fontSize: 24,
    // borderWidth: 1,
    // borderRadius: 50,
    // backgroundColor: 'red',
    // borderColor: 'black',
    textAlign: 'center',
  },
  focusCell: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.whitecolor,
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.whitecolor,
  },
  cellRoot2: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'red',
    // borderBottomWidth: 1,
  },
  cirlecolor: {
    width: 60,
    height: 60,
    backgroundColor: Colors.maincolor,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.whitecolor,
    // borderBottomWidth: 1,
  },
  cellText: {
    color: Colors.maincolor,
    fontSize: 25,
    textAlign: 'center',
    // fontFamily: 'Nunito-SemiBold',
  },
});

export default CodeScreen;
