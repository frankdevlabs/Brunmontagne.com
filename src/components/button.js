import React from "react"; // eslint-disable-line no-unused-vars
import { useTheme } from "@emotion/react";
import ArrowEast from "../assets/vectors/arrow-east.svg";

export const setArrowButtonStyles = (hoverColor, color, size) => {
  return {
    color: color,
    fontSize: size === "sm" ? "1.4rem" : "1.8rem",
    padding: size === "sm" ? "1.4rem 0" : "2rem 0",
    borderBottom: `${size === "sm" ? "1px" : "2px"} solid ${color}`,
    whiteSpace: "nowrap",
    display: "inline-flex",
    "&, & > *, & > * > path": {
      transition: "all 0.5s ease",
    },
    "&:hover, &:active": {
      borderBottom: `2px solid ${hoverColor}`,
    },
    "&:hover > span, &:active > span": {
      color: hoverColor,
    },
    "&:hover > svg > path, &:active > svg > path": {
      fill: hoverColor,
    },
    "& > svg": {
      ...(size === "sm" ? { height: "16px", width: "16px" } : {}),
    },
  };
};

const setDefaultButtonStyles = (
  textColor,
  textColorInHoverState,
  buttonColor,
  buttonColorInHoverState
) => {
  return {
    width: "100%",
    backgroundColor: buttonColor,
    padding: "2.3rem 0",
    borderRadius: "4px",
    color: textColor,
    fontSize: "1.7rem",
    lineHeight: "25px",
    letterSpacing: "0.04em",
    transition: "all 0.5s ease",
    "&:hover": {
      color: textColorInHoverState,
      backgroundColor: buttonColorInHoverState,
    },
  };
};

const Button = ({
  children,
  onClick,
  size,
  ui = "default",
  disabled,
  textColor,
  textColorInHoverState,
  buttonColorInHoverState,
  buttonColor,
  ...props
}) => {
  const theme = useTheme();
  let buttonStyles;

  if (ui === "arrow-btn") {
    const firstColor = theme.colors.YELLOW;
    const secondColor = theme.colors.SECONDARY_LIGHT;
    buttonStyles = setArrowButtonStyles(firstColor, secondColor, size);
    return (
      <button onClick={onClick} css={buttonStyles}>
        <span css={{ marginRight: "3rem" }}>{children}</span>
        <ArrowEast />
      </button>
    );
  }

  let _textColor,
    _textColorInHoverState,
    _buttonColorInHoverState,
    _buttonColor;
  if (!disabled) {
    _textColor = textColor || theme.colors.PRIMARY_LIGHT;
    _textColorInHoverState = textColorInHoverState || textColor;
    _buttonColorInHoverState =
      buttonColorInHoverState || theme.colors.GREEN_LIGHT;
    _buttonColor = buttonColor || theme.colors.GREEN;
  } else {
    _textColor = textColor || theme.colors.PRIMARY_LIGHT;
    _textColorInHoverState = textColorInHoverState || textColor;
    _buttonColorInHoverState =
      buttonColorInHoverState || theme.colors.SECONDARY_LIGHT;
    _buttonColor = buttonColor || theme.colors.SECONDARY_LIGHT;
  }
  buttonStyles = setDefaultButtonStyles(
    _textColor,
    _textColorInHoverState,
    _buttonColor,
    _buttonColorInHoverState
  );
  return (
    <button onClick={onClick} css={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
