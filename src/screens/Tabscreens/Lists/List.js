import React,{useEffect,useState} from 'react';
import {View,Text,Image, SafeAreaView,TouchableOpacity, FlatList} from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Colors from '../../../../Colors';
import {useSelector} from 'react-redux';
import {followList} from '../../../lib/api';
const List = ({navigation,route})=>{
  const [users,setUsers] = useState([]);
    const {type} = route.params;
    const {userData} = useSelector(({USER}) => USER);
   const number= 2;
    useEffect(()=>{
      followList({Auth:userData.token,type}).then(res=>{
        console.log("dfs",res);
        setUsers(res.data);
      })
    },[])
    const renderItem= ({item})=>(
      <View style={{flexDirection:"row",borderBottomWidth:1,borderBottomColor:"white", alignItems:"center",marginHorizontal:15,marginTop:10,}}>
      <Image source={type=="following"? item.user_2.image?{uri:item.user_2.image}: require("../../../assets/images/holder.png"):item.user_1.image?{uri:item.user_1.image}: require("../../../assets/images/holder.png")} style={{height:50,marginBottom:10, width:50,borderRadius:40}}/>
      <Text style={{color:"white",marginLeft:10,marginBottom:10}}>{type=="following"? item.user_2.first_name:item.user_1.first_name} {type=="following"? item.user_2.last_name:item.user_1.last_name}</Text>
      </View>
    )
    return(
        <SafeAreaView style={{flex:1,backgroundColor:Colors.maincolor}}>
            
            <View
        style={{
        //   marginTop:Platform.OS==='ios'?25:0,

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
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon2 name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              // fontFamily: 'Poppins-Medium',
              marginLeft: 10,
            }}>
            {type=="following"?"Following":"Followers"} List
          </Text>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" size={20} color="white" />
        </TouchableOpacity> */}
      </View>
      <View style={{flex:1}}>
        <FlatList 
      data={users}
        renderItem={renderItem}
        keyExtractor={item=>item.id}

        />
      </View>

        </SafeAreaView>
    )
}
export default List;