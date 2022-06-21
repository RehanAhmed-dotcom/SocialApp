import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Login from '../../screens/authscreens/Loginscreen';
import Signup from '../../screens/authscreens/signupscreen';
import React from 'react';
import {Text} from 'react-native';
import Colors from '../../../Colors';
const Tab = createMaterialTopTabNavigator();

const topTabs = () => {
  return (
    <Tab.Navigator
      //   indicatorStyle={{backgroundColor: 'white'}}
      tabBarOptions={{
        labelStyle: {fontSize: 16, color: Colors.whitecolor},
        style: {backgroundColor: Colors.maincolor},
        activeTintColor: Colors.whitecolor,
        inactiveTintColor: Colors.grey,
        indicatorStyle: {backgroundColor: 'white'},
      }}>
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: 'white',
                // fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Login
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Signup"
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: 'white',
                // fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Signup
            </Text>
          ),
        }}
        component={Signup}
      />
    </Tab.Navigator>
  );
};
export default topTabs;
