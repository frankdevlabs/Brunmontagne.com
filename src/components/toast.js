import React from "react";
import { useTheme } from "@emotion/react";

const Toast = ({ show, duration = 1000, ...props }) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(show);
  const [animation, setAnimation] = React.useState("");

  React.useEffect(() => {
    if (show) {
      setVisible(true);
    }
    const timeout = setTimeout(() => {
      setAnimation("");
      setVisible(show);
    }, duration);
    setAnimation(show ? "showing" : "hiding");
    return () => clearTimeout(timeout);
  }, [show, duration]);

  return visible ? (
    <div
      className={[animation].join(" ")}
      css={{
        backgroundColor: theme.colors.SECONDARY,
        color: theme.colors.PRIMARY_LIGHT,
        width: "50%",
        position: "fixed",
        right: "1rem",
        bottom: "2rem",
        padding: "1rem 2rem",
        fontSize: "1.2rem",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
        minWidth: "100px",
        justifyContent: "center",
        zIndex: "10",
        whiteSpace: "nowrap",
        opacity: "1",

        "@keyframes showing": {
          "0%": {
            transform: "translateX(200px)",
            opacity: "0",
          },
          "50%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },

        "@keyframes hiding": {
          "50%": {
            transform: "translateX(200px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(200px)",
            opacity: "0",
          },
        },

        "&.hiding": {
          animation: "hiding 1s ease",
        },

        "&.showing": {
          animation: "showing 1s ease-out",
        },
      }}
      {...props}
    />
  ) : null;
};

export default Toast;
