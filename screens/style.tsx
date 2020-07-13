import React, {Component, useState} from 'react';
import { ImageBackground, StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback } from "react-native";

export const colors = { 
    pink: "#FF99C9",
    green: "#75D18E",
    black: "#363537",
    blue: "#5296A5",
    brown: "#F5CDA7"
  }

const verticalSpace = 15

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center"
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
      marginTop: "10%",
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
        marginTop: "10%",
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
    heroLogin:{
      backgroundColor: colors.pink
    },
    customerLogin: {
      backgroundColor: colors.green
    },
    header:{
        marginTop: 50,
        color: "white",
        fontSize: 20
    },
    dropdown:{
        marginTop: verticalSpace,
        width: "80%",
        height: 40
    },
    text:{ 
        marginTop: verticalSpace,
        color:"white",
        fontWeight: "600"
    },
    status:{
        color:"white"
    }
  });