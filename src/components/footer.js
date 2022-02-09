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
        padding: `12.5rem ${theme.padding.DEFAULT} 12.5rem ${theme.padding.DEFAULT}`,
        [mq("xl")]: {
          padding: `12.5rem ${theme.padding.XL} 12.5rem ${theme.padding.XL}`,
        },
        [mq("md")]: {
          padding: `6rem ${theme.padding.MD} 6rem ${theme.padding.MD}`,
        },
        [mq("sm")]: {
          padding: `3.5rem ${theme.padding.SM} 3.5rem ${theme.padding.SM}`,
        },
        marginTop: "8rem",
      }}
    >
      <div className="container">
        <div
          className="flexbox grid col-margin"
          css={{ alignItems: "baseline" }}
        >
          <div className="col third">
            <div
              css={{
                "& > svg": {
                  width: "267px",
                  height: "58px",
                },
              }}
            >
              <BMLogo />
            </div>
            <div
              css={{
                marginTop: "5.8rem",
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
          <div className="col third">
            <div>
              <h4 css={{ fontSize: "3rem", lineHeight: "34px" }}>
                Voorwaarden
              </h4>
            </div>
            <div
              css={{
                marginTop: "5.8rem",
              }}
            >
              <ul
                css={{
                  "& > li": {
                    marginBottom: "1rem",
                  },
                }}
              >
                <li>
                  <Link ui="simple" to="/terms">
                    Algemene Voorwaarden
                  </Link>
                </li>
                <li>
                  <Link ui="simple" to="/returns">
                    Garantie en retouren
                  </Link>
                </li>
                <li>
                  <Link ui="simple" to="/privacy">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col third">
            <div>
              <h4 css={{ fontSize: "3rem", lineHeight: "34px" }}>
                Blijf op de hoogte
              </h4>
            </div>
            <div css={{ marginTop: "9.1rem" }}>
              <ul
                css={{
                  display: "flex",
                  "& > li:not(:last-of-type)": { marginRight: "3.3rem" },
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
      <div className="container" css={{ marginTop: "13.9rem" }}>
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
