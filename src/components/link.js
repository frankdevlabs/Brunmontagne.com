import React from "react"; // eslint-disable-line no-unused-vars
import { useI18next, Link as I18NextLink } from "gatsby-plugin-react-i18next";
import ArrowEast from "../assets/vectors/arrow-east.svg";
import { setArrowButtonStyles } from "./button";
import { useTheme } from "@emotion/react";

const setSimpleUI = (theme, underline) => {
  return {
    fontSize: "1.6rem",
    lineHeight: "19px",
    letterSpacing: "0",
    ...(underline
      ? {
          borderBottom: `1px solid ${theme.colors.SECONDARY_LIGHT}`,
          "&:hover, &:active": {
            borderBottom: `1px solid ${theme.colors.YELLOW}`,
          },
        }
      : {}),
  };
};

const Link = (props) => {
  const {
    children,
    ui,
    to,
    customStyle,
    ariaLabel,
    targetBlank,
    underline = true,
  } = props;
  const { language } = useI18next();
  const _props = { to, ...(ariaLabel ? { "aria-label": ariaLabel } : {}) };
  const theme = useTheme();

  if (ui === "button") {
    const color = theme.colors.SECONDARY_LIGHT;
    const hoverColor = theme.colors.YELLOW;
    const buttonStyles = setArrowButtonStyles(hoverColor, color);
    return (
      <I18NextLink css={buttonStyles} {..._props} language={language}>
        <span css={{ marginRight: "3rem" }}>{children}</span>
        <ArrowEast />
      </I18NextLink>
    );
  }

  if (ui === "custom") {
    return (
      <I18NextLink css={customStyle} {..._props} language={language}>
        {children}
      </I18NextLink>
    );
  }

  if (ui === "external") {
    const simpleUI = setSimpleUI(theme, underline);
    return (
      <a
        css={simpleUI}
        href={to}
        target={targetBlank ? "_blank" : "_self"}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  if (ui === "simple") {
    const simpleUI = setSimpleUI(theme);
    return (
      <I18NextLink css={simpleUI} {..._props} language={language}>
        {children}
      </I18NextLink>
    );
  }
};

export default Link;
