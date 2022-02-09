import React from "react"; // eslint-disable-line no-unused-vars
import { useTheme } from "@emotion/react";

const Required = ({ color }) => {
  return <span css={{ color: color }}> *</span>;
};

const InputField = ({
  label,
  required = true,
  name,
  type,
  mode = "input",
  placeholder,
}) => {
  const theme = useTheme();
  const commonInputStyles = {
    backgroundColor: "transparent",
    color: theme.colors.SECONDARY_LIGHT,
    outline: "none",
    fontFamily: "Lato,sans-serif",
    fontSize: "1.8rem",
    lineHeight: "137%",
    letterSpacing: "0.03em",
  };
  const commonBoxStyles = {
    display: "flex",
    flexDirection: "column",
    height: "4.8rem",
    justifyContent: "space-between",
  };
  const commonLabelStyles = {
    fontSize: "1.8rem",
    lineHeight: "22px",
    letterSpacing: "0.01em",
  };
  if (mode === "input") {
    return (
      <div css={{ ...commonBoxStyles, maxWidth: "46.9rem" }}>
        <label css={commonLabelStyles} htmlFor={name}>
          {label}
          {required ? <Required color={theme.colors.TERTIARY} /> : ""}
        </label>
        <input
          css={{
            borderBottom: `1px solid ${theme.colors.SECONDARY}`,
            ...commonInputStyles,
            "&:focus": {
              borderBottom: `1px solid ${theme.colors.YELLOW}`,
            },
          }}
          placeholder={placeholder}
          id={name}
          type={type}
          name={name}
          required={required}
        />
      </div>
    );
  } else if (mode === "textarea") {
    return (
      <div css={{ ...commonBoxStyles, height: "100%" }}>
        <label
          css={{ ...commonLabelStyles, marginBottom: "2.4rem" }}
          htmlFor={name}
        >
          {label}
          {required ? <Required color={theme.colors.TERTIARY} /> : ""}
        </label>
        <textarea
          css={{
            ...commonInputStyles,
            height: "100%",
            padding: "2%",
            border: `1px solid ${theme.colors.SECONDARY}`,
            "&:focus": {
              border: `1px solid ${theme.colors.YELLOW}`,
            },
          }}
          placeholder={placeholder}
          id={name}
          name={name}
          required={required}
        />
      </div>
    );
  }
};

export default InputField;
