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
    PRIMARY_LIGHTEST: "#404046",
    SECONDARY: "#fff",
    SECONDARY_LIGHT: "#f1f1f1",
    SECONDARY_LIGHT_60: "rgba(255, 255, 255, 0.6)",
    TERTIARY: "#C33E39",
    GREEN: "#33DBC4",
    YELLOW: "#DC8622",
    YELLOW_LIGHT: "#E5a459",
  },
};

const durations = {
  durations: {
    ADD_TO_CART: 1000,
  },
};

export const useTheme = () => {
  return {
    ...darkThemeColors,
    ...paddingStyles,
    ...durations,
  };
};
