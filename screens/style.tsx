import React, {Component, useState} from 'react';
import { ImageBackground, StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback } from "react-native";
import { color } from 'react-native-reanimated';

export const colors = { 
    button_pink: "#FF99C9",
    button_blue: "#6564DB",
    background_dark: "#121212",
    accent_dark: "#212121",
    accent_blue: "#89D2DC",
    accent_pink: "#DD7596"
  }

const verticalSpace = 15

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: colors.accent_dark
    },
    container_middle_align: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: colors.accent_dark
    },
    container_header: {
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: colors.background_dark,
      borderBottomWidth: 2,
      borderBottomColor: colors.accent_blue
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    title: {
      paddingTop: 30,
      color: "white",
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase"
    },
    title_header: {
      color: "white",
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
      alignSelf: "center"
    },
    login: {
      backgroundColor: "rgba(50,50,50,0.7)",
      marginLeft: "10%",
      marginRight: "10%",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      borderRadius: 3
  
    },
    input: {
      marginTop: verticalSpace,
      width: "80%",
      backgroundColor: "white",
      height: 40,
      borderRadius: 3,
      paddingLeft: 10,
    },
    halfInput: {
        marginTop: verticalSpace,
        width: "38%",
        marginRight: "2%",
        backgroundColor: "white",
        height: 40,
        borderRadius: 3,
        paddingLeft: 10,
      },
    loginButton: {
      marginLeft: "2%",
      marginRight: "2%",
      width: "38%",
      height: 40,
      textAlign: "center",
      textAlignVertical: "center",
      paddingTop: 12,
      borderRadius: 3,
      marginBottom: 50
    },
    registerButton: {
        marginLeft: "2%",
        marginRight: "2%",
        width: "38%",
        height: 40,
        textAlign: "center",
        textAlignVertical: "center",
        paddingTop: 12,
        borderRadius: 3,
        marginBottom:"10%"
      },
    loginButtonText: {
      fontWeight: "600",
      color: "#fefefe",
      textTransform: "uppercase",
      fontSize: 12,
      textAlign: "center"
    },
    register:{
      marginBottom: 50,
      width: "80%",
      backgroundColor: "grey"
    },
    row: {
      flexDirection:'row',
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
    },
    rowLeft: {
      flexDirection:'row',
      alignItems: "center",
      width: "100%",
      justifyContent: "flex-start",
    },
    heroLogin:{
      backgroundColor: colors.button_blue
    },
    customerLogin: {
      backgroundColor: colors.button_pink
    },
    header:{
        marginTop: 50,
        color: "white",
        fontSize: 20
    },
    dropdown:{
        marginTop: verticalSpace,
        width: "80%",
        height: 40,
        marginBottom: 10
    },
    text:{ 
        marginTop: verticalSpace,
        color:"white",
        fontWeight: "600"
    },
    status:{
        color:"white"
    },
    logo_header:{
      height:50,
      width:50,
      alignSelf: "center",
      marginLeft: 20,

    },
    logo:{
      height:200,
      width:200,
      alignSelf: "center",

    },
    wideButtonPink: {
      alignSelf: "center",
      backgroundColor: colors.button_pink,
      marginTop: "2%",
      marginLeft: "2%",
      marginRight: "2%",
      width: "80%",
      height: 40,
      textAlign: "center",
      textAlignVertical: "center",
      paddingTop: 12,
      borderRadius: 3,
      marginBottom: 10
    },
    wideButtonBlue: {
      alignSelf: "center",
      backgroundColor: colors.button_blue,
      marginTop: "2%",
      marginLeft: "2%",
      marginRight: "2%",
      width: "80%",
      height: 40,
      textAlign: "center",
      textAlignVertical: "center",
      paddingTop: 12,
      borderRadius: 3,
      marginBottom: 10
    },
    password:{
      marginBottom: 20
    },
    dropdown_school:{
      marginBottom: 10
    },
    listing_button:{
      marginTop:20
    }
  });