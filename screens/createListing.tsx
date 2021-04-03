import React, { Component, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, LogBox, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import * as ImagePicker from 'expo-image-picker';
import { PROD_ENDPOINT } from '@env';
import * as Crypto from 'expo-crypto';
import { Fragment } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'


export const createListing = ({ navigation }) => {
  const [SelectedImage, setImage] = useState({});
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
      SelectedImage.uri + Date.now() //safe filename for storage on server
    );
    let localUri = SelectedImage.uri;
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
    <Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={styles.container}>
        <View style={styles.container_header}>
          <Text style={styles.title_header}>Create Listing</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={200}
        >

          <TouchableOpacity
            style={[touchable_styles.imageSelector]}
            onPress={pickImage}
          >

            {SelectedImage.uri ? (
              <Image
                source={{ uri: SelectedImage.uri }}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            ) :
              <Fragment>
                <MaterialCommunityIcons name="plus" color="white" size={22} />
                <Text style={touchable_styles.imageSelectorText}>Select Image</Text>
              </Fragment>
            }
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 3, alignItems: "center" }}>
              <TextInput
                style={styles.input}
                // onChangeText={}
                placeholder="Textbook Title"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                // onChangeText={}
                placeholder="Course"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                // onChangeText={}
                keyboardType="decimal-pad"
                placeholder="$ Price"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.tallInput}
                // onChangeText={}
                placeholder="Decscription"
                autoCapitalize="none"
                multiline={true}
              />
              <TouchableOpacity
                style={[touchable_styles.wideButtonBlue, { marginTop: 15 }]}
                onPress={handleUploadPhoto}
              >
                <Text style={touchable_styles.loginButtonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Fragment >
  );
};
