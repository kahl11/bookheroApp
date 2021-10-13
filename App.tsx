import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { login } from "./screens/login";
import { register } from "./screens/register";
import { home } from "./screens/homescreen";
import { account } from "./screens/account";
import { createListing } from "./screens/createListing";
import { showListing } from "./screens/showListings";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { styles, colors } from "./styles/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Rubik_400Regular, Rubik_500Medium } from "@expo-google-fonts/rubik";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { editAccount } from "./screens/editAccount";
import { PostPageContext, authContext } from "./constants/context";
import { individualListing } from "./screens/individualListing";
import { chat } from "./screens/chat";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const AccountStack = createStackNavigator();
const loginStack = createStackNavigator();
const ListingsStack = createStackNavigator();

function AccountNavigator(setIsAuthed: Function) {
  return (
    <AccountStack.Navigator headerMode={"none"}>
      <AccountStack.Screen
        name="account"
        component={account}
        initialParams={{ setIsAuthed: setIsAuthed }}
      />
      <AccountStack.Screen name="editAccount" component={editAccount} />
    </AccountStack.Navigator>
  );
}

function LoginNavigator({ setIsAuthed }: any) {
  // console.log(setIsAuthed)
  return (
    <AccountStack.Navigator headerMode={"none"}>
      <AccountStack.Screen
        name="login"
        component={login}
        initialParams={{ setIsAuthed: setIsAuthed }}
      />
      <AccountStack.Screen name="register" component={register} />
    </AccountStack.Navigator>
  );
}

function ListingsNavigator() {
  const [postPage, setPostPage] = useState(0);
  return (
    <PostPageContext.Provider value={{ postPage, setPostPage }}>
      <AccountStack.Navigator headerMode={"none"}>
        <AccountStack.Screen name="showListing" component={showListing} />
        <AccountStack.Screen name="createListing" component={createListing} />
        <AccountStack.Screen
          name="individualListing"
          component={individualListing}
        />
      </AccountStack.Navigator>
    </PostPageContext.Provider>
  );
}

function Tabs() {
  const {authenticated} = useContext(authContext);
  return (
    <Tab.Navigator
      activeColor={colors.main}
      inactiveColor={colors.accent}
      barStyle={{ backgroundColor: "#121212" }}
      labeled={true}
      shifting={false}
    >
      <Tab.Screen
        name="home"
        component={home}
        options={{
          tabBarLabel: "Home",
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
      {!authenticated ? (
        <Tab.Screen
          name="login"
          component={LoginNavigator}
          options={{
            tabBarLabel: "Login",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={22} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="account"
          component={AccountNavigator}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={22} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const getData = async () => {
    try {
      let token = await AsyncStorage.getItem("userToken");
      if (token) setAuthenticated(true);
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Rubik_400Regular,
    Rubik_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator headerMode={"none"}>
          <Stack.Screen name={"mainStack"} component={Tabs} />
          <Stack.Screen name="chat" component={chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </authContext.Provider>
  );
};

export default App;
