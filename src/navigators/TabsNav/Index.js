import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Tabscreens/home/Home';
import Addpost from '../../screens/Tabscreens/addposts/Addpost';
import Messages from '../../screens/Tabscreens/messages/Messages';
import Search from '../../screens/Tabscreens/search/Search';
import Profile from '../../screens/Tabscreens/profile/Profile';
import addCaption from '../../screens/Tabscreens/addposts/addCaption';
import AddPostEmpty from '../../screens/Tabscreens/addposts/AddPostEmpty';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {height} from '../../../../../React Native/counsalApp/src/constants/dimensions';
import Colors from '../../../Colors';
const Tab = createBottomTabNavigator();

const Hometab = createStackNavigator();
const Profiletab = createStackNavigator();
const Searchtab = createStackNavigator();
const Addposttab = createStackNavigator();
const Messagestab = createStackNavigator();
const HomesStack = () => {
  return (
    <Hometab.Navigator>
      <Hometab.Screen
        name={'Home'}
        options={{headerShown: false}}
        component={Home}
      />
    </Hometab.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Profiletab.Navigator>
      <Profiletab.Screen
        name={'Profile'}
        options={{headerShown: false}}
        component={Profile}
      />
    </Profiletab.Navigator>
  );
};
const SearchStack = () => {
  return (
    <Searchtab.Navigator>
      <Searchtab.Screen
        name={'Search'}
        options={{headerShown: false}}
        component={Search}
      />
    </Searchtab.Navigator>
  );
};
const AddpostStack = () => {
  return (
    <Addposttab.Navigator>
      {/* <Addposttab.Screen
        name={'Addpost'}
        options={{headerShown: false}}
        component={Addpost}
      /> */}

      <Addposttab.Screen
        name="AddPostEmpty"
        component={AddPostEmpty}
        options={{headerShown: false}}
      />
    </Addposttab.Navigator>
  );
};
const MessagesStack = () => {
  return (
    <Messagestab.Navigator>
      <Messagestab.Screen
        options={{headerShown: false}}
        name={'Messages'}
        component={Messages}
      />
    </Messagestab.Navigator>
  );
};

export default function App() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: Colors.maincolor,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomesStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? 'white' : '#1473E6'}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="search-outline"
              color={focused ? 'white' : '#1473E6'}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Addpost"
        component={AddpostStack}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({focused}) => (
            <MaterialIcon
              name="add-box"
              color={focused ? 'white' : '#1473E6'}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="message-bulleted"
              color={focused ? 'white' : '#1473E6'}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? 'white' : '#1473E6'}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
