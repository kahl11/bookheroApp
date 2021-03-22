import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage, LogBox, Image } from "react-native";
import { setConstantValue } from 'typescript';
import { styles } from './style';


export const home = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <Text style={styles.title_header}>Book Hero</Text>
      </View>
      <Image
        style={styles.logo}
        source={require('../assets/images/logoWhite.png')}
      />
      <TouchableOpacity
        style={[styles.wideButtonBlue,styles.listing_button]}
        onPress={() =>
          navigation.navigate('create_listing')
        }
      >
        <Text style={styles.loginButtonText}>Create Listing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.wideButtonPink}
        onPress={() =>
          navigation.navigate('register')
        }
      >
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
