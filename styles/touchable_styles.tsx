import { Rubik_400Regular, Rubik_500Medium } from '@expo-google-fonts/rubik';
import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback } from "react-native";
import { block, color } from 'react-native-reanimated';
import { colors } from './style';


const shadowWidth = 0;
const shadowHeight = 5;
const shadowColor = 'black';
const shadowOpacity = 0.3;

export const touchable_styles = StyleSheet.create({
    wideButtonDark: {
        alignSelf: "center",
        backgroundColor: colors.accent,
        marginTop: "2%",
        marginLeft: "2%",
        marginRight: "2%",
        width: "80%",
        height: 40,
        textAlign: "center",
        textAlignVertical: "center",
        paddingTop: 12,
        borderRadius: 3,
        marginBottom: 10,
        shadowOffset: { height: shadowHeight, width: shadowWidth },
        shadowColor: shadowColor,
        shadowOpacity: shadowOpacity,
    },
    wideButtonLight: {
        alignSelf: "center",
        backgroundColor: colors.main,
        marginTop: "2%",
        marginLeft: "2%",
        marginRight: "2%",
        width: "80%",
        height: 40,
        textAlign: "center",
        textAlignVertical: "center",
        paddingTop: 12,
        borderRadius: 3,
        marginBottom: 10,
        shadowOffset: { height: shadowHeight, width: shadowWidth },
        shadowColor: shadowColor,
        shadowOpacity: shadowOpacity,
    },
    register: {
        width: "80%",
        backgroundColor: colors.dark
    },
    darkText: {
        fontWeight: "600",
        color: "#0C0E12",
        textTransform: "uppercase",
        fontSize: 12,
        textAlign: "center",
    },
    lightText: {
        fontWeight: "600",
        color: "#fefefe",
        textTransform: "uppercase",
        fontSize: 12,
        textAlign: "center",
        fontFamily: 'Rubik_Rubik_500Medium'
    },
    halfButtonLight: {
        marginLeft: "2%",
        marginRight: "2%",
        width: "38%",
        height: 40,
        textAlign: "center",
        textAlignVertical: "center",
        paddingTop: 12,
        borderRadius: 3,
        shadowOffset: { height: shadowHeight, width: shadowWidth },
        shadowColor: shadowColor,
        shadowOpacity: shadowOpacity,
        backgroundColor: colors.main
    },
    halfButtonDark: {
        marginLeft: "2%",
        marginRight: "2%",
        width: "38%",
        height: 40,
        textAlign: "center",
        textAlignVertical: "center",
        paddingTop: 12,
        borderRadius: 3,
        shadowOffset: { height: 5, width: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        backgroundColor: colors.accent
    },
    login: {
        backgroundColor: colors.background_dark,
        marginLeft: "10%",
        marginRight: "10%",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    imageSelector: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: colors.blue_grey,
        marginTop: "2%",
        marginLeft: "2%",
        marginRight: "2%",
        width: "80%",
        height: 240,
        borderRadius: 3,
        marginBottom: 10,
        shadowOffset: { height: shadowHeight, width: shadowWidth },
        shadowColor: shadowColor,
        shadowOpacity: shadowOpacity,
    },
    imageSelectorText: {
        color: "white"
    },

    productRow: {
        width: '95%',
        marginLeft: '2.5%',
        marginBottom: 10,
        height: 140,
        shadowOffset: { height: shadowHeight, width: shadowWidth },
        shadowColor: shadowColor,
        shadowOpacity: shadowOpacity,
        backgroundColor: colors.blue_grey,
        borderRadius: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    productRowImage: {
        width: '100%',
        height:'100%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    productRowImageView: {
        width: '47.5%',
        height: '100%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    productRowTextView: {
        width: '47.5%',
        height: '100%'
    },
    productText: {
        fontWeight: "600",
        color: "#fefefe",
        textTransform: "uppercase",
        fontSize: 14,
        marginLeft: 20,
    },
    mapHolder:{
        width: '80%',
        height: 400,
        marginTop: 15,
        marginBottom: 20,
        alignContent: 'center'
    },
});