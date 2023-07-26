import React from "react";
import { View, StyleSheet } from "react-native";
import WeatherChild from "./WeatherChild";

const Weather = () => {
  return (
    <View style={styles.container}>
      {/* Replace 'Seoul' with the desired Korean city */}
      <WeatherChild city="Seoul" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Weather;
