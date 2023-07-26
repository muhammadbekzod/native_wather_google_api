import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet, // Add StyleSheet import
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { theme } from "../theme";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import * as Progress from "react-native-progress";
import { StatusBar } from "expo-status-bar";
import { weatherImages } from "../constants";
import { getData, storeData } from "../utils/asyncStorage";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  const handleSearch = (search) => {
    // console.log('value: ',search);
    if (search && search.length > 2)
      fetchLocations({ cityName: search }).then((data) => {
        // console.log('got locations: ',data);
        setLocations(data);
      });
  };

  const handleLocation = (loc) => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setLoading(false);
      setWeather(data);
      storeData("city", loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = "Islamabad";
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      // console.log('got data: ',data.forecast.forecastday);
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const { location, current } = weather;

  // Add the styles object here
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
    },

    someView: {
      backgroundColor: "red",
      padding: 10,
    },
    someText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    // ... add other styles as needed
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      {loading ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          {/* search section */}
          <View
            style={{
              height: "7%",
              marginHorizontal: 4,
              position: "absolute",

              zIndex: 50,
              flex: 1,
            }}
          >
            <View
              style={{
                width: "100%",
                padding: 5,
                // position: "absolute",
                // left: 10,
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 10,
                borderRadius: 9999,
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor={"lightgray"}
                  style={{
                    paddingLeft: 10,
                    // width: 300,
                    // height: 10,
                    paddingBottom: 1,
                    flex: 1,
                    fontSize: 16,
                    color: "white",
                  }}
                />
              ) : null}
              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={{
                  borderRadius: 9999,
                  padding: 3,
                  margin: 1,
                  backgroundColor: theme.bgWhite(0.3),
                }}
              >
                {showSearch ? (
                  <XMarkIcon size={25} color="white" />
                ) : (
                  <MagnifyingGlassIcon size={25} color="white" />
                )}
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#d3d3d3",
                  borderRadius: 9999,
                  position: "absolute",
                  top: "100%",
                }}
              >
                {locations.map((loc, index) => {
                  let showBorder = index + 1 !== locations.length;
                  let borderClass = showBorder
                    ? { borderBottomWidth: 2, borderBottomColor: "#d3d3d3" }
                    : {};
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(loc)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0,
                        padding: 3,
                        paddingHorizontal: 4,
                        marginBottom: 1,
                        ...borderClass,
                      }}
                    >
                      <MapPinIcon size={20} color="gray" />
                      <Text
                        style={{ color: "black", fontSize: 20, marginLeft: 2 }}
                      >
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/* forecast section */}
          <View
            style={{
              bottom: 0,
              flex: 1,
              marginHorizontal: 4,
              justifyContent: "space-around",
              marginBottom: 2,
            }}
          >
            {/* location */}
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {location?.name},
              <Text style={{ color: "gray", fontSize: 16, fontWeight: "600" }}>
                {location?.country}
              </Text>
            </Text>
            {/* weather icon */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={weatherImages[current?.condition?.text || "other"]}
                style={{ width: 200, height: 200 }}
              />
            </View>
            {/* degree celcius */}
            <View
              style={{
                paddingBottom: 10,
                flexDirection: "column",
                justifyContent: "space-y",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 60,
                  fontWeight: "bold",
                  marginLeft: 5,
                }}
              >
                {current?.temp_c}&#176;
              </Text>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 20,
                  letterSpacing: 1,
                }}
              >
                {current?.condition?.text}
              </Text>
            </View>

            {/* other stats */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/wind.png")}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 16 }}
                >
                  {current?.wind_kph}km
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/drop.png")}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 16 }}
                >
                  {current?.humidity}%
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/sun.png")}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 16 }}
                >
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>

          {/* forecast for next days */}
          <View
            style={{
              // marginTop: 30,
              paddingBottom: 50,
              marginBottom: 2,
              flexDirection: "column",
              justifyContent: "space-y",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 5,
                marginBottom: 25,
                marginTop: 30,
              }}
            >
              <CalendarDaysIcon size={22} color="white" />
              <Text style={{ color: "white", fontSize: 16 }}>
                Daily forecast
              </Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                const date = new Date(item.date);
                const options = { weekday: "long" };
                let dayName = date.toLocaleDateString("en-US", options);
                dayName = dayName.split(",")[0];

                return (
                  <View
                    key={index}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 100,
                      paddingVertical: 3,
                      paddingHorizontal: 4,
                      borderRadius: 12,
                      backgroundColor: theme.bgWhite(0.15),
                      marginRight: 4,
                    }}
                  >
                    <Image
                      source={
                        weatherImages[item?.day?.condition?.text || "other"]
                      }
                      style={{ width: 55, height: 55 }}
                    />
                    <Text style={{ color: "white" }}>{dayName}</Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 24,
                        fontWeight: "600",
                      }}
                    >
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
