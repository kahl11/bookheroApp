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
} from "react-native";
import { styles } from "../styles/style";
import { TouchableButton } from "../constants/Components";
import { touchable_styles } from "../styles/touchable_styles";
import { chatContext } from "../constants/context";
import { getUserData } from "../js/getUserData";
var client: null | WebSocket = null;
export const chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [sendText, setSendText] = useState<null | string>(null);
  const [username, setUsername] = useState("");
  let { chatId, setChatId } = useContext(chatContext);
  const messageRef = useRef({});

  messageRef.current = messages as string[];

  const sendConnect = async (partnerID: string) => {
    let data = await getUserData();
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
            ...(messageRef.current as string[]),
            messageObject.message,
          ]);
        }
      }
    };
  };

  useEffect(() => {
    sendConnect(chatId);
  }, [chatId]);
  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={[styles.individualListingContainer, { flex: 1 }]}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setSendText(value)}
          placeholder="Message"
        />
        <TouchableOpacity
          style={[touchable_styles.halfButtonDark]}
          onPress={() => {
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
        {messages.map((message, index) => {
          return (
            <Text style={styles.text_white} key={index}>
              {message}
            </Text>
          );
        })}
      </SafeAreaView>
    </Fragment>
  );
};
