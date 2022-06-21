import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import Colors from '../../../Colors';
import {login} from '../../lib/api';
import {logged} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Input from '../../components/inputField';
import Icon from 'react-native-vector-icons/Entypo';
import Button from '../../components/Button';
const Loginscreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const validateEmail = emailC => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <View style={styles.container}>
      <Input
        placeholder={'Email Address'}
        error={emailErr}
        errorFix={setEmailErr}
        style={{
          marginVertical: 12,
          borderWidth: 1,
          borderColor: emailErr ? 'red' : Colors.whitecolor,
        }}
        value={email}
        onChangeText={setEmail}
        secure={null}
        RightIcon={() => null}
      />
      <Input
        placeholder={'Password'}
        value={pass}
        secure={true}
        error={passErr}
        errorFix={setPassErr}
        show={show}
        onChangeText={setPass}
        style={{
          marginVertical: 12,
          borderWidth: 1,
          borderColor: passErr ? 'red' : Colors.whitecolor,
        }}
        RightIcon={() => (
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Icon name="eye" color={!show ? 'black' : '#1473E6'} size={25} />
          </TouchableOpacity>
        )}
      />
      <Text
        onPress={() => navigation.navigate('Forgot')}
        style={styles.forgotText}>
        Forgot password?
      </Text>
      <View style={{marginTop: 100}}>
        <Button
          title={'LOGIN'}
          onPress={() => {
            if (validateEmail(email) && pass) {
              login({email, password: pass}).then(res => {
                console.log('Login', res);
                if (res.status == 'success') {
                  logged(res.message)(dispatch);
                } else {
                  Alert.alert('Wrong username or password');
                }
              });
            } else {
              if (!validateEmail(email) && !pass) {
                setEmailErr('asd');
                setPassErr('asd');
              } else if (!validateEmail(email)) {
                setEmailErr('asd');
              } else if (!pass) {
                setPassErr('asd');
              } else if (pass.length < 6) {
                Alert.alert('Password lenght should be 8 characters');
              }
            }
          }}
          style={{marginBottom: 10}}
        />
      </View>
    </View>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 12,
    backgroundColor: Colors.maincolor,
  },
  forgotText: {
    color: Colors.whitecolor,
    textAlign: 'right',
    marginRight: 10,
    bottom: 5,
    // fontFamily: 'Poppins-Medium',
  },
});
