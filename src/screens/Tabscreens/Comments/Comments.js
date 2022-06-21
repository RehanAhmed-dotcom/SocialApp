import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
} from 'react-native';
import Colors from '../../../../Colors';
import {useDispatch, useSelector} from 'react-redux';
import {addComments, showComments} from '../../../lib/api';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome';
const Comments = ({navigation, route}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const {id} = route.params;
  useEffect(() => {
    showComments({Auth: userData.token, id}).then(res => {
      console.log('res', res);
      setComments(res.comments.reverse());
    });
  }, [comment]);
  // console.log(id);
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
        <Text
          style={{
            color: 'white',
            marginLeft: 10,
            fontSize: 18,
            // fontFamily: 'Poppins-Medium',
          }}>
          Comments
        </Text>
      </View>
      <ScrollView>
        {comments.map((item, index) => (
          <View
            key={index + 'a'}
            style={{paddingHorizontal: 20, marginBottom: 20, marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={
                  item.user_image
                    ? {uri: item.user_image}
                    : require('../../../assets/images/placeholder.png')
                }
                style={{height: 50, width: 50, borderRadius: 25}}
              />
              <View style={{marginLeft: 10}}>
                <View style={{}}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      // fontFamily: 'Poppins-Medium',
                    }}>
                    {item.user_name}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>{item.comment}</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#ccc',
                      fontSize: 14,
                      // fontFamily: 'Poppins-Medium',
                    }}>
                    {item.created_at}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            backgroundColor: 'white',
            height: 50,
            borderRadius: 25,
            bottom: 20,
          }}>
          <TextInput
            placeholder={'Add a comment...'}
            value={comment}
            onChangeText={text => setComment(text)}
            placeholderTextColor="#ccc"
            style={{color: 'black', flex: 1}}
          />
          <TouchableOpacity
            onPress={() =>
              comment &&
              addComments({Auth: userData.token, comment, post_id: id}).then(
                res => {
                  console.log('res', res);
                  setComment('');
                },
              )
            }>
            <Icon1 name="send-o" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Comments;
