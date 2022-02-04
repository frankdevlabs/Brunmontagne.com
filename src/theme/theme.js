const paddingStyles = {
  padding: {
    DEFAULT: "6rem",
    SM: "2rem",
    MD: "2.5rem",
    XL: "4.5rem",
  },
};

const darkThemeColors = {
  colors: {
    PRIMARY: "#000",
    PRIMARY_LIGHT: "#181B1D",
    SECONDARY: "#fff",
    SECONDARY_LIGHT: "#f1f1f1",
    SECONDARY_LIGHT_60: "rgba(255, 255, 255, 0.6)",
    TERTIARY: "#C33E39",
    GREEN: "#33DBC4",
    GREEN_LIGHT: "#34FBE0",
    YELLOW: "#DCD40E",
  },
};

export const useTheme = () => {
  return {
    ...darkThemeColors,
    ...paddingStyles,
  };
};
