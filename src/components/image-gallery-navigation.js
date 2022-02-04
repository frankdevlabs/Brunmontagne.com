import React from "react"; // eslint-disable-line no-unused-vars
import { useTheme } from "@emotion/react";

const DotButton = ({ selected, onClick, color, colorSelected }) => (
  <button
    css={{
      backgroundColor: "transparent",
      cursor: "pointer",
      position: "relative",
      padding: "0",
      outline: "0",
      border: "0",
      width: "12px",
      height: "12px",
      display: "flex",
      "&.is-selected > div": {
        backgroundColor: colorSelected,
        opacity: "1",
      },
      "&.is-selected > div::after": {
        backgroundColor: colorSelected,
      },
    }}
    className={`${selected ? "is-selected" : ""}`}
    type="button"
    onClick={onClick}
  >
    <div
      css={{
        backgroundColor: color,
        width: "100%",
        height: "100%",
        borderRadius: "25px",
        "&::after": {
          content: '""',
          position: "absolute",
          display: "block",
          height: "2px",
          width: "100%",
          backgroundColor: "transparent",
          bottom: "-7px",
        },
      }}
    />{" "}
  </button>
);

const ImageGalleryNavigation = ({ scrollSnaps, selectedIndex, scrollTo }) => {
  const theme = useTheme();
  const { SECONDARY_LIGHT, TERTIARY } = theme.colors;

  return (
    <div
      css={{
        display: "flex",
        listStyle: "none",
        justifyContent: "center",
        paddingTop: "1rem",
        paddingBottom: "2rem",
        "& >*:not(:last-child)": {
          marginRight: "1.1rem",
        },
      }}
    >
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          selected={index === selectedIndex}
          onClick={() => scrollTo(index)}
          color={SECONDARY_LIGHT}
          colorSelected={TERTIARY}
        />
      ))}
    </div>
  );
};

export default React.memo(ImageGalleryNavigation);
