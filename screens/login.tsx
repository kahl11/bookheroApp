import React, { Component, useContext, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "../styles/style";
import { touchable_styles } from "../styles/touchable_styles";
import { ENDPOINT } from "@env";
import { home } from "./homescreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Fragment } from "react";
import { SafeAreaView } from "react-native";
import { authContext } from "../constants/context";
const axios = require("axios").default;

export const login = ({ navigation }: { navigation: any }) => {
  const [status, setStatus] = useState("");
  const { setAuthenticated } = useContext(authContext);
  const saveToken = async (token: string) => {
    setAuthenticated(true);
    try {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("username", username);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    fetch(`${ENDPOINT}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.token != "false") {
          navigation.navigate("home");
          saveToken(json.token);
        } else {
          setStatus("Password or Username Incorrect");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container_middle_align}>
          <View style={touchable_styles.login}>
            <Text style={styles.title}>Book Heroes</Text>
            <TextInput
              style={styles.status}
              placeholder=""
              editable={false}
              onChangeText={(status) => setStatus(status)}
              defaultValue={status}
            />
            <TextInput
              style={styles.input}
              onChangeText={(username) => setUsername(username)}
              placeholder="Username"
              defaultValue={username}
              autoCapitalize="none"
            />
            <TextInput
              style={[styles.input, styles.password]}
              onChangeText={(password) => setPassword(password)}
              placeholder="Password"
              defaultValue={password}
              autoCapitalize="none"
              secureTextEntry={true}
              onSubmitEditing={login}
            />
            <TouchableOpacity
              style={[
                touchable_styles.halfButtonLight,
                touchable_styles.wideButtonLight,
              ]}
              onPress={login}
            >
              <Text style={touchable_styles.darkText}>Login</Text>
            </TouchableOpacity>
            <View style={[styles.row, { marginBottom: 40 }]}>
              <TouchableOpacity
                style={[touchable_styles.halfButtonLight]}
                onPress={() => navigation.navigate("home")}
              >
                <Text style={touchable_styles.lightText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[touchable_styles.halfButtonLight]}
                onPress={() => navigation.navigate("register")}
              >
                <Text style={touchable_styles.lightText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Fragment>
  );
};
