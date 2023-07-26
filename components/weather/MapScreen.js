import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ markerPositions }) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 36.3667,
          longitude: 127.35,
          latitudeDelta: 1.5,
          longitudeDelta: 1.5,
        }}
      >
        {markerPositions.map((position, index) => (
          <Marker key={index} coordinate={position} />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;
