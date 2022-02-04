import React from "react"; // eslint-disable-line no-unused-vars
import {
  useTranslation,
  useI18next,
  Link as I18NextLink,
} from "gatsby-plugin-react-i18next";
import { useTheme } from "@emotion/react";
import mq from "../theme/media-queries";
import BMLogo from "../assets/vectors/bm-logo-vector.svg";
import ShoppingCart from "../assets/vectors/shopping-cart.svg";
import User from "../assets/vectors/user.svg";

const NavList = ({ lang }) => {
  const { t } = useTranslation();
  const NavItems = t("menu", { returnObjects: true });

  return (
    <div>
      {NavItems.map((i, n) => (
        <NavItem key={n} to={i.to} lang={lang}>
          {i.label}
        </NavItem>
      ))}
    </div>
  );
};

const NavItem = ({ to, children, lang }) => (
  <I18NextLink
    className="anchor"
    to={to}
    language={lang}
    css={{
      fontSize: "1.6rem",
      lineHeight: "19px",
      letterSpacing: "0.01em",
      paddingTop: "11px",
      whiteSpace: "nowrap",
      "&:not(:last-of-type)": {
        marginRight: "30px",
      },
      [mq("xl")]: {
        fontSize: "1.4rem",
      },
      [mq("sm")]: {
        paddingTop: "0",
      },
    }}
  >
    {children}
  </I18NextLink>
);

const Header = () => {
  const theme = useTheme();
  const { lang } = useI18next();
  return (
    <header
      css={{
        position: "relative",
        zIndex: 1,
        padding: `3.2rem ${theme.padding.DEFAULT} 0 ${theme.padding.DEFAULT}`,
        [mq("xl")]: {
          padding: `3.2rem ${theme.padding.XL} 0 ${theme.padding.XL}`,
        },
        [mq("md")]: {
          padding: `3.2rem ${theme.padding.MD} 0 ${theme.padding.MD}`,
        },
        [mq("sm")]: {
          padding: `3.2rem ${theme.padding.SM} 0 ${theme.padding.SM}`,
        },
      }}
    >
      <div
        className="container"
        css={{
          display: "none",
          visibility: "hidden",
          [mq("lg")]: {
            visibility: "visible",
            display: "flex",
            justifyContent: "center",
            "& > a > svg": {
              width: "16rem",
            },
          },
        }}
      >
        <I18NextLink aria-label="home-button" to="/" language={lang}>
          <BMLogo />
        </I18NextLink>
      </div>
      <div className="container">
        <div
          className="flexbox col-margin"
          css={{
            "& > *:first-of-type": {
              marginLeft: "2rem",
            },
            "& > *:last-child": {
              marginRight: "2rem",
            },
            [mq("xxl")]: {
              "& > *:first-of-type, & > *:last-child": {
                margin: "0",
                [mq("sm")]: {
                  margin: " 0 2rem !important",
                },
              },
            },
            [mq("sm")]: {
              margin: "0",
              "& > div.col.third": {
                padding: "0",
              },
            },
          }}
        >
          <div
            className="col third"
            css={{
              [mq("lg")]: {
                "&.col.third": {
                  flex: "0 1 50%",
                },
              },
            }}
          >
            <div
              css={{
                display: "flex",
                marginTop: "2.6rem",
              }}
            >
              <NavList lang={lang} />
            </div>
          </div>
          <div className="col third">
            <div
              css={{
                marginTop: "1rem",
                textAlign: "center",
                [mq("lg")]: {
                  display: "none",
                  visibility: "hidden",
                },
              }}
            >
              <I18NextLink aria-label="home-button" to="/" language={lang}>
                <BMLogo />
              </I18NextLink>
            </div>
          </div>
          <div
            className="col third"
            css={{
              [mq("lg")]: {
                "&.col.third": {
                  flex: "0 1 50%",
                },
              },
            }}
          >
            <div
              css={{
                margin: "2.1rem 0 -1.5rem 0",
                [mq("xl")]: {
                  "& > div > svg": {
                    height: "24px",
                    width: "24px",
                  },
                },
                [mq("sm")]: {
                  "& > .col": {
                    padding: "0",
                  },
                },
              }}
              className="flexbox justifyEnd"
            >
              <div className="col">
                <ShoppingCart />
              </div>
              <div className="col">
                <User />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
