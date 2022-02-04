import React from "react"; // eslint-disable-line no-unused-vars
import { useI18next, Link as I18NextLink } from "gatsby-plugin-react-i18next";
import ArrowEast from "../assets/vectors/arrow-east.svg";
import { setArrowButtonStyles } from "./button";
import { useTheme } from "@emotion/react";

const Link = (props) => {
  const { children, ui, to, customStyle, ariaLabel } = props;
  const { lang } = useI18next();
  const _props = { to, ...(ariaLabel ? { "aria-label": ariaLabel } : {}) };
  const theme = useTheme();
  const color = theme.colors.SECONDARY_LIGHT;
  const hoverColor = theme.colors.TERTIARY;
  const buttonStyles = setArrowButtonStyles(hoverColor, color);

  if (ui === "button") {
    return (
      <I18NextLink css={buttonStyles} {..._props} language={lang}>
        <span css={{ marginRight: "3rem" }}>{children}</span>
        <ArrowEast />
      </I18NextLink>
    );
  }

  if (ui === "custom") {
    return (
      <I18NextLink css={customStyle} {..._props} language={lang}>
        {children}
      </I18NextLink>
    );
  }
};

export default Link;
