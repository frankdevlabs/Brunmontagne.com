import React from "react"; // eslint-disable-line no-unused-vars
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./link";
import Button from "./button";
import BMLogoSmall from "../assets/vectors/bm-logo-vector-small.svg";
import useCookie from "../utils/use-cookie";
import mq from "../theme/media-queries";
import { useTheme } from "@emotion/react";

const CookieNotice = ({ setShowBanner }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [_, setPreferences] = useCookie(
    "pref",
    "analytics=1|personalisation=0"
  );

  const options = {
    expires: 0,
    domain: process.env.GATSBY_COOKIE_DOMAIN || "localhost",
    path: "/",
    secure: true,
    httpOnly: false,
    maxAge: 15552000,
    sameSite: "none",
  };

  const accept = () => {
    setPreferences("analytics=1|personalisation=1", options);
    setShowBanner("0", options);
    history.go(0);
  };

  const refuse = () => {
    setPreferences("analytics=1|personalisation=0", options);
    setShowBanner("0", options);
    history.go(0);
  };

  return (
    <div
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
        zIndex: "9002",
        "& > div": {
          margin: "0 auto",
        },
        [mq("md")]: {
          maxWidth: "90%",
        },
        [mq("sm")]: {
          maxWidth: "80%",
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
