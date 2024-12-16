import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const weatherIcons = {
  Clear: "weather-sunny",
  Clouds: "weather-cloudy",
  Rain: "weather-rainy",
  Snow: "weather-snowy",
  Thunderstorm: "weather-lightning",
  Drizzle: "weather-partly-rainy",
  Mist: "weather-fog",
  Haze: "weather-hazy",
};

export const getWeatherIcon = (condition) => weatherIcons[condition] || "weather-sunset";

export default Icon;
