import React, { Fragment, useEffect, useRef, useState } from "react";
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

var client: null | WebSocket = null;
export const chat = () => {
  const [myID, setMyID] = useState(1);
  const [partnerID, setParterID] = useState(2);
  const [messages, setMessages] = useState<string[]>([]);
  const [sendText, setSendText] = useState<null | string>(null);

  const messageRef = useRef({});
  messageRef.current = messages as string[];

  const sendConnect = (myID: number, partnerID: number) => {
    client = new WebSocket("ws://157.245.176.240:8020");
    client.onopen = () => {
      if (client)
        client.send(
          JSON.stringify({
            type: "CONNECTION",
            message: { id: myID, partner: partnerID },
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
          console.log(messageRef.current);
          setMessages([...(messageRef.current as string[]), messageObject.message]);
        }
      }
    };
  };
  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={[styles.individualListingContainer, { flex: 1 }]}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setMyID(parseInt(value))}
          placeholder="Client ID"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setParterID(parseInt(value))}
          placeholder="Partner ID"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[touchable_styles.halfButtonDark]}
          onPress={() => {
            sendConnect(myID, partnerID);
          }}
        >
          <Text style={touchable_styles.lightText}>Connect</Text>
        </TouchableOpacity>
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
