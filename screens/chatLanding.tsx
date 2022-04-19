import * as React from "react";
import { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { QueryClientProvider } from "react-query";
import { ENDPOINT } from "@env";
import { styles } from "../styles/style";
import { touchable_styles } from "../styles/touchable_styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { chatContext } from "../constants/context";
import { getMessages } from "../js/MessageHelpers";

const axios = require("axios").default;

interface chat {
  user: string;
}

const ChatListElement = (props: {
  chatUser: string;
  navigation: any;
  index: number;
}) => {
  const [recent, setRecent] = useState<string[]>(["", ""]);
  useEffect(() => {
    AsyncStorage.getItem("userToken").then((token) => {
      console.log(token)
      axios
        .get(
          `${ENDPOINT}/getMostRecentMessage?userToken=${token}&partner=${props.chatUser}`
        )
        .then((response : any) => {
          setRecent(response.data);
        }, (error : any) => {
        setRecent(["", ""]);}
        );
    });
  }, []);

   
  const { chatId, setChatId } = useContext(chatContext);
  return (
    <TouchableOpacity
      key={props.index}
      style={styles.chatListElement}
      onPress={() => {
        setChatId(props.chatUser);
        props.navigation.navigate("chat");
      }}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{props.chatUser[0].toUpperCase()}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", marginLeft: 20, flex: 1 }}>
          <Text style={[styles.text_white, { fontSize: 20 }]}>
            {props.chatUser}
          </Text>
          <Text style={[styles.text_white, { color: "#8f8f8f" }]}>
            {recent[0]}
          </Text>
        </View>
        <View style={{ width: 100, marginRight: 50, paddingTop: 5 }}>
          <Text style={[styles.text_white, { fontSize: 12, color: "#8f8f8f" }]}>
            {recent[1]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );   
};

export const chatLanding = ({ navigation }) => {
  const { chatId, setChatId } = useContext(chatContext);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    getMessages();
    if (chatId) {
      navigation.navigate("chat");
    }
    AsyncStorage.getItem("userToken").then((token) => {
      axios
        .get(`${ENDPOINT}/getChats?userToken=${token}`)
        .then((response: any) => {
          setChats(response.data);
        });
    });
  }, []);
  return (
    <React.Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={styles.container}>
        <View style={[styles.container_header, {}]}>
          <Text style={styles.title_header}>Messages</Text>
        </View>
        <View>
          {chats.map((chat, index) => {
            return (
              <ChatListElement
                key={index}
                chatUser={chat}
                navigation={navigation}
                index={index}
              />
            );
          })}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
