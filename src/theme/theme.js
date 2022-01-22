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
    PRIMARY_LIGHT: "#09192B",
    SECONDARY: "#fff",
    SECONDARY_LIGHT: "#f1f1f1",
    TETIATERY: "#C33E39",
    GREEN: "#33DBC4",
    YELLOW: "#DCD40E",
  },
};

export const useTheme = () => {
  return {
    ...darkThemeColors,
    ...paddingStyles,
  };
};
