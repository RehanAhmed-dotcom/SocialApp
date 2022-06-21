import React, {useState, useRef, useEffect} from 'react';
import Colors from '../../../../Colors';
import {
  Image,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {senderMsg, recieverMsg} from '../../../lib/messageUtilis';
import database from '@react-native-firebase/database';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
const Chat = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const checkForUpdate = useRef(null);
  const {email, id, image, name} = route.params;
  console.log('e', image);
  const start = new Date();
  const iosFormat = start.toISOString();
  const emailToUniqueString = email => email.replace(/[^a-zA-Z0-9 ]/g, '');
  const {userData} = useSelector(({USER}) => USER);
  console.log('user');
  // console.log('reciever Email', email);
  // console.log('reciever image', image);
  // console.log('reciever name', name);

  // console.log('sender Email', emailToUniqueString(userData.user.email));
  // console.log(email);
  // console.log(userData.user.email);
  useEffect(() => {
    _getMessages();
    return () => {
      _getMessages();
    };
  }, []);
  useEffect(() => {
    updateChatCount();
    return () => {
      if (checkForUpdate.current) updateChatCount();
    };
  }, []);
  const updateChatCount = async () => {
    const thisUser = `user${emailToUniqueString(userData.user.email)}`;
    const thatUser = `user${emailToUniqueString(email)}`;
    console.log('USERS', {thisUser, thatUser});
    try {
      const refDB = database()
        .ref('roomList')
        .child(thisUser)
        .child(thatUser)
        .child('info');

      refDB.once('value', snapshot => {
        console.log('check', snapshot.val());
        const mesg = snapshot.val().messageInfo?.messageText;
        refDB.update({
          messageInfo: {
            counts: 0,
            messageText: mesg,
          },
        });
      });
    } catch (err) {
      console.log('err', err);
    }
  };
  const _getMessages = async () => {
    try {
      database()
        .ref('chatList')
        // .child('user`1`')
        .child(`user${emailToUniqueString(userData.user.email)}`)
        .child(`user${emailToUniqueString(email)}`)
        .child('message')
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            msgs.push({
              ...child.val(),
              _id: child.key,
            });
          });
          setMessages(msgs.reverse());
        });
    } catch (error) {}
  };
  const handleSend = (messages = []) => {
    // {"_id": "9c2e241b-1e0a-4630-af83-4e261ce68cc5", "createdAt": 2021-04-22T05:22:36.744Z, "text": "Ghhh", "user": {"_id": "user1"}}
    // console.log(messages);
    // if (messageText) {

    senderMsg(
      messages[0].text,
      userData.user.image,
      `user${emailToUniqueString(userData.user.email)}`,
      `user${emailToUniqueString(email)}`,
      messages[0].createdAt,
    )
      .then(() => {
        // setMessages((previousMessages) =>
        //   GiftedChat.append(previousMessages, messages),
        // );
        updateChat();
      })
      .catch(err => {
        console.log('He slient me!!!!!');
      });

    recieverMsg(
      messages[0].text,
      userData.user.image,
      `user${emailToUniqueString(userData.user.email)}`,
      `user${emailToUniqueString(email)}`,
      messages[0].createdAt,
    )
      .then(() => {
        updateChat1();
      })
      .catch(err => {});
    const updateChat = async () => {
      try {
        database()
          .ref(
            `roomList/user${emailToUniqueString(
              userData.user.email,
            )}/user${emailToUniqueString(email)}/info`,
          )
          .set({
            messageInfo: {
              counts: 0,
              messageText: messages[0].text,
            },

            name: name,
            date: iosFormat,
            image: image
              ? image
              : 'https://www.pngkey.com/png/detail/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png',
          })
          .then(() => {
            database()
              .ref(
                `roomList/user${emailToUniqueString(
                  email,
                )}/user${emailToUniqueString(userData.user.email)}/info`,
              )
              .once('value', snapshot => {
                const countss = snapshot?.val().messageInfo.counts;
                database()
                  .ref(
                    `roomList/user${emailToUniqueString(
                      email,
                    )}/user${emailToUniqueString(userData.user.email)}/info`,
                  )
                  .update({
                    messageInfo: {
                      counts: countss ? countss + 1 : 1,
                      messageText: messages[0].text,
                    },
                    name: userData.user.first_name,
                    date: iosFormat,
                    image: userData.user.image
                      ? userData.user.image
                      : 'https://www.pngkey.com/png/detail/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png',
                  });
              });
          });
      } catch (error) {
        console.log('ErrWhileUpdateing', error);
      }
    };
    const updateChat1 = async () => {
      try {
        database()
          .ref(
            `roomList/user${emailToUniqueString(
              email,
            )}/user${emailToUniqueString(userData.user.email)}/info`,
          )
          .set({
            messageInfo: {
              counts: 0,
              messageText: messages[0].text,
            },

            name: userData.user.first_name,
            date: iosFormat,
            image: userData.user.image
              ? userData.user.image
              : 'https://www.pngkey.com/png/detail/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png',
          })
          .then(() => {
            database()
              .ref(
                `roomList/user${emailToUniqueString(
                  userData.user.email,
                )}/user${emailToUniqueString(email)}/info`,
              )
              .once('value', snapshot => {
                const countss = snapshot?.val().messageInfo.counts;
                database()
                  .ref(
                    `roomList/user${emailToUniqueString(
                      userData.user.email,
                    )}/user${emailToUniqueString(email)}/info`,
                  )
                  .update({
                    messageInfo: {
                      counts: countss ? countss + 1 : 1,
                      messageText: messages[0].text,
                    },
                    name: name,
                    date: iosFormat,
                    image: image
                      ? image
                      : 'https://www.pngkey.com/png/detail/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png',
                  });
              });
          });
      } catch (error) {
        console.log('ErrWhileUpdateing', error);
      }
    };

    // setMessageText('');
    // } else {
    //   console.log('Waa ray');
    // }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.maincolor}}>
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
          //   justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('userProfile', {
              id,
              email,
              name,
              image,
            })
          }
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              image
                ? {uri: image}
                : require('../../../assets/images/holder.png')
            }
            style={{height: 30, marginLeft: 10, width: 30, borderRadius: 15}}
          />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              // fontFamily: 'Poppins-Medium',
              marginLeft: 10,
            }}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingHorizontal: 20, marginTop: 10}}>
        <GiftedChat
          messages={messages}
          // style={{
          //   borderRadius: 10,
          //   color: 'red',
          // }}
          // renderAvatar={()=>}
          // renderMessage={() => (
          //   <View
          //     style={{
          //       height: 30,
          //       marginBottom: 30,
          //       width: '100%',
          //       backgroundColor: 'red',
          //     }}></View>
          // )}
          renderInputToolbar={() => (
            <View
              style={{
                backgroundColor: 'white',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                borderRadius: 25,
                paddingHorizontal: 10,
              }}>
              <TextInput
                placeholder={'Enter here'}
                placeholderTextColor="#ccc"
                style={{flex: 1}}
                value={text}
                onChangeText={texts => setText(texts)}
              />
              <Icon1 name="send-o" size={20} onPress={() => handleSend(text)} />
            </View>
          )}
          // renderComposer={() => (
          //   <TextInput style={{color: 'black', width: '80%'}} />
          // )}
          onSend={messages => handleSend(messages)}
          user={{
            _id: `user${emailToUniqueString(userData.user.email)}`,
          }}
        />
        {/* <ScrollView>
          {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((item, index) => (
            <View key={index + 'a'}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'flex-end'}}>
                  <Image
                    source={require('../../../assets/images/downloades.jpg')}
                    style={{width: 30, height: 30, borderRadius: 20}}
                  />
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#1473E6',
                    borderTopLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    borderTopRightRadius: 25,
                    maxWidth: 250,
                    marginLeft: 10,
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
                    sldkfjsdlfkjsdlkfjlksdjflksdjfkljdfkljsdlkfjlksjflkjsdfkjsdkfjk
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderTopRightRadius: 25,
                    maxWidth: 250,
                    marginLeft: 10,
                    marginTop: 10,
                  }}>
                  <Text style={{color: 'black', fontFamily: 'Poppins-Regular'}}>
                    sldkfjsdlfkjsdlkfjlksdjflksdjfkljdfkljsdlkfjlksjflkjsdfkjsdkfjk
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView> */}
        {/* <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              backgroundColor: 'white',
              height: 50,
              borderRadius: 25,
              bottom: 20,
            }}>
            <TextInput
              placeholder={'Write your message here'}
              placeholderTextColor="#ccc"
              style={{color: 'black', fontFamily: 'Poppins-Regular', flex: 1}}
            />
            <Icon1 name="send-o" size={20} />
          </View>
        </View> */}
      </View>
    </View>
  );
};
export default Chat;
