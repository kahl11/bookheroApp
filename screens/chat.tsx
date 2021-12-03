import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ListView,
} from "react-native";
import { styles } from "../styles/style";
import { TouchableButton } from "../constants/Components";
import { touchable_styles } from "../styles/touchable_styles";
import { chatContext } from "../constants/context";
import { getUserData } from "../js/getUserData";
import { ENDPOINT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMessages } from "../js/MessageHelpers";
import { ScrollView } from "react-native-gesture-handler";

var client: null | WebSocket = null;
const axios = require("axios").default;

export const chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [sendText, setSendText] = useState<null | string>(null);
  const [username, setUsername] = useState<undefined | string>("");
  let { chatId, setChatId } = useContext(chatContext);
  const messageRef = useRef({});

  messageRef.current = messages as any[];

  const sendConnect = async (partnerID: string) => {
    let data = await getUserData();
    setUsername(data?.username);
    client = new WebSocket("ws://157.245.176.240:8020");
    client.onopen = () => {
      if (client)
        client.send(
          JSON.stringify({
            type: "CONNECTION",
            message: { id: data?.username, partner: partnerID },
          })
        );
    };
    client.onerror = (e) => {
      console.log("ERROR: ", e);
    };
    client.onmessage = (message) => {
      console.log("MESSAGE: ", message);
      if (message.data !== "Connected") {
        let messageObject = JSON.parse(message.data);
        if (messageObject.type === "MESSAGE") {
          setMessages([
            ...(messageRef.current as any[]),
            { message: messageObject.message, postion: "received" },
          ]);
        }
      }
    };
  };

  useEffect(() => {
    sendConnect(chatId);
    getMessages().then(() => {
      AsyncStorage.getItem("messages").then((m) => {
        if (m) {
          m = JSON.parse(m);
          //@ts-ignore
          for (let i of m[chatId]) {
            setMessages([
              ...(messageRef.current as any[]),
              { message: i[0], position: i[1] == chatId ? "sent" : "received" },
            ]);
          }
        }
      });
    });
  }, [chatId]);
  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={[styles.container]}>
        <View style={[styles.container_header_row, {}]}>
          <View style={[styles.avatar, { marginRight: 5, marginBottom: 10 }]}>
            <Text style={[styles.avatarText]}>{chatId[0].toUpperCase()}</Text>
          </View>
          <Text style={[styles.title_header, { marginLeft: 5 }]}>{chatId}</Text>
        </View>
        <View style={[{ flexDirection: "column", height: "100%" }]}>
          <ScrollView style={[{ flexGrow: 1 }]}>
            {messages.map((message: any, index) => {
              console.log("message: ", message);
              return (
                <View
                key={index}
                  style={
                    message.position == "sent"
                      ? styles.messageSent
                      : styles.messageReceived
                  }
                >
                  <TouchableOpacity style={styles.chatBubble}>
                    <Text key={index}>{message.message}</Text>
                    {message.position == "received" ? (
                      <>
                        <View style={styles.rightArrow}></View>
                        <View style={styles.rightArrowOverlap}></View>
                      </>
                    ) : (
                      <>
                        <View style={styles.leftArrow}></View>
                        <View style={styles.leftArrowOverlap}></View>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
          <View style={[{height: "20%", flexDirection: "row"}]}>
            <TextInput
              style={[styles.input, {width: "75%", marginTop: 10, height: 50}]}
              onChangeText={(value) => setSendText(value)}
              placeholder="Message"
            />
            <TouchableOpacity
              style={[touchable_styles.halfButtonDark, {width: "20%", marginTop: 10, height: 50, paddingTop: 18}]}
              onPress={() => {
                axios.post(`${ENDPOINT}/postMessage`, {
                  sender: username,
                  receiver: chatId,
                  message: sendText,
                });
                if (sendText)
                  setMessages([
                    ...(messageRef.current as any[]),
                    { message: sendText, position: "sent" },
                  ]);
                if (client) {
                  client.send(
                    JSON.stringify({
                      type: "MESSAGE",
                      message: sendText,
                    })
                  );
                } else {
                  console.log("No client found");
                }
              }}
            >
              <Text style={touchable_styles.lightText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};
