import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Colors from '../../Colors';

const inputField = ({
  placeholder,
  secure,
  value,
  show,
  onChangeText,
  style,
  RightIcon,
  error,
  errorFix,
  multiLine,
}) => {
  return (
    <View style={[styles.mainView, {...style}]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#8E9092'}
        textAlignVertical={multiLine == true ? 'top' : 'center'}
        secureTextEntry={show ? false : secure ? true : false}
        value={value}
        multiline={multiLine == true ? true : false}
        onChangeText={text => {
          onChangeText(text);
          error && errorFix('');
        }}
        style={{
          backgroundColor: Colors.whitecolor,
          // fontFamily: 'Poppins-Regular',
          fontSize: 15,
          // backgroundColor: 'red',
          height: '100%',
          letterSpacing: 0.3,
          // borderWidth: 1,
          // paddingTop: 10,
          // borderColor: error ? 'red' : Colors.maincolor,
          paddingLeft: 10,
          borderRadius: 50,
          color: 'black',
          width: '85%',
        }}
      />
      <RightIcon />
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.whitecolor,
    borderRadius: 50,
    height: 55,
    elevation: 2,
    // borderWidth: 1,
    // borderColor: error ? 'red' : Colors.maincolor,
    paddingHorizontal: 14,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default inputField;
