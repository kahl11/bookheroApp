import React, { Component, useState, useRef, useEffect, useContext } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, LogBox, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, AsyncStorage, ActivityIndicator, Dimensions, ScrollView } from "react-native";
import { colors, styles } from '../styles/style';
import { touchable_styles } from '../styles/touchable_styles'
import * as ImagePicker from 'expo-image-picker';
import { ENDPOINT } from '@env';
import * as Crypto from 'expo-crypto';
import { Fragment } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PostPageContext } from '../constants/context';
import { locationType } from '../constants/Constants'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import MapView, { Circle } from 'react-native-maps';
import { TouchableButton } from '../constants/Components'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
})

function Listing({navigation}) {
  const PostContext = useContext(PostPageContext);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [mapReady, setMapReady] = useState(false);
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch(
      `${ENDPOINT}/getIndividualPost?id=${PostContext.postPage}`
    ).then((res) => {
      console.log(PostContext.postPage);
      return res.json();
    })
  );

  useEffect(() => {
    console.log(data);
  }, [data])

  if (isLoading) return (
    <ActivityIndicator size="large" color='#fefefe' />
  );

  var location = JSON.parse(decodeURIComponent(data[9]))

  return (
    <><View style={styles.container_header}>
      <Text style={[styles.title_header, { marginBottom: 0 }]}>{data[1]}</Text>
      <Text style={[styles.title_header, { marginTop: 0 }]}>{data[6]}</Text>
    </View>
      <ScrollView style={{ alignContent: 'center' }}>
        <Image
          source={{ uri: `${ENDPOINT}/${data[4]}` }}
          style={{ width: windowWidth, height: windowWidth }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.individualListingText, { fontSize: 50, textAlign: 'left', marginLeft: '10%', marginTop: 15, flex: 1 }]}>
            ${data[5]}
          </Text>
          <View>
            <Text style={[styles.individualListingText, { fontSize: 24, textAlign: 'right', marginRight: '20%', marginTop: 20 }]}>
              {data[7]}
            </Text>
            <Text style={[styles.individualListingText, { fontSize: 24, textAlign: 'right', marginRight: '20%' }]}>
              {new Date(data[8]).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          </View>
        </View>
        <View style={styles.individialListingDesc}>
          <Text style={[styles.individualListingText, { textAlign: 'center' }]}>
            {data[3]}
          </Text>
        </View>
        <View style={[touchable_styles.mapHolder, { marginLeft: '10%' }]}>
          {location !== null && (Platform.OS === 'ios' || Platform.OS === 'android') ?
            <Fragment>
              <Text style={[touchable_styles.lightText, { marginBottom: 5 }]}>Approximate Location </Text>
              <MapView style={{ width: '100%', height: '100%' }}
                initialRegion={{
                  latitude: location.lat + 0.001,
                  longitude: location.long,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.015,
                }}
                onMapReady={() => setMapReady(true)}
              >
                <Circle
                  center={{ latitude: location.lat, longitude: location.long }}
                  radius={500}
                  fillColor={'rgba(79, 208, 247, 0.3)'}
                  strokeColor={'rgba(79, 208, 247, 1)'}
                />
              </MapView>
            </Fragment>
            : null
          }
          {!mapReady ?
            <View style={{ alignItems: 'center' }}>
              <ActivityIndicator size="large" color='#fefefe' />
              <Text style={{ color: '#fefefe' }}>Loading Map</Text>
            </View>
            : null
          }
        </View>
        <TouchableButton
          style={touchable_styles.wideButtonLight}
          textStyle={touchable_styles.darkText}
          text={"Message Seller"}
          onClick={() => { console.log("test") }} />
        <View style={[styles.row, {marginBottom: 20}]}>
          <TouchableButton
            style={touchable_styles.halfButtonDark}
            textStyle={touchable_styles.lightText}
            text={"Back"}
            onClick={() => { navigation.navigate('showListing') }} />
          <TouchableButton
            style={touchable_styles.halfButtonDark}
            textStyle={touchable_styles.lightText}
            text={"Bookmark"}
            onClick={() => {  }} />
        </View>
      </ScrollView>
    </>
  );
}

export const individualListing = ({ navigation }: any) => {

  return (
    <Fragment>
      <SafeAreaView style={styles.background} />
      <SafeAreaView style={[styles.individualListingContainer, { flex: 1 }]}>
        <QueryClientProvider client={queryClient}>
          <Listing navigation={navigation}/>
        </QueryClientProvider>
      </SafeAreaView>
    </Fragment >
  );
};
