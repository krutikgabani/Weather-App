export const useTheme = (theme = "light") => {
    const colors = theme === "light" ? lightTheme : darkTheme;
  
    return { colors };
  };
  
  const lightTheme = {
    background: "rgba(255, 255, 255, 0.8)",
    text: "#000000",
    textSecondary: "#666666",
    cardBackground: "rgba(240, 240, 240, 0.8)",
    inputBackground: "rgba(230, 230, 230, 0.8)",
    icon: "#333333",
    borderColor: "#cccccc",
  };
  
  const darkTheme = {
    background: "rgba(18, 18, 18, 0.8)",
    text: "#ffffff",
    textSecondary: "#aaaaaa",
    cardBackground: "rgba(30, 30, 30, 0.8)",
    inputBackground: "rgba(42, 42, 42, 0.8)",
    icon: "#ffffff",
    borderColor: "#444444",
  };
  