// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import loginAndsignup from '../../screens/authscreens/loginAndsignup';
import Forgot from '../../screens/authscreens/Forgotpass';
import Codescreen from '../../screens/authscreens/codescreen';
import Newpassword from '../../screens/authscreens/Newpassword';
import Notification from '../../screens/Tabscreens/notification/Notification';
import Chat from '../../screens/Tabscreens/Chat/Chat';
import TabsNav from '../TabsNav/Index';
import {useSelector} from 'react-redux';
import {navigationRef} from '../../config/NavigationService';
import ChangePassword from '../../screens/Tabscreens/profile/ChangePassword';
import EditProfiles from '../../screens/Tabscreens/profile/EditProfile';
import Videos from '../../screens/Tabscreens/Video/Videos';
import Explore from '../../screens/Tabscreens/Explore/Explore';
import List from '../../screens/Tabscreens/Lists/List';
import ExploreTemp from '../../screens/Tabscreens/Explore/ExploreTemp';
import userProfile from '../../screens/Tabscreens/userProfile/userProfile';
import addCaption from '../../screens/Tabscreens/addposts/addCaption';
import Comments from '../../screens/Tabscreens/Comments/Comments';
const Stack = createStackNavigator();

const inDex = () => {
  const {isLoggedIn} = useSelector(({USER}) => USER);
  // console.log('a', isLoggedIn);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={TabsNav}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Notification"
              options={{headerShown: false}}
              component={Notification}
            />
            <Stack.Screen
              name="addCaption"
              component={addCaption}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="userProfile"
              component={userProfile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Explore"
              component={Explore}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfiles}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Videos"
              component={Videos}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ExploreTemp"
              component={ExploreTemp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Chat"
              options={{headerShown: false}}
              component={Chat}
            />
             <Stack.Screen
              name="List"
              options={{headerShown: false}}
              component={List}
            />
            <Stack.Screen
              name="Comments"
              options={{headerShown: false}}
              component={Comments}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="loginAndsignup"
              component={loginAndsignup}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Forgot" component={Forgot} />
            <Stack.Screen name="Code" component={Codescreen} />
            <Stack.Screen name="Newpassword" component={Newpassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default inDex;
