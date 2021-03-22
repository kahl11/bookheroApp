import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage, LogBox,Image } from "react-native";
import { styles } from './style';



export const create_listing = ({ navigation }) => {
  let token = localStorage.getItem('userToken')//this needs to block because it effects what we render
  console.log(token)
  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <Text style={styles.title_header}>Book Hero</Text>
      </View>
          
    </View>
  );
};
