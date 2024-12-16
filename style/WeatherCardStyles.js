import { StyleSheet } from "react-native";

const WeatherCardStyles = StyleSheet.create({
  card: { padding: 15, borderRadius: 10, marginRight: 10, alignItems: "center" },
  temp: { fontSize: 24, fontWeight: "bold" },
  description: { fontSize: 16 },
  wind: { fontSize: 14 },
});

export default WeatherCardStyles;
