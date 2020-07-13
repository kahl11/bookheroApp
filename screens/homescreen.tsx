import React, {Component, useState} from 'react';
import { ImageBackground, StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import { styles } from './style';




export const home = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <ImageBackground source={require('../assets/images/books.jpg')} style={styles.image}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.row}>
        <TouchableOpacity
            style={[styles.loginButton, styles.customerLogin]}
            onPress={() =>
                navigation.navigate('login')
              }
          >
            <Text style={styles.loginButtonText}>BACK</Text>
          </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
};
  