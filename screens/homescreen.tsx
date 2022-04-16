import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState, useContext } from "react";
import { Fragment } from "react";
import { SafeAreaView } from "react-native";
import {
  Text,
  View,
  Image
} from "react-native";
import { setConstantValue } from "typescript";
import { styles } from "../styles/style";
import { touchable_styles } from "../styles/touchable_styles";
import { ENDPOINT } from "@env";
import styled, { css } from "@emotion/native";
import { PostPageContext } from "../constants/context";
import { TouchableOpacity } from "react-native-gesture-handler";
const axios = require("axios").default;

const dark_blue_container = css`
  backgroundColor: #0c0e12;
  padding: 10px;
  margin: 10px;
  borderRadius: 5px;
`;

const conatainer_header = css`
  color: white;
  fontSize: 20px;
  fontWeight: 500;
  marginBottom: 15px;
`;

const product_container = css`
  width: 160px;
  height:175px;
  backgroundColor: #212121;
  borderRadius: 5px;
`;

const row = css`
  display: flex;
  flexDirection: row;
  justifyContent: space-between;
`;

const product_image = css`
  borderRadius: 5px 5px 0px 0px;
`;

export const home = ({ navigation }) => {
  const [listings, setListings] = useState([]);
  let { postPage, setPostPage } = useContext(PostPageContext);
  useEffect(() => {
    axios.get(`${ENDPOINT}/getPosts?page=0`).then((rep: any) => {
      setListings(rep.data.slice(0,2));
    })

  }, [])
  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={styles.container}>
        <View style={styles.container_header}>
          <Text testID="header" style={styles.title_header}>
            Home
          </Text>
        </View>
        <View style={dark_blue_container}>
          <Text style={conatainer_header}>New Posts</Text>
          <View style={row}>
          {Array.isArray(listings) ? listings.map((l, index) => {
            console.log(l)
            return(
              <TouchableOpacity
              key={`new-post-${index}`}
              testID={`new-post-${index}`}
              style={product_container}
              onPress={() => {
                  navigation.navigate("showListing");
                  setPostPage(l[0]);
                }}
              >
              <Image
                style={{width: '100%', height: '70%', borderTopLeftRadius: 5, borderTopRightRadius: 5}}
                source={{ uri: `${ENDPOINT}/${l[4]}` }}
                testID={`post-image-${index}`}
              />
              <View style={css`display: flex; flexDirection: row; alignItems: center; paddingTop: 12px;`}>
              <Text style={css`
              fontFamily: 'Rubik';
              fontStyle: normal;
              fontWeight: 400;
              fontSize: 26px;
              paddingLeft: 6px;
              color: white;
              flex: 1;
              `}>${l[5]}</Text>
              <Text 
              testID={`post-name-${index}`}
              style={css`
              fontFamily: 'Rubik';
              fontStyle: normal;
              fontWeight: 400;
              fontSize: 14px;
              color: white;
              paddingLeft: 5px;
              height: min-content;
              paddingRight: 5px;
              `}>{l[1]}</Text>
              </View>
              </TouchableOpacity>
            );
          }) : null}
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};
