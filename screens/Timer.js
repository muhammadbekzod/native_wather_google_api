import { View, Text } from "react-native";
import React from "react";
import Weather from "../components/weather/Weather";

export default function Timer() {
  return (
    <View style={{ flex: 1 }}>
      <Weather />
    </View>
  );
}
