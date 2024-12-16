import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import { WeatherCard, HourlyWeatherCard } from "./components/WeatherCard";
import { useTheme } from "./constants/theme";
import Icon from "./constants/icons";

const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");

  const { colors } = useTheme(theme);

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  const fetchWeatherByLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => console.error(error.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const apiKey = "35fe087cfdb44a41a4663349241612";
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1`
      );

      const { forecast, current, location } = response.data;

      setWeatherData({
        temp: current.temp_c,
        description: current.condition.text,
        windSpeed: current.wind_kph,
        maxTemp: forecast.forecastday[0].day.maxtemp_c,
        minTemp: forecast.forecastday[0].day.mintemp_c,
      });

      setHourlyData(forecast.forecastday[0].hour);
      setLocation(location.name);
    } catch (error) {
      console.error("Error fetching weather data: ", error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const apiKey = "35fe087cfdb44a41a4663349241612";
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${search}&days=1`
      );

      const { forecast, current, location } = response.data;

      setWeatherData({
        temp: current.temp_c,
        description: current.condition.text,
        windSpeed: current.wind_kph,
        maxTemp: forecast.forecastday[0].day.maxtemp_c,
        minTemp: forecast.forecastday[0].day.mintemp_c,
      });

      setHourlyData(forecast.forecastday[0].hour);
      setLocation(location.name);
    } catch (error) {
      console.error("City not found: ", error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{`Good ${
          new Date().getHours() < 12
            ? "Morning"
            : new Date().getHours() < 18
            ? "Afternoon"
            : "Evening"
        }, Welcome!`}</Text>
        <TouchableOpacity onPress={() => setTheme(theme === "light" ? "dark" : "light")}>
          <Icon name={theme === "light" ? "weather-night" : "weather-sunny"} size={30} color={colors.text} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={[styles.searchBox, { backgroundColor: colors.inputBackground, color: colors.text }]}
        placeholder="Search for a city..."
        placeholderTextColor={colors.textSecondary}
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
      />

      {weatherData && (
        <View>
          <Text style={[styles.location, { color: colors.text }]}>{location}</Text>
          <WeatherCard
            temp={weatherData.temp}
            description={weatherData.description} // Correct description
            windSpeed={weatherData.windSpeed}
            maxTemp={weatherData.maxTemp}
            minTemp={weatherData.minTemp}
          />

          <Text style={[styles.hourlyTitle, { color: colors.text }]}>Hourly Forecast</Text>
          <FlatList
            data={hourlyData}
            horizontal
            keyExtractor={(item) => item.time_epoch.toString()}
            renderItem={({ item }) => <HourlyWeatherCard hourData={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold" },
  searchBox: { borderRadius: 10, padding: 10, marginBottom: 20 },
  location: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  hourlyTitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
});
