import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {register} from '../../lib/api';
import {logged} from '../../redux/actions';
import Colors from '../../../Colors';
import {useDispatch, useSelector} from 'react-redux';
import Input from '../../components/inputField';
import Icon from 'react-native-vector-icons/Entypo';
import Button from '../../components/Button';

const Signupscreen = ({navigation}) => {
  const {userImage} = useSelector(({CAL}) => CAL);
  console.log('imeegge', userImage);
  const [first, setFirst] = useState('');
  const [firstErr, setFirstErr] = useState('');
  const [lastErr, setLastErr] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [pass, setPass] = useState('');
  const [passErr, setPassErr] = useState('');
  const [ConPass, setConPass] = useState('');
  const [ConPassErr, setConPassErr] = useState('');
  const [Contact, setContact] = useState('');
  const [ContactErr, setContactErr] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [about, setAbout] = useState('');
  const dispatch = useDispatch();
  const USER = useSelector(({USER}) => USER);
  const {fcmtoken: fcm_token} = USER;
  const validateEmail = emailC => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailC.replace(/\s/g, ''),
    );
  };
  // console.log('fcm', fcm_token);
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
  return (
    <ScrollView style={styles.container}>
      <Input
        placeholder={'First Name'}
        style={{
          marginVertical: 12,
          borderWidth: 1,
          borderColor: firstErr ? 'red' : Colors.whitecolor,
        }}
        value={first}
        error={firstErr}
        errorFix={setFirstErr}
        onChangeText={setFirst}
        secure={null}
        RightIcon={() => null}
      />
      <Input
        placeholder={'Last Name'}
        secure={null}
        value={last}
        error={lastErr}
        errorFix={setLastErr}
        onChangeText={setLast}
        style={{
          marginVertical: 12,
          borderWidth: 1,
          borderColor: lastErr ? 'red' : Colors.whitecolor,
        }}
        RightIcon={() => null}
      />
      <Input
        secure={null}
        value={email}
        onChangeText={setEmail}
        error={emailErr}
        errorFix={setEmailErr}
        placeholder={'Email Address'}
        style={{
          marginVertical: 12,
          borderWidth: 1,
          borderColor: emailErr ? 'red' : Colors.whitecolor,
        }}
        RightIcon={() => null}
      />
      <Input
        secure={true}
        value={pass}
        onChangeText={setPass}
        error={passErr}
        errorFix={setPassErr}
        placeholder={'Password'}
        secure={true}
        show={show}
        style={{
          marginVertical: 12,
          borderWidth: 1,
          borderColor: passErr ? 'red' : Colors.whitecolor,
        }}
        RightIcon={() => (
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Icon name="eye" color={!show ? 'black' : 'blue'} size={25} />
          </TouchableOpacity>
        )}
      />
      <Input
        placeholder={'Confirm Password'}
        style={{
          marginVertical: 12,
          borderWidth: 1,
          borderColor: ConPassErr ? 'red' : Colors.whitecolor,
        }}
        value={ConPass}
        secure={true}
        error={ConPassErr}
        errorFix={setConPassErr}
        show={show1}
        onChangeText={setConPass}
        RightIcon={() => (
          <TouchableOpacity onPress={() => setShow1(!show1)}>
            <Icon name="eye" color={!show1 ? 'black' : '#1473E6'} size={25} />
          </TouchableOpacity>
        )}
      />
      <Input
        placeholder={'Contact number'}
        style={{
          marginVertical: 12,
          borderWidth: 1,
          borderColor: ContactErr ? 'red' : Colors.whitecolor,
        }}
        RightIcon={() => null}
        value={Contact}
        error={ContactErr}
        errorFix={setContactErr}
        secure={null}
        onChangeText={setContact}
      />
      <Input
        placeholder={'About'}
        style={{
          marginVertical: 12,
          borderWidth: 1,
          height: 100,
          borderColor: Colors.whitecolor,
        }}
        multiLine={true}
        RightIcon={() => null}
        value={about}
        onChangeText={setAbout}
      />
      <View style={{marginTop: 100}}>
        <Button
          title={'SIGN UP'}
          onPress={() => {
            console.log('email', email, 'number', Contact);
            if (
              first &&
              last &&
              validateEmail(email) &&
              pass &&
              ConPass &&
              Contact
            ) {
              if (pass != ConPass) {
                setPassErr('asd');
                setConPassErr('asd');
              } else {
                setShowModal(!showModal);
                const data = new FormData();
                data.append('first_name', first);
                data.append('last_name', last);
                data.append('email', email);
                data.append('password', pass);
                data.append('confirm_password', ConPass);
                data.append('contact_no', Contact);
                data.append('about', about);
                data.append('device_token', fcm_token);
                {
                  userImage &&
                    data.append('image', {
                      uri: userImage,
                      type: 'image/jpeg',
                      name: 'image' + new Date() + '.jpg',
                    });
                }
                register(data).then(res => {
                  console.log('res', res);
                  if (res) {
                    if (res.validaterror == 1) {
                      setShowModal(!showModal);
                      Alert.alert('Email not Avalible');
                    } else if (res.validaterror == 0) {
                      setShowModal(!showModal);
                      logged(res.message)(dispatch);
                    }
                  } else {
                    setShowModal(!showModal);
                    Alert.alert('Something went wrong');
                  }
                });
              }
            } else {
              if (
                !first &&
                !last &&
                !validateEmail(email) &&
                !pass &&
                !ConPass &&
                !Contact
              ) {
                setFirstErr('asd');
                setLastErr('asd');
                setEmailErr('asd');
                setConPassErr('asd');
                setPassErr('asd');
                setContactErr('asd');
                // setContactErr('asd');
              } else if (!first) {
                setFirstErr('asd');
              } else if (!last) {
                setLastErr('asd');
              } else if (!validateEmail(email)) {
                setEmailErr('asd');
              } else if (!pass) {
                setpassErr('asd');
              } else if (!ConPass) {
                setConPassErr('asd');
              } else if (!Contact) {
                setContactErr('asd');
              }
            }
          }}
        />
      </View>
      <View style={{height: 30}} />
      {myModal()}
    </ScrollView>
  );
};

export default Signupscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
    backgroundColor: Colors.maincolor,
  },
  forgotText: {
    color: Colors.whitecolor,
    textAlign: 'right',
    marginRight: 10,
  },
});
