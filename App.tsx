import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { login } from './screens/login';
import { register } from './screens/register';
import { home } from './screens/homescreen';
import { account } from './screens/account';
import { create_listing } from './screens/create_listing';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { styles, colors } from './screens/style';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react';


const Tab = createMaterialBottomTabNavigator();

const App = () => {
  let token = localStorage.getItem('userToken');//this needs to block because it effects what we render
  console.log(token);
  let authed = false;
  if(token) authed = true;
  const [IsAuthed, setIsAuthed] = useState(authed)
  return (
    <NavigationContainer>
      <Tab.Navigator
      activeColor={colors.accent_pink}
      inactiveColor={colors.accent_blue}
      barStyle={{ backgroundColor: "#121212" }}
      labeled={true}
      shifting={false}
      >
      <Tab.Screen
          name="home"
          component={home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        {!IsAuthed ? (
        <Tab.Screen
          name="login"
          component={login}
          initialParams={{setIsAuthed: setIsAuthed}}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
        ) : 
        <Tab.Screen
          name="account"
          component={account}
          initialParams={{setIsAuthed: setIsAuthed}}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
        }
        <Tab.Screen
          name="create_listing"
          component={create_listing}
        />
        <Tab.Screen 
        name="register"
        component={register} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;