import React from "react"; // eslint-disable-line no-unused-vars
import {
  Global,
  css,
  ThemeProvider as EmotionThemeProvider,
} from "@emotion/react";

import ThemeContext from "./context";
import { useTheme } from "./theme";

import mq from "./media-queries";

const ThemeProvider = ({ children }) => {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={{ theme }}>
      <EmotionThemeProvider theme={theme}>
        <Global
          styles={css({
            "*,*::after,*::before": {
              borderWidth: "0",
              borderStyle: "solid",
              margin: "0",
              padding: "0",
              boxSizing: "inherit",
            },
            html: {
              WebkitFontSmoothing: "antialiased",
              textRendering: "optimizeLegibility",
              MozOsxFontSmoothing: "grayscale",
              touchAction: "manipulation",
              fontSize: "62.5%",
              [mq("md")]: {
                fontSize: "56%",
              },
              [mq("sm")]: {
                fontSize: "52.5%",
              },
            },
            body: {
              boxSizing: "border-box",
              backgroundColor: theme.colors.PRIMARY,
              color: theme.colors.SECONDARY_LIGHT,
            },
            ul: {
              listStyle: "none",
            },
            select: {
              outline: "0",
            },
            "button,[type='button'],[type='reset'],[type='submit']": {
              webkitAppearance: "button",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            },
            section: {
              padding: `35px ${theme.padding.DEFAULT}`,
              [mq("xl")]: {
                padding: `35px ${theme.padding.XL}`,
              },
              [mq("md")]: {
                padding: `35px ${theme.padding.MD}`,
              },
              [mq("sm")]: {
                padding: `35px ${theme.padding.SM}`,
              },
            },
            ".container": {
              maxWidth: "1440px",
              marginRight: "auto",
              marginLeft: "auto",
            },
            ".flexbox": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
            ".flexbox.grid": {
              flexWrap: "wrap",
            },
            ".flexbox.justifyStart": {
              justifyContent: "flex-start",
            },
            ".flexbox.justifyEnd": {
              justifyContent: "flex-end",
            },
            ".flexbox.alignBaseline": {
              alignItems: "baseline",
            },
            ".flexbox.col-margin": {
              margin: "0 -1.5rem",
              rowGap: "3rem",
            },
            ".flexbox .col": {
              paddingRight: "1.5rem",
              paddingLeft: "1.5rem",
            },
            ".flexbox .col.third": {
              flex: "0 1 33.3%",
            },
            ".flexbox .col.fourth": {
              flex: "0 1 25%",
              [mq("md")]: {
                flex: "0 1 50%",
              },
            },
          })}
        />
        <Global
          styles={css({
            body: {
              fontFamily: "Lato, sans-serif",
              fontSize: "1.8rem",
              lineHeight: "137%",
              letterSpacing: "0.03em",
              fontWeight: "400",
              fontStyle: "normal",
              textRendering: "optimizeLegibility",
              color: theme.colors.SECONDARY_LIGHT,
            },
            "h1,h2,h3,h4,h5,h6": {
              fontFamily: "Rokkitt, serif",
              fontWeight: "700",
              letterSpacing: "0.01em",
              position: "relative",
            },
            a: {
              textDecoration: "none",
              "&:link": {
                textDecoration: "inherit",
                color: "inherit",
                cursor: "pointer",
              },
              "&:visited": {
                textDecoration: "inherit",
                color: "inherit",
                cursor: "pointer",
              },
              "&:hover, &:active": {
                color: theme.colors.YELLOW,
              },
            },
          })}
        />
        <div className="theme-wrapper">{children}</div>
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
