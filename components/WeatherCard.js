import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Icon, { getWeatherIcon } from "../constants/icons";
import { useTheme } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// const getWeatherIcon = (condition) => {
//   const conditionLower = condition.toLowerCase();

//   if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
//     return "weather-sunny";
//   } else if (conditionLower.includes("cloudy")) {
//     return "weather-cloudy";
//   } else if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
//     return "weather-rainy";
//   } else if (conditionLower.includes("thunder")) {
//     return "weather-lightning";
//   } else if (conditionLower.includes("snow")) {
//     return "weather-snowy";
//   } else if (conditionLower.includes("overcast")) {
//     return "weather-cloudy";
//   } else {
//     return "weather-partly-cloudy"; // Fallback icon
//   }
// };


export const WeatherCard = ({ temp, description, windSpeed, maxTemp, minTemp }) => {
  const { colors } = useTheme();
  const iconName = getWeatherIcon(description);

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
      <Icon name={iconName} size={40} color={colors.icon} />
      <Text style={[styles.temp, { color: colors.text }]}>{`${temp}°C`}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
      <Text style={[styles.minMax, { color: colors.textSecondary }]}>
        {`H: ${maxTemp}°C  L: ${minTemp}°C`}
      </Text>
      <View style={[styles.windSection, { borderColor: colors.borderColor }]}>
        <Text style={[styles.wind, { color: colors.textSecondary }]}>{`Wind: ${windSpeed} kph`}</Text>
      </View>
    </View>
  );
};

export const HourlyWeatherCard = ({ hourData }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.hourCard, { backgroundColor: colors.cardBackground }]}>
      <Text style={{ color: colors.textSecondary }}>{hourData.time.split(" ")[1]}</Text>
      <Image
        source={{ uri: `https:${hourData.condition.icon}` }}
        style={styles.icon}
      />
      <Text style={[styles.temp, { color: colors.text }]}>{`${hourData.temp_c}°C`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  temp: { fontSize: 24, fontWeight: "bold" },
  description: { fontSize: 16, marginTop: 5 },
  minMax: { fontSize: 14, marginTop: 5 },
  windSection: {
    marginTop: 10,
    padding: 8,
    borderWidth: 2,
    borderRadius: 0,
    width: "100%",
  },
  wind: { fontSize: 14 },
  hourCard: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
    width: 80,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: { width: 40, height: 40, marginVertical: 5 },
});
