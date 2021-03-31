import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, LogBox, Image } from "react-native";
import { styles } from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { white } from 'react-native-paper/lib/typescript/styles/colors';

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
        <View style={styles.container}>
            <View style={styles.container_header}>
                <Text style={styles.title_header}>Books</Text>
            </View>
            <TouchableOpacity
                style={[styles.wideButtonBlue]}
                onPress={() =>
                    navigation.navigate('createListing')
                }
            >
                <Text style={styles.loginButtonText}>Create Listing</Text>
            </TouchableOpacity>
        </View>
    );
};
