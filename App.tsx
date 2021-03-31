import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { login } from './screens/login';
import { register } from './screens/register';
import { home } from './screens/homescreen';
import { account } from './screens/account';
import { createListing } from './screens/createListing';
import { showListing } from './screens/showListings';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { styles, colors } from './screens/style';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { useFonts, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { editAccount } from './screens/editAccount';


const Tab = createMaterialBottomTabNavigator();
const AccountStack = createStackNavigator();
const loginStack = createStackNavigator();
const ListingsStack = createStackNavigator();

function AccountNavigator({ route }) {
  console.log(route.params.setIsAuthed)
  return (
    <AccountStack.Navigator headerMode={"none"}>
      <AccountStack.Screen name="account" component={account} initialParams={{ setIsAuthed: route.params.setIsAuthed }} />
      <AccountStack.Screen name="editAccount" component={editAccount} />
    </AccountStack.Navigator>
  );
}

function LoginNavigator({ route }) {
  console.log(route.params.setIsAuthed)
  return (
    <AccountStack.Navigator headerMode={"none"}>
      <AccountStack.Screen name="login" component={login} initialParams={{ setIsAuthed: route.params.setIsAuthed }} />
      <AccountStack.Screen name="register" component={register} />
    </AccountStack.Navigator>
  );
}

function ListingsNavigator() {
  return (
    <AccountStack.Navigator headerMode={"none"}>
      <AccountStack.Screen name="showListing" component={showListing} />
      <AccountStack.Screen name="createListing" component={createListing} />
    </AccountStack.Navigator>
  );
}

const App = () => {
  const [IsAuthed, setIsAuthed] = useState(false);
  const getData = async () => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      if (token) setIsAuthed(true);
    } catch (e) {
      // error reading value
    }
  }
  useEffect(() => {
    getData();
  }, []);

  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
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
              <MaterialCommunityIcons name="home" color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name="showListing"
          component={ListingsNavigator}
          options={{
            tabBarLabel: "Listings",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="post" color={color} size={22} />
            ),
          }}
        />
        {!IsAuthed ? (
          <Tab.Screen
            name="login"
            component={LoginNavigator}
            initialParams={{ setIsAuthed: setIsAuthed }}
            options={{
              tabBarLabel: 'Login',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={22} />
              ),
            }}
          />
        ) :
          <Tab.Screen
            name="account"
            component={AccountNavigator}
            initialParams={{ setIsAuthed: setIsAuthed }}
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={22} />
              ),
            }}
          />
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;