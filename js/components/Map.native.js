import React from "react";
import MapView, { Circle, Marker } from "react-native-maps";


export const ListingMap = ({location, setMapReady}) => {
  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      initialRegion={{
        latitude: location.lat + 0.001,
        longitude: location.long,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      }}
      onMapReady={() => setMapReady(true)}
    >
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: location.lat + 0.001,
          longitude: location.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        onMapReady={() => setMapReady(true)}
      >
        <Circle
          center={{
            latitude: location.lat,
            longitude: location.long,
          }}
          radius={500}
          fillColor={"rgba(79, 208, 247, 0.3)"}
          strokeColor={"rgba(79, 208, 247, 1)"}
        />
      </MapView>
      <Circle
        center={{
          latitude: location.lat,
          longitude: location.long,
        }}
        radius={500}
        fillColor={"rgba(79, 208, 247, 0.3)"}
        strokeColor={"rgba(79, 208, 247, 1)"}
      />
    </MapView>
  );
};

export const CreateListingMap = ({location, setMapReady, setLocation}) => {
  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      initialRegion={{
        latitude: location.lat + 0.001,
        longitude: location.long,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      }}
      onMapReady={() => setMapReady(true)}
      onPress={(e) => {
        setLocation({
          lat: e.nativeEvent.coordinate.latitude,
          long: e.nativeEvent.coordinate.longitude,
        });
      }}
    >
      <Marker
        draggable
        coordinate={{
          latitude: location.lat,
          longitude: location.long,
        }}
        onDragEnd={(e) => {
          setLocation({
            lat: e.nativeEvent.coordinate.latitude,
            long: e.nativeEvent.coordinate.longitude,
          });
        }}
        image={require("../../assets/images/mapMarker.png")}
      />
    </MapView>
  );
};
