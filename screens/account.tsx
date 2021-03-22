import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage, Modal, Pressable } from "react-native";
import { styles } from './style';
import { ENDPOINT } from '@env';
import { home } from './homescreen';
import { MaterialCommunityIcons } from '@expo/vector-icons'




export const account = ({ route, navigation }) => {
    const [username, setUsername] = useState('');
    const [school, setSchool] = useState('');
    let userToken = localStorage.getItem('userToken');
    const unsubscribe = navigation.addListener('focus', () => {
        if(username == ""){
        fetch(`${ENDPOINT}/getUserData`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: userToken,
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
      });
  return (
    <View style={styles.container}>
    <View style={styles.container_header}>
      <Text style={styles.title_header}>Book Hero</Text>
    </View>
    <View style={styles.row}>
    
    <MaterialCommunityIcons name="account" color="#c0ffee" size={50} />
    <Text style={{color:"white"}}>{username}</Text>
    </View>
    <TouchableOpacity
      style={styles.wideButtonPink}
      onPress={() =>{
        AsyncStorage.removeItem("userToken");
        route.params.setIsAuthed(false);
      }
      }
    >
      <Text style={styles.loginButtonText}>Log out</Text>
    </TouchableOpacity>
  </View>
  );
};
