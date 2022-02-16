import React from "react"; // eslint-disable-line no-unused-vars
import { useTheme } from "@emotion/react";
import BMLogo from "../assets/vectors/bm-logo-vector.svg";
import Link from "../components/link";
import Facebook from "../assets/vectors/facebook-icon.svg";
import LinkedIn from "../assets/vectors/li-icon.svg";
import Instagram from "../assets/vectors/instagram-icon.svg";
import mq from "../theme/media-queries";

const Footer = () => {
  const theme = useTheme();
  return (
    <footer
      css={{
        backgroundColor: theme.colors.TERTIARY,
        marginTop: "8rem",
        padding: `12.5rem ${theme.padding.DEFAULT} 12.5rem ${theme.padding.DEFAULT}`,
        [mq("xl")]: {
          padding: `12.5rem ${theme.padding.XL} 12.5rem ${theme.padding.XL}`,
          marginTop: "4rem",
        },
        [mq("md")]: {
          padding: `6rem ${theme.padding.MD} 6rem ${theme.padding.MD}`,
          marginTop: "0",
        },
        [mq("sm")]: {
          padding: `3.5rem ${theme.padding.SM} 3.5rem ${theme.padding.SM}`,
        },
      }}
    >
      <div className="container">
        <div
          className="flexbox grid col-margin"
          css={{
            alignItems: "baseline",
            justifyContent: "flex-start",
            "& > div:not(:last-of-type) > div > div:last-of-type": {
              marginTop: "5.8rem",
              [mq("lg")]: {
                marginTop: "4.4rem",
              },
              [mq("md")]: {
                marginTop: "2.4rem",
              },
            },
            "& > div:last-of-type > div > div:last-of-type": {
              marginTop: "9.1rem",
              [mq("lg")]: {
                marginTop: "6.4rem",
              },
              [mq("md")]: {
                marginTop: "2.4rem",
              },
            },
            "& > div.col.third > div > div > h4": {
              whiteSpace: "nowrap",
              fontSize: "3rem",
              lineHeight: "34px",
              [mq("lg")]: {
                fontSize: "2.4rem",
                lineHeight: "24px",
              },
            },
            "& > div.col.third": {
              [mq("md")]: {
                marginTop: "2rem",
                flex: " 0 1 100%",

                "& > div": {
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  "& > div": { minWidth: "157px" },
                },
              },
            },
          }}
        >
          <div className="col third">
            <div>
              <div
                css={{
                  "& > svg": {
                    width: "267px",
                    height: "58px",
                    [mq("xl")]: {
                      width: "unset",
                      height: "unset",
                    },
                    [mq("xl")]: {
                      width: "150px",
                      height: "unset",
                    },
                  },
                }}
              >
                <BMLogo />
              </div>
              <div
                css={{
                  "& > *": {
                    fontSize: "1.6rem",
                    letterSpacing: "0",
                    fontStyle: "normal",
                    lineHeight: "144%",
                  },
                }}
              >
                <address>
                  Binnendijk 79 <br />
                  8461LH Rottum <br />
                  kvk: 73441317
                  <br />
                  tel: +31 (0)85 0074449 <br />
                </address>
                <Link
                  to="mailto:info@brunmontagne.com"
                  targetBlank={false}
                  ui="external"
                >
                  info@brunmontagne.com
                </Link>
              </div>
            </div>
          </div>
          <div className="col third">
            <div>
              <div>
                <h4>Voorwaarden</h4>
              </div>
              <div>
                <ul
                  css={{
                    whiteSpace: "nowrap",
                    "& > li": {
                      marginBottom: "1rem",
                    },
                  }}
                >
                  <li>
                    <Link ui="simple" to="/terms/">
                      Algemene Voorwaarden
                    </Link>
                  </li>
                  <li>
                    <Link ui="simple" to="/returns/">
                      Garantie en retouren
                    </Link>
                  </li>
                  <li>
                    <Link ui="simple" to="/privacy/">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col third">
            <div>
              <div>
                <h4>Blijf op de hoogte</h4>
              </div>
              <div>
                <ul
                  css={{
                    display: "flex",
                    [mq("lg")]: {
                      "& > li > a > svg": {
                        height: "24px",
                        width: "24px",
                      },
                    },
                    "& > li:not(:last-of-type)": {
                      marginRight: "3.3rem",
                      [mq("lg")]: { marginRight: "2.3rem" },
                    },
                    "& > li > a:hover > svg > path, & > li > a:active svg > path":
                      {
                        fill: "currentColor",
                      },
                  }}
                >
                  <li>
                    <Link
                      to="https://www.facebook.com/brunmontagne/"
                      targetBlank={true}
                      ui="external"
                      underline={false}
                    >
                      <Facebook />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.instagram.com/brunmontagne/"
                      targetBlank={true}
                      ui="external"
                      underline={false}
                    >
                      <Instagram />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.linkedin.com/company/montbrun-watches/about/"
                      targetBlank={true}
                      ui="external"
                      underline={false}
                    >
                      <LinkedIn />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container"
        css={{
          marginTop: "13.9rem",
          [mq("md")]: {
            marginTop: "7.9rem",
          },
        }}
      >
        <div
          css={{
            fontSize: "1.4rem",
            lineHeight: "17px",
            letterSpace: "0",
            textAlign: "center",
          }}
        >
          Brunmontagne &copy; 2022 | Webdesign{" "}
          <Link
            to="https://www.linkedin.com/in/devriesfr/"
            targetBlank={true}
            ui="external"
            underline={false}
          >
            <strong>FDV</strong>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
