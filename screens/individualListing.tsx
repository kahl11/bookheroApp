import React, { Component, useState, useRef, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, LogBox, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, AsyncStorage } from "react-native";
import { colors, styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import * as ImagePicker from 'expo-image-picker';
import { ENDPOINT } from '@env';
import * as Crypto from 'expo-crypto';
import { Fragment } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const individualListing = ({ navigation }: any) => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
    useEffect( () => {
        navigation.addListener('focus', () => {
            console.log("focused");
        })},[])
  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: colors.background_dark }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container_header}>
            <Text style={styles.title_header}></Text>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Fragment >
  );
};
