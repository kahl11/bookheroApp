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
} from "react-native";
import { colors, styles } from "../styles/style";
import { touchable_styles } from "../styles/touchable_styles";
import { ENDPOINT } from "@env";
import { home } from "./homescreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fragment } from "react";
import { SafeAreaView } from "react-native";
import { authContext } from "../constants/context";
import { getUserData } from "../js/getUserData";

export const account = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [school, setSchool] = useState("");
  const { setAuthenticated } = useContext(authContext);
  const [UserToken, setUserToken] = useState("");
  const getData = async () => {
    let data = await getUserData();
    console.log(data)
    if (data) {
      setSchool(data.school);
      setUsername(data.username);
    }
  };
  getData();
  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={styles.container}>
        <View style={styles.container_header}>
          <Text style={styles.title_header}>Profile</Text>
          <MaterialCommunityIcons
            name="account-circle"
            color={colors.main}
            size={90}
          />
          <Text style={[styles.text_white, styles.upper_case]}>{username}</Text>
        </View>
        <View style={styles.container_horizontal_middle}>
          <TouchableOpacity
            style={touchable_styles.wideButtonLight}
            onPress={() => navigation.navigate("editAccount")}
          >
            <Text style={touchable_styles.darkText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={touchable_styles.wideButtonDark}
            onPress={() => {
              AsyncStorage.removeItem("userToken");
              setAuthenticated(false);
            }}
          >
            <Text style={touchable_styles.lightText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};
