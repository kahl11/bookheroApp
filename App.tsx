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
import { useEffect, useState, useContext, useRef } from "react";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Rubik_400Regular, Rubik_500Medium } from "@expo-google-fonts/rubik";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { editAccount } from "./screens/editAccount";
import { PostPageContext, authContext, chatContext } from "./constants/context";
import { individualListing } from "./screens/individualListing";
import { chat } from "./screens/chat";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { Subscription } from "@unimodules/react-native-adapter";
import { Notification } from "expo-notifications";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const AccountStack = createStackNavigator();
const loginStack = createStackNavigator();
const ListingsStack = createStackNavigator();
const chatStack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

function chatNavigator() {
  return (
    <chatStack.Navigator headerMode={"none"}>
      <chatStack.Screen name="chat" component={chat} />
    </chatStack.Navigator>
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
  const { authenticated } = useContext(authContext);
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
        <>
          <Tab.Screen
            name="chat"
            component={chatNavigator}
            options={{
              tabBarLabel: "Chats",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chat" color={color} size={22} />
              ),
            }}
          />
          <Tab.Screen
            name="account"
            component={AccountNavigator}
            options={{
              tabBarLabel: "Account",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={22}
                />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [chatId, setChatId] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<Notification | boolean>(
    false
  );
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const getData = async () => {
    try {
      let token = await AsyncStorage.getItem("userToken");
      if (token) setAuthenticated(true);
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    registerForPushNotificationsAsync().then((expo_token) => {
      if (expo_token){
        setExpoPushToken(expo_token);
        console.log('token',expo_token);
      }
    });

    if (notificationListener) {
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      return () => {
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        }
      };
    }
  }, []);

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
      <chatContext.Provider value={{ chatId, setChatId }}>
        <NavigationContainer>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name={"mainStack"} component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </chatContext.Provider>
    </authContext.Provider>
  );
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default App;
