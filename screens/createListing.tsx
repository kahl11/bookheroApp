import React, {
  Component,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  LogBox,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, styles } from "../styles/style";
import { touchable_styles } from "../styles/touchable_styles";
import * as ImagePicker from "expo-image-picker";
import { ENDPOINT } from "@env";
import * as Crypto from "expo-crypto";
import { Fragment } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { locationType } from "../constants/Constants";
import { pageParam } from "../constants/context";
import * as ImageManipulator from "expo-image-manipulator";
import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import { CreateListingMap } from "../js/components/Map";

interface post {
  imageName: string;
  title: string;
  course: string;
  price: number;
  description: string;
  school: string;
  user: string;
  location: locationType;
}

const handleUploadPhoto = async (
  SelectedImage: any,
  setStatus: Function,
  imageName: string
) => {
  let localUri = SelectedImage.uri;
  let filename = localUri.split("/").pop();
  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  formData.append("file", { uri: localUri, name: imageName, type });

  fetch(`${ENDPOINT}/sendImage`, {
    method: "POST",
    body: formData,
    headers: {
      "content-type": "multipart/form-data",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.status == "success") {
        return;
      } else if (json.status == "EXTENSION_BLOCK") {
        setStatus(
          "The file type was not allowed by the server, are you sure this is an image?"
        );
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const pickImage = async (setImage: Function, setImageName: Function) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  const manipResult = await ImageManipulator.manipulateAsync(
    result.localUri || result.uri,
    [{ resize: { width: 720 } }],
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
  );
  setImage(manipResult);
  const name = await Crypto.digestStringAsync(
    //use the sha1 as the filename, we dont want to store user inputted filesnames on our server
    Crypto.CryptoDigestAlgorithm.SHA1,
    result.uri + Date.now() //safe filename for storage on server
  );
  let match = /\.(\w+)$/.exec(result.uri.split("/").pop());
  if (match) setImageName(name + match[0]);
};

const uploadPost = async (post: post, navigation: any) => {
  const yJitter = Math.random() * 0.002;
  const xJitter = Math.random() * 0.002;
  const location = {
    lat: post.location.lat + xJitter,
    long: post.location.long + yJitter,
  };
  fetch(`${ENDPOINT}/createPost`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageName: post.imageName,
      title: post.title,
      course: post.course,
      price: post.price,
      description: post.description,
      school: post.school,
      user: post.user,
      location: location,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.status == "SUCCESS") {
        navigation.navigate("showListing");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const createListing = ({ navigation }: any) => {
  const [SelectedImage, setImage] = useState({});
  const [Status, setStatus] = useState("");
  const [imageName, setImageName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [price, setPrice] = useState(-1);
  const [description, setDescription] = useState("");
  const [school, setSchool] = useState("");
  const [username, setUsername] = useState("");

  const { setPage } = useContext(pageParam);
  const scrollRef = useRef(null);

  const [location, setLocation] = useState<locationType | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [noLoginErrorMessage, setNoLoginErrorMessage] = useState("")

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("need permission for location");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({ lat: loc.coords.latitude, long: loc.coords.longitude });
    })();
  }, []);

  const displayLoginWarning = async () => {
    setNoLoginErrorMessage("WARNING: YOU ARE NOT LOGGED IN. YOU MUST BE LOGGED IN TO CREATE A LISTING");
  }

  const getUser = async () => {
    try {
      let user = await AsyncStorage.getItem("username");
      if (user) {
        setUsername(user);
      }
      else {
        displayLoginWarning();
      }
    } catch (e) {
      displayLoginWarning();
      // error reading value
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark }}>
        <View style={styles.container_header_row}>
          <TouchableOpacity style={{paddingLeft: 10,alignSelf: "flex-start", width: 40, marginTop: 5, zIndex: 10}}
          onPress={() => {
            navigation.navigate("showListing");
          }}
          >
            <MaterialCommunityIcons name="arrow-left" color={colors.off_white} size={28} />
          </TouchableOpacity>
          <Text style={[styles.title_header, {width: 300, flexGrow: 1, marginLeft: -40}]}>Create Listing</Text>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              justifyContent: "flex-end",
              flexGrow: 1,
              alignItems: "center",
              backgroundColor: colors.dark,
              flexDirection: "column",
            }}
          >
          <Text style={{color: 'red'}}>{noLoginErrorMessage}</Text>
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
              ) : (
                <Fragment>
                  <MaterialCommunityIcons name="plus" color="white" size={22} />
                  <Text style={touchable_styles.imageSelectorText}>
                    Select Image
                  </Text>
                </Fragment>
              )}
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
              onFocus={() => {
                //@ts-ignore
                if (scrollRef.current) scrollRef.current.scrollTo(300);
              }}
              style={[styles.tallInput, {}]}
              onChangeText={setDescription}
              placeholder="Decscription"
              autoCapitalize="none"
              multiline={true}
            />
            <View style={touchable_styles.mapHolder}>
              {location &&
              (Platform.OS === "ios" || Platform.OS === "android") ? (
                <Fragment>
                  <Text
                    style={[touchable_styles.lightText, { marginBottom: 5 }]}
                  >
                    Select Approximate Location
                  </Text>
                  <CreateListingMap location={location} setMapReady={setMapReady} setLocation={setLocation}/>
                </Fragment>
              ) : null}
              {!mapReady ? (
                <View style={{ alignItems: "center" }}>
                  <ActivityIndicator size="large" color="#fefefe" />
                  <Text style={{ color: "#fefefe" }}>Loading Map</Text>
                </View>
              ) : null}
            </View>
            <TouchableOpacity //upload button
              style={[touchable_styles.wideButtonLight, { marginTop: 15 }]}
              onPress={() =>
                handleUploadPhoto(SelectedImage, setStatus, imageName).then(
                  () => {
                    if (location) {
                      var newPost: post = {
                        course: classCode,
                        imageName: imageName,
                        title: bookTitle,
                        price: price,
                        description: description,
                        school: school,
                        user: username,
                        location: location,
                      };
                    } else {
                      //idealy this neverhappens, otherwise someone ends up on null island
                      var newPost: post = {
                        course: classCode,
                        imageName: imageName,
                        title: bookTitle,
                        price: price,
                        description: description,
                        school: school,
                        user: username,
                        location: { lat: 0, long: 0 },
                      };
                    }
                    uploadPost(newPost, navigation);
                    setPage(0);
                  }
                )
              }
            >
              <Text style={touchable_styles.darkText}>Upload</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Fragment>
  );
};
