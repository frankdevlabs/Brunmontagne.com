import React from "react"; // eslint-disable-line no-unused-vars
import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { convertToBgImage } from "gbimage-bridge";
import BackgroundImage from "gatsby-background-image";
import HeroToMainOverlay from "../../assets/vectors/hero-to-main-overlay.svg";
import Link from "../../components/link";
import mq from "../../theme/media-queries";
import { useTheme } from "@emotion/react";

const SectionWithBackgroundImage = ({ children }) => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(
          relativePath: { eq: "images/background-hero-section.jpg" }
        ) {
          childImageSharp {
            gatsbyImageData(
              width: 1920
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    `
  );
  const image = [
    getImage(placeholderImage),
    `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35))`,
  ].reverse();
  const bgImage = convertToBgImage(image);
  return (
    <BackgroundImage
      Tag="section"
      css={{
        height: "80vh",
        minHeight: "55rem",
        maxHeight: "873px",
        zIndex: 0,
        maxWidth: "1920px",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 0,
        [mq("xl")]: {
          height: "70vh",
          minHeight: "51rem",
        },
        [mq("sm")]: {
          height: "52vh",
        },
      }}
      {...bgImage}
      preserveStackingContext
    >
      {children}
    </BackgroundImage>
  );
};

const HeroSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      <SectionWithBackgroundImage>
        <div
          css={{
            position: "absolute",
            bottom: "-3rem",
            width: "100%",
            [mq("lg")]: {
              bottom: "-7rem",
            },
            [mq("sm")]: {
              bottom: "-9rem",
            },
          }}
        >
          <HeroToMainOverlay />
        </div>
      </SectionWithBackgroundImage>
      <div
        css={{
          position: "absolute",
          top: "20rem",
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
        <div className="container">
          <div
            css={{
              maxWidth: "539px",
              [mq("lg")]: {
                padding: "2%",
                background:
                  "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35))",
                borderRadius: "2px",
              },
            }}
          >
            <h2
              css={{
                fontFamily: "Lato, sans-serif",
                fontSize: "2.6rem",
                lineHeight: "31px",
                letterSpacing: "0.03em",
                [mq("md")]: {
                  fontSize: "2rem",
                  lineHeight: "16px",
                },
              }}
            >
              {t("hero.subtitle")} Brunmontagne
            </h2>
            <h1
              css={{
                marginTop: "1.4rem",
                fontSize: "3.3rem",
                fontWeight: "300",
                lineHeight: "41px",
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                [mq("md")]: {
                  fontSize: "2.5rem",
                  lineHeight: "24px",
                },
              }}
            >
              {t("hero.title-part-1")} {t("hero.title-part-2")}{" "}
              {t("hero.title-part-3")}
            </h1>
            <div
              css={{
                marginTop: "4.1rem",
                [mq("sm")]: {
                  marginTop: "2rem",
                },
                [mq("sm")]: {
                  marginTop: "0",
                },
              }}
            >
              <Link to="/collection/" ui="button">
                {t("hero.button-link")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
