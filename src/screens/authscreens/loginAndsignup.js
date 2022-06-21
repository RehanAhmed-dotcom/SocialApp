import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Toptabs from '../../navigators/Toptabs/Index';
import {useRoute} from '@react-navigation/native';
import Colors from '../../../Colors';
import {images} from '../../redux/actions';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
const loginAndsignup = ({navigation}) => {
  const dispatch = useDispatch();

  const [pic, setPic] = useState('');
  const choosePic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPic(image.path);
      images(image.path)(dispatch);
    });
  };

  const route = useRoute();
  console.log('my route name', route?.state?.index);
  return (
    <View style={styles.container}>
      {route?.state?.index == 1 ? (
        <View style={styles.subcontainer}>
          <TouchableOpacity onPress={choosePic}>
            <Image
              source={
                pic ? {uri: pic} : require('../../assets/images/profile.png')
              }
              style={{height: 100, borderRadius: 50, width: 100}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              // fontFamily: 'Poppins-SemiBold',
              letterSpacing: 0.3,
              marginTop: 20,
              color: Colors.whitecolor,
              //   fontWeight: 'bold',
            }}>
            Welcome
          </Text>
        </View>
      ) : (
        <View style={styles.subcontainer}>
          <Image
            source={require('../../assets/images/Icon.png')}
            style={{height: 100, borderRadius: 50, width: 100}}
          />
        </View>
      )}
      <View style={styles.bottomcontainer}>
        <Toptabs />
      </View>
    </View>
  );
};

export default loginAndsignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.maincolor,
  },
  subcontainer: {
    flex: 2,
    backgroundColor: Colors.maincolor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomcontainer: {
    flex: 4,
    backgroundColor: Colors.maincolor,
  },
});
