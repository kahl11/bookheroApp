import { useNavigation } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { Fragment } from 'react';
import { SafeAreaView } from 'react-native';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage, LogBox, Image } from "react-native";
import { setConstantValue } from 'typescript';
import { styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'


export const home = ({ navigation }) => {

  return (
    <Fragment>
    <SafeAreaView style={styles.background}/>
    <SafeAreaView style={styles.container}>
      <View style={styles.container_header}>
        <Text style={styles.title_header}>Book Hero</Text>
      </View>
      <Image
        style={styles.logo}
        source={require('../assets/images/logoWhite.png')}
      />
      <TouchableOpacity
        style={[touchable_styles.wideButtonBlue,styles.listing_button]}
        onPress={() =>
          navigation.navigate('showListing')
        }
      >
        <Text style={touchable_styles.loginButtonText}>Listings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={touchable_styles.wideButtonPink}
        onPress={() =>
          navigation.navigate('register')
        }
      >
        <Text style={touchable_styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </Fragment>
  );
};
