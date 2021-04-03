import { Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback } from "react-native";
import { color } from 'react-native-reanimated';
import { colors } from './style';

export const touchable_styles = StyleSheet.create({
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
    heroLogin: {
        backgroundColor: colors.button_blue
    },
    customerLogin: {
        backgroundColor: colors.button_pink
    },
    register: {
        marginBottom: 50,
        width: "80%",
        backgroundColor: "grey"
    },
    loginButtonText: {
        fontWeight: "600",
        color: "#fefefe",
        textTransform: "uppercase",
        fontSize: 12,
        textAlign: "center",
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
        marginBottom: "10%"
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
    imageSelector:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: colors.accent_light_grey,
        marginTop: "2%",
        marginLeft: "2%",
        marginRight: "2%",
        width: "80%",
        height: 240,
        borderRadius: 3,
        marginBottom: 10,
    },
    imageSelectorText:{
        color:"white"
    },
});