import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Rubik_400Regular, Rubik_500Medium } from "@expo-google-fonts/rubik";
import React, { Component, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { color } from "react-native-reanimated";

export const colors = {
  background_dark: "#121212",
  background_grey: "#171717",
  dark: "#212121",
  main: "#bbf299",
  main_disabled: '#cfe3c3',
  accent: "#007366",
  blue_grey: "#0C0E12",
  off_white: "#E0E0E0",
};

const verticalSpace = 15;

export const styles = StyleSheet.create({
  background: {
    flex: 0,
    backgroundColor: colors.background_dark,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.dark,
    fontFamily: "Rubik_400Regular",
  },
  container_middle_align: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: colors.dark,
  },
  container_horizontal_middle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  container_header: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.background_dark,
    alignItems: "center",
    justifyContent: "center",
  },
  container_header_row:{
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.background_dark,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    width: '100%'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    paddingTop: 30,
    color: colors.off_white,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  title_header: {
    letterSpacing: 1,
    color: "white",
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  upper_case: {
    textTransform: "uppercase",
  },
  text_white: {
    color: "white",
    fontFamily: "Rubik_400Regular",
    letterSpacing: 1,
  },
  input: {
    marginTop: verticalSpace,
    width: "80%",
    backgroundColor: colors.off_white,
    height: 40,
    borderRadius: 3,
    paddingLeft: 10,
    shadowOffset: { height: 5, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.3,
  },
  tallInput: {
    marginTop: verticalSpace,
    width: "80%",
    backgroundColor: colors.off_white,
    height: 120,
    borderRadius: 3,
    paddingLeft: 10,
    shadowOffset: { height: 5, width: 0 },
    shadowColor: "black",
    shadowOpacity: 0.3,
  },
  halfInput: {
    marginTop: verticalSpace,
    width: "38%",
    marginRight: "2%",
    backgroundColor: colors.off_white,
    height: 40,
    borderRadius: 3,
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  header: {
    marginTop: 50,
    color: colors.off_white,
    fontSize: 20,
  },
  dropdown: {
    marginTop: verticalSpace,
    width: "80%",
    height: 40,
    marginBottom: 10,
  },
  text: {
    marginTop: verticalSpace,
    color: colors.off_white,
    fontWeight: "600",
    letterSpacing: 0.06,
    fontFamily: "Rubik_400Regular",
  },
  status: {
    color: "red",
    fontSize: 14,
    width: "100%",
    textAlign: "center",
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
    marginBottom: 20,
  },
  dropdown_school: {
    marginBottom: 10,
  },
  listing_button: {
    marginTop: 20,
  },
  listingContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  individualListingContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.dark,
    fontFamily: "Rubik_400Regular",
  },
  individualListingText: {
    fontFamily: "Rubik_400Regular",
    color: colors.off_white,
    fontSize: 14,
  },
  individialListingDesc: {
    backgroundColor: colors.blue_grey,
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    minHeight: 40,
  },
  chatListElement: {
    width: "100%",
    padding: 10,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.background_dark,
    borderBottomWidth: 2,
    backgroundColor: colors.background_grey,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "600",
  },
  messageReceived: {
    width: "100%",
    alignItems: "flex-end",
    height: 50,
    marginTop: 3,
    marginBottom: 3,
    paddingRight: 20,
  },
  messageSent: {
    width: "100%",
    alignItems: "flex-start",
    height: 50,
    marginTop: 3,
    marginBottom: 3,
    paddingLeft: 10,
  },
  chatBubble: {
    backgroundColor: colors.main,
    padding: 10,
    borderRadius: 10,
  },
  rightArrow: {
    position: "absolute",
    backgroundColor: colors.main,
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: colors.dark,
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },

  leftArrow: {
    position: "absolute",
    backgroundColor: colors.main,
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 25,
    left: -10,
  },

  leftArrowOverlap: {
    position: "absolute",
    backgroundColor: colors.dark,
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomRightRadius: 18,
    left: -20,
  },
});
