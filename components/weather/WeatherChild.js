import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import moment from "moment";
import MapScreen from "./MapScreen";

const API_KEY = "6238447f6601465121f7a2431ab39bb4";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherChild = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data for the specified city
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(WEATHER_API_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric", // Celsius for temperature
          },
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (!weatherData) {
    return <Text>Loading...</Text>;
  }

  const { main, weather, wind, dt } = weatherData;
  const { temp, humidity } = main;
  const { description } = weather[0];
  const { speed } = wind;

  const formattedDate = moment.unix(dt).format("MMMM Do YYYY, h:mm:ss a");

  const markerPositions = [{ latitude: 35.601, longitude: 126.9206 }];

  return (
    <View style={{ flex: 1 }}>
      <MapScreen markerPositions={markerPositions} />
      <View>
        <Text>City: {city}</Text>
        <Text>Temperature: {temp}°C</Text>
        <Text>Description: {description}</Text>
        <Text>Humidity: {humidity}%</Text>
        <Text>Wind Speed: {speed} m/s</Text>
        <Text>Updated at: {formattedDate}</Text>
      </View>
    </View>
  );
};

export default WeatherChild;
