import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../Colors';

const Button = ({title, extraStyle, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btnstyle, {...extraStyle}]}>
      <Text style={styles.textstyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
const styles = StyleSheet.create({
  btnstyle: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 50,
    backgroundColor: Colors.whitecolor,
  },
  textstyle: {
    fontSize: 18,
    // fontFamily: 'Poppins-SemiBold',
    color: Colors.maincolor,
    letterSpacing: 0.2,
  },
});
