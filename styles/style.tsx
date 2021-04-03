import { Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback } from "react-native";
import { color } from 'react-native-reanimated';

export const colors = {
  button_pink: "#FF99C9",
  button_blue: "#6564DB",
  background_dark: "#121212",
  accent_dark: "#212121",
  accent_blue: "#89D2DC",
  accent_pink: "#DD7596",
  accent_light_grey: "#353536",
}

const verticalSpace = 15


export const styles = StyleSheet.create({
  background:{
    flex: 0,
    backgroundColor: colors.background_dark,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.accent_dark,
    fontFamily: "Montserrat_400Regular"
  },
  container_middle_align: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: colors.accent_dark
  },
  container_horizontal_middle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.accent_dark,
    alignItems: "center"
  },
  container_header: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.background_dark,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent_blue,
    marginBottom: 10,
    alignItems: "center",
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
    letterSpacing: 1,
    color: "white",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    alignSelf: "center",
    marginBottom: 10,
  },
  upper_case: {
    textTransform: "uppercase"
  },
  text_white: {
    color: "white",
    fontFamily: "Montserrat_600SemiBold",
    letterSpacing: 1
  },
  input: {
    marginTop: verticalSpace,
    width: "80%",
    backgroundColor: "white",
    height: 40,
    borderRadius: 3,
    paddingLeft: 10,
  },
  tallInput: {
    marginTop: verticalSpace,
    width: "80%",
    backgroundColor: "white",
    height: 120,
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
  row: {
    flexDirection: 'row',
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  header: {
    marginTop: 50,
    color: "white",
    fontSize: 20
  },
  dropdown: {
    marginTop: verticalSpace,
    width: "80%",
    height: 40,
    marginBottom: 10
  },
  text: {
    marginTop: verticalSpace,
    color: "white",
    fontWeight: "600"
  },
  status: {
    color: "red",
    fontSize: 14,
    width: "100%",
    textAlign: "center"
  },
  logo_header: {
    height: 50,
    width: 50,
    alignSelf: "center",
    marginLeft: 20,

  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: "center",

  },
  password: {
    marginBottom: 20
  },
  dropdown_school: {
    marginBottom: 10
  },
  listing_button: {
    marginTop: 20
  },

});