import React, {Component, useState} from 'react';
import { ImageBackground, StyleSheet, Text, View,TextInput, TouchableOpacity, Alert, AsyncStorage } from "react-native";
import { styles } from './style';




export const login = ({ navigation }) => {
    const saveToken = async (token) => {
        try {
            console.log(token)
          await AsyncStorage.setItem('userToken', token);
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = () => {
        fetch('http://157.245.176.240/login', {
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
              if(json.token != "false"){
                navigation.navigate('home');
                saveToken(json.token);
              }
                
          })
          .catch((error) => {
            console.error(error);
          });
      };
    return (
        <View style={styles.container}>
        <ImageBackground source={require('../assets/images/books.jpg')} style={styles.image}>
          <View style={styles.login}>
          <Text style={styles.title}>Book Heroes</Text>
          <TextInput
            style={styles.input}
            onChangeText={username => setUsername(username)}
            placeholder="Username"
            defaultValue={username}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            onChangeText={password => setPassword(password)}
            placeholder="Password"
            defaultValue={password}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <View style={styles.row}>
          <TouchableOpacity
            style={[styles.loginButton, styles.customerLogin]}
            onPress={login}
          >
            <Text style={styles.loginButtonText}>Login</Text>
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
  