import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./link";
import Button from "./button";
import BMLogoSmall from "../assets/vectors/bm-logo-vector-small.svg";
import useCookie from "../utils/use-cookie";
import mq from "../theme/media-queries";
import { useTheme } from "@emotion/react";

const CookieNotice = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const options = {
    expires: 0,
    domain: process.env.GATSBY_COOKIE_DOMAIN || "localhost",
    path: "/",
    secure: true,
    httpOnly: false,
    maxAge: 15552000,
    sameSite: "none",
  };

  const duration = 3000;
  const [animation, setAnimation] = useState("");
  const [showNotice, setShowNotice] = useCookie("showNotice", 1);
  const [_, setPreferences] = useCookie(
    "pref",
    "analytics=1|personalisation=0"
  );

  useEffect(() => {
    if (showNotice) {
      const timeout = setTimeout(() => {
        setAnimation("showing");
      }, duration);
      return () => clearTimeout(timeout);
    }
  });

  const accept = () => {
    setPreferences("analytics=1|personalisation=1", options);
    setShowNotice("0", options);
    history.go(0);
  };

  const refuse = () => {
    setPreferences("analytics=1|personalisation=0", options);
    setShowNotice("0", options);
    history.go(0);
  };

  return (
    <div
      className={[animation].join(" ")}
      css={{
        position: "fixed",
        boxShadow: " 0 0 5px rgba(0,0,0,.25)",
        padding: "2.5rem 2rem",
        maxWidth: "70rem",
        background: theme.colors.PRIMARY_LIGHT,
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: "-1",
        opacity: "0",
        animation: "showing 1s ease-in",
        visibility: "hidden",
        display: "none",

        "& > div": {
          margin: "0 auto",
        },
        [mq("md")]: {
          maxWidth: "90%",
        },
        [mq("sm")]: {
          maxWidth: "80%",
        },

        "@keyframes showing": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        "&.showing": {
          opacity: "1",
          zIndex: "9002",
          visibility: "unset",
          display: "block",
        },
      }}
    >
      <div
        css={{ display: "flex", alignItems: "center", paddingBottom: "2rem" }}
      >
        <div
          css={{
            "& > svg": { height: "48px", width: "48px" },
            "& > svg > path": { fill: theme.colors.SECONDARY_LIGHT },
            marginRight: "2rem",
          }}
        >
          <BMLogoSmall />
        </div>
        <h3>{t("cookie.title")}</h3>
      </div>
      <div css={{ paddingBottom: " 1.5rem" }}>
        <h4>{t("cookie.content-headline")}</h4>
        <p
          css={{
            "& > a": {
              fontSize: "unset",
              lineHeight: "unset",
              letterSpacing: "unset",
            },
          }}
        >
          {t("cookie.content-paragraph")}{" "}
          <Link ui="simple" to="/privacy" className="link link__primary">
            {t("cookie.content-privacy-policy")}
          </Link>
          .
        </p>
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "2rem",
          borderTop: `1px solid ${theme.colors.SECONDARY_LIGHT}`,
          "& > button": {
            padding: "1.7rem 0",
          },
          "& > button:not(:last-child)": {
            marginRight: "2rem",
          },
          [mq("sm")]: {
            flexDirection: "column",
            "& > button:not(:last-child)": {
              width: "100%",
              marginBottom: "1rem",
              marginRight: "unset",
            },
          },
        }}
      >
        <Button
          buttonColor={theme.colors.SECONDARY_LIGHT}
          buttonColorInHoverState={theme.colors.PRIMARY}
          textColorInHoverState={theme.colors.SECONDARY_LIGHT}
          onClick={refuse}
        >
          {t("cookie.btn-refuse")}
        </Button>
        <Button onClick={accept}>{t("cookie.btn-agree")} </Button>
      </div>
    </div>
  );
};

export default CookieNotice;
