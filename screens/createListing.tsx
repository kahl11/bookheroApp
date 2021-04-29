import React, { Component, useState, useRef, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, LogBox, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { colors, styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import * as ImagePicker from 'expo-image-picker';
import { PROD_ENDPOINT } from '@env';
import * as Crypto from 'expo-crypto';
import { Fragment } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface post {
  imageName: string,
  title: string,
  course: string,
  price: number,
  description: string
  school: string
}
const handleUploadPhoto = async (SelectedImage: any, setStatus: Function, imageName:string) => {
  let localUri = SelectedImage.uri;
  let filename = localUri.split('/').pop();
  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  formData.append('file', { uri: localUri, name: (imageName), type });

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

const pickImage = async (setImage: Function, setImageName:Function) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  setImage(result);
  const name = await Crypto.digestStringAsync( //use the sha1 as the filename, we dont want to store user inputted filesnames on our server
    Crypto.CryptoDigestAlgorithm.SHA1,
    result.uri + Date.now() //safe filename for storage on server
  );
  let match = /\.(\w+)$/.exec(result.uri.split('/').pop());
  setImageName(name+match);
}

const uploadPost = async (post: post) => {
  fetch(`${PROD_ENDPOINT}/createPost`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      imageName: post.imageName,
      title: post.title,
      course: post.course,
      price: post.price,
      description: post.description,
      school: post.school
    })
  }).then((response) => response.json())
    .then((json) => {
      if (json.status == "success") {
        return; //handle better
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export const createListing = ({ navigation }: any) => {
  const [SelectedImage, setImage] = useState({});
  const [Status, setStatus] = useState("");
  const [imageName, setImageName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [price, setPrice] = useState(-1);
  const [description, setDescription] = useState("");
  const [school, setSchool] = useState("");
  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: colors.background_dark }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container_header}>
            <Text style={styles.title_header}>Create Listing</Text>
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ justifyContent: "flex-end", flex: 1, alignItems: "center", backgroundColor: colors.dark }}>
              <TouchableOpacity
                style={[touchable_styles.imageSelector]}
                onPress={() => pickImage(setImage, setImageName)}
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

              <TextInput
                style={styles.input}
                onChangeText={setBookTitle}
                placeholder="Textbook Title"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                onChangeText={setSchool}
                placeholder="School"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                onChangeText={setClassCode}
                placeholder="Course"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                onChangeText={(value) => {
                  setPrice(+value);
                }}
                keyboardType="decimal-pad"
                placeholder="$ Price"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.tallInput}
                onChangeText={setDescription}
                placeholder="Decscription"
                autoCapitalize="none"
                multiline={true}
              />
              <TouchableOpacity //upload button
                style={[touchable_styles.wideButtonLight, { marginTop: 15 }]}
                onPress={() => handleUploadPhoto(SelectedImage, setStatus, imageName).then(() => {
                  let newPost: post = { course: classCode, imageName: imageName, title: bookTitle, price: price, description: description, school: school }
                  uploadPost(newPost)
                }
                )}
              >
                <Text style={touchable_styles.darkText}>Upload</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Fragment >
  );
};
