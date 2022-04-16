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
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { colors, styles } from "../styles/style";
import { touchable_styles } from "../styles/touchable_styles";
import * as ImagePicker from "expo-image-picker";
import { ENDPOINT } from "@env";
import * as Crypto from "expo-crypto";
import { Fragment } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PostPageContext } from "../constants/context";
import { locationType } from "../constants/Constants";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { TouchableButton } from "../constants/Components";
import { chatContext } from "../constants/context";
import { getSignedIn } from "../js/genericHelpers";
import { ListingMap } from "../js/components/Map";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

function Listing({ navigation, signedIn }) {
  const PostContext = useContext(PostPageContext);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [mapReady, setMapReady] = useState(false);
  let { chatId, setChatId } = useContext(chatContext);
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch(`${ENDPOINT}/getIndividualPost?id=${PostContext.postPage}`).then(
      (res) => {
        return res.json();
      }
    )
  );

  if (isLoading) return <ActivityIndicator size="large" color="#fefefe" />;

  var location = JSON.parse(decodeURIComponent(data[9]));

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.dark }}>
        <View style={styles.container_header_row}>
          <TouchableOpacity
            style={{
              paddingLeft: 10,
              alignSelf: "flex-start",
              width: 40,
              marginTop: 15,
              zIndex: 10,
            }}
            onPress={() => {
              navigation.navigate("showListing");
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              color={colors.off_white}
              size={28}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={[
                styles.title_header,
                { width: 400, flexGrow: 1, marginLeft: -40 },
              ]}
            >
              {data[1]} {"\n"} {data[6]}
            </Text>
          </View>
        </View>
        <ScrollView style={{ alignContent: "center" }}>
          <Image
            source={{ uri: `${ENDPOINT}/${data[4]}` }}
            style={{ width: windowWidth, height: windowWidth }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.individualListingText,
                {
                  fontSize: 50,
                  textAlign: "left",
                  marginLeft: "10%",
                  marginTop: 15,
                  flex: 1,
                },
              ]}
            >
              ${data[5]}
            </Text>
            <View>
              <Text
                style={[
                  styles.individualListingText,
                  {
                    fontSize: 24,
                    textAlign: "right",
                    marginRight: "20%",
                    marginTop: 20,
                  },
                ]}
              >
                {data[7]}
              </Text>
              <Text
                style={[
                  styles.individualListingText,
                  { fontSize: 24, textAlign: "right", marginRight: "20%" },
                ]}
              >
                {new Date(data[8]).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>
          <View style={styles.individialListingDesc}>
            <Text
              style={[styles.individualListingText, { textAlign: "center" }]}
            >
              {data[3]}
            </Text>
          </View>
          <View style={[touchable_styles.mapHolder, { marginLeft: "10%" }]}>
            {location !== null &&
            (Platform.OS === "ios" || Platform.OS === "android") ? (
              <Fragment>
                <Text style={[touchable_styles.lightText, { marginBottom: 5 }]}>
                  Approximate Location{" "}
                </Text>
                <ListingMap location={location} setMapReady={setMapReady} />
              </Fragment>
            ) : null}
            {!mapReady ? (
              <View style={{ alignItems: "center" }}>
                <ActivityIndicator size="large" color="#fefefe" />
                <Text style={{ color: "#fefefe" }}>Loading Map</Text>
              </View>
            ) : null}
          </View>
          {signedIn ? (
            <TouchableButton
              style={touchable_styles.wideButtonLight}
              textStyle={touchable_styles.darkText}
              text={"Message Seller"}
              onClick={() => {
                setChatId(data[7]);
                navigation.navigate("chat");
              }}
            />
          ) : (
            <View
              style={touchable_styles.wideButtonLightDisabled}
              onClick={() => {
                setChatId(data[7]);
                navigation.navigate("chat");
              }}
            >
              <Text>Log in to chat</Text>
            </View>
          )}
          <View style={[styles.row, { marginBottom: 20 }]}>
            <TouchableButton
              style={touchable_styles.halfButtonDark}
              textStyle={touchable_styles.lightText}
              text={"Back"}
              onClick={() => {
                navigation.navigate("showListing");
              }}
            />
            <TouchableButton
              style={touchable_styles.halfButtonDark}
              textStyle={touchable_styles.lightText}
              text={"Bookmark"}
              onClick={() => {}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export const individualListing = ({ navigation }: any) => {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    getSignedIn().then((answer) => {
      setSignedIn(answer);
    });
  }, []);
  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={[styles.individualListingContainer, { flex: 1 }]}>
        <QueryClientProvider client={queryClient}>
          <Listing navigation={navigation} signedIn={signedIn} />
        </QueryClientProvider>
      </SafeAreaView>
    </Fragment>
  );
};
