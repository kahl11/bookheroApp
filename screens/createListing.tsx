import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, LogBox, Image } from "react-native";
import { styles } from './style';
import * as ImagePicker from 'expo-image-picker';
import { PROD_ENDPOINT } from '@env';
import * as Crypto from 'expo-crypto';


export const createListing = ({ navigation }) => {
  const [Image, setImage] = useState({});
  const [Status, setStatus] = useState("");
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result);
  }

  const handleUploadPhoto = async () => {
    const name = await Crypto.digestStringAsync( //use the sha1 as the filename, we dont want to store use inputted filesnames on our server
      Crypto.CryptoDigestAlgorithm.SHA1,
      Image.uri + Date.now() //safe filename for storage on server
    );
    let localUri = Image.uri;
    let filename = localUri.split('/').pop();
    console.log(name)
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('file', { uri: localUri, name: (name + match[0]), type });
    console.log(formData)

    fetch(`${PROD_ENDPOINT}/sendImage`, {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then((response) => response.json())
      .then((json) => {
        if (json.status == "success") {
          return;
        } else if (json.status == "EXTENSION_BLOCK") {
          setStatus("The file type was not allowed by the server, are you sure this is an image?")
        }
      }).catch((error) => {
        console.error(error);
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <Text style={styles.title_header}>Book Hero</Text>
      </View>
      <TouchableOpacity
        style={[styles.wideButtonBlue]}
        onPress={pickImage}
      >
        <Text style={styles.loginButtonText}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.wideButtonBlue]}
        onPress={handleUploadPhoto}
      >
        <Text style={styles.loginButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};
