import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import { colors, styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import { PROD_ENDPOINT } from '@env';
import { home } from './homescreen';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fragment } from 'react';
import { SafeAreaView } from 'react-native';



export const account = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');

  const [UserToken, setUserToken] = useState("");
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken')
        if(token !== null) {
          setUserToken(token);
          if (username == "") {
            fetch(`${PROD_ENDPOINT}/getUserData`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                token: token,
              })
            }).then((response) => response.json())
              .then((json) => {
                setUsername(json.username);
                setSchool(json.school)
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }else{
          console.log("token was nu")
        }
      } catch(e) {
        // error reading value
      }
    }
  getData();
  return (
    <Fragment>
    <SafeAreaView style={styles.background}/>
    <SafeAreaView style={styles.container}>
      <View style={styles.container_header}>
        <Text style={styles.title_header}>Profile</Text>
        <MaterialCommunityIcons name="account-circle" color={colors.accent_blue} size={90} />
        <Text style={[styles.text_white, styles.upper_case]}>{username}</Text>
      </View>
      <View style={styles.container_horizontal_middle}>
      <TouchableOpacity
          style={touchable_styles.wideButtonBlue}
          onPress={() => navigation.navigate('editAccount')}
        >
          <Text style={touchable_styles.loginButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={touchable_styles.wideButtonPink}
          onPress={() => {
            AsyncStorage.removeItem("userToken");
            route.params.setIsAuthed(false);
          }
          }
        >
          <Text style={touchable_styles.loginButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </Fragment>
  );
};
