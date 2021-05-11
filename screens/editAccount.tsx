import React, { Component, Fragment, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import { colors, styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import { ENDPOINT } from '@env';
import { home } from './homescreen';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native';



export const editAccount = ({ route, navigation }) => {
    const [username, setUsername] = useState('');
    const [school, setSchool] = useState('');

    const [UserToken, setUserToken] = useState("");
    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            if (token !== null) {
                setUserToken(token);
                if (username == "") {
                    fetch(`${ENDPOINT}/getUserData`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: token,
                        })
                    }).then((response) => response.json())
                        .then((json) => {
                            setUsername(json.username);
                            setSchool(json.school)
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            } else {
                console.log("token was null")
            }
        } catch (e) {
            // error reading value
        }
    }
    getData();
    return (
        <Fragment>
        <SafeAreaView style={styles.background}/>
        <SafeAreaView style={styles.container}>
            <View style={styles.container_header}>
                <Text style={styles.title_header}>Profile</Text>
                <MaterialCommunityIcons name="account-circle" color={colors.accent} size={90} />
            </View>
            <View style={styles.container_horizontal_middle}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[touchable_styles.halfButtonLight]}
                        onPress={() =>
                            navigation.navigate('account')
                        }
                    >
                        <Text style={touchable_styles.lightText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[touchable_styles.halfButtonLight]}
                        onPress={() =>
                            navigation.navigate('account')
                        }
                    >
                        <Text style={touchable_styles.lightText}>done</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
    </Fragment>
    );
};
