import React from "react"; // eslint-disable-line no-unused-vars
import {
  useTranslation,
  useI18next,
  Link as I18NextLink,
} from "gatsby-plugin-react-i18next";
import { useTheme } from "@emotion/react";
import CartButton from "./cart-button";
import LanguagePicker from "./language-picker";
import Toast from "./toast";
import mq from "../theme/media-queries";
import { StoreContext } from "../context/store-context";
import BMLogo from "../assets/vectors/bm-logo-vector.svg";
import Check from "../assets/vectors/check.svg";

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
      filter: "drop-shadow(5px 5px 4px black)",
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
  const { t } = useTranslation();

  const { checkout, loading, didJustAddToCart } =
    React.useContext(StoreContext);

  const items = checkout ? checkout.lineItems : [];

  const quantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
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
          filter: "drop-shadow(0px 9px 0px rgba(255,255,255, 0.1))",
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
      <div className="container" css={{ position: "relative" }}>
        <div
          className="flexbox col-margin"
          css={{
            "& > div.col.third > div.flexbox > div.col": {
              padding: "0",
              "&:first-of-type": {
                paddingRight: "1.4rem",
              },
            },
            [mq("sm")]: {
              margin: "0 !important",
              "& > div.col.third": {
                padding: "0",
              },
            },
          }}
        >
          <div
            className="col third"
            css={{
              filter: "drop-shadow(5px 5px 4px black)",
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
                  "& > div > svg, & > div > a > svg": {
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
                <CartButton quantity={quantity} />
              </div>
              <div className="col">
                <LanguagePicker />
              </div>
            </div>
          </div>
        </div>
        <Toast show={loading || didJustAddToCart}>
          {!didJustAddToCart ? (
            "Updating…"
          ) : (
            <>
              {t("added-to-cart")}{" "}
              <span css={{ "& > svg": { color: theme.colors.GREEN_LIGHT } }}>
                <Check />
              </span>
            </>
          )}
        </Toast>
      </div>
    </header>
  );
};

export default Header;
