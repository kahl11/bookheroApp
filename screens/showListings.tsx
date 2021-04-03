import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, LogBox, Image } from "react-native";
import { styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { Fragment } from 'react';
import { SafeAreaView } from 'react-native';

const listingCell = ({ postingId }) => {
    return (
        <View style={styles.CellOutter}>
            <View style={styles.CellInner}>

            </View>
        </View>
    );
}

export const showListing = ({ navigation }) => {
    return (
        <Fragment>
        <SafeAreaView style={styles.background}/>
        <SafeAreaView style={styles.container}>
            <View style={styles.container_header}>
                <Text style={styles.title_header}>Books</Text>
            </View>
            <TouchableOpacity
                style={[touchable_styles.wideButtonBlue]}
                onPress={() =>
                    navigation.navigate('createListing')
                }
            >
                <Text style={touchable_styles.loginButtonText}>Create Listing</Text>
            </TouchableOpacity>
            </SafeAreaView>
    </Fragment>
    );
};
