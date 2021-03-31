import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import { styles } from './style';
import { PROD_ENDPOINT } from '@env';
import { home } from './homescreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


export const login = ({ route, navigation }) => {
  const [status, setStatus] = useState('');
  const saveToken = async (token: string) => {
    route.params.setIsAuthed(true)
    console.log(token);
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    fetch(`${PROD_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((response) => response.json())
      .then((json) => {
        if (json.token != "false") {
          navigation.navigate('home');
          saveToken(json.token);
        } else {
          setStatus("Password or Username Incorrect");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container_middle_align}>
      <ImageBackground source={require('../assets/images/books-min.jpg')} style={styles.image}>
        <View style={styles.login}>
          <Text style={styles.title}>Book Heroes</Text>
          <TextInput
            style={styles.status}
            placeholder=""
            editable={false}
            onChangeText={status => setStatus(status)}
            defaultValue={status}
          />
          <TextInput
            style={styles.input}
            onChangeText={username => setUsername(username)}
            placeholder="Username"
            defaultValue={username}
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, styles.password]}
            onChangeText={password => setPassword(password)}
            placeholder="Password"
            defaultValue={password}
            autoCapitalize="none"
            secureTextEntry={true}
            onSubmitEditing={login}
          />
          <TouchableOpacity
            style={[styles.loginButton, styles.wideButtonPink]}
            onPress={login}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.loginButton, styles.heroLogin]}
              onPress={() =>
                navigation.navigate('home')
              }
            >
              <Text style={styles.loginButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.loginButton, styles.heroLogin]}
              onPress={() =>
                navigation.navigate('register')
              }
            >
              <Text style={styles.loginButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
function componentDidMount() {
  throw new Error('Function not implemented.');
}

