import { StyleSheet } from "react-native";

const AppStyles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 20, fontWeight: "bold" },
  searchBox: { borderRadius: 10, padding: 10, marginBottom: 20 },
  location: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

export default AppStyles;
