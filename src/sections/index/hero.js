import React from "react" // eslint-disable-line no-unused-vars
import { graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from "gatsby-background-image"
import HeroToMainOverlay from "../../assets/vectors/hero-to-main-overlay.svg"
import Link from "../../components/link"

const SectionWithBackgroundImage = ({ children }) => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(
          relativePath: { eq: "images/background-placeholder.jpg" }
        ) {
          childImageSharp {
            gatsbyImageData(
              width: 1440
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    `
  )
  const image = getImage(placeholderImage)
  const bgImage = convertToBgImage(image)
  return (
    <BackgroundImage
      Tag="section"
      css={{
        height: "80vh",
        minHeight: "40rem",
        zIndex: 0,
        maxWidth: "1440px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      {...bgImage}
      preserveStackingContext
    >
      {children}
    </BackgroundImage>
  )
}

const Hero = () => {
  const { t } = useTranslation()
  return (
    <>
      <SectionWithBackgroundImage>
        <div className="container" css={{ marginTop: "20rem" }}>
          <div css={{ maxWidth: "539px" }}>
            <h2
              css={{
                fontFamily: "Lato, sans-serif",
                fontSize: "2.6rem",
                lineHeight: "31px",
                letterSpacing: "0.03em",
              }}
            >
              {t("hero.subtitle")}{" "}
              <span css={{ textDecorationLine: "underline" }}>
                Brunmontagne
              </span>
            </h2>
            <h1
              css={{
                marginTop: "1.4rem",
                fontSize: "3.6rem",
                fontWeight: "400",
                lineHeight: "41px",
                letterSpacing: "0.01em",
                textTransform: "uppercase",
              }}
            >
              {t("hero.title-including")}{" "}
              <strong>{t("hero.title-automatic")}</strong>{" "}
              {t("hero.title-movement-of")} <strong>SEIKO</strong>
            </h1>
            <div css={{ marginTop: "4.1rem" }}>
              <Link to="/collection/" ui="button">
                {t("hero.button-link")}
              </Link>
            </div>
          </div>
        </div>
      </SectionWithBackgroundImage>
      <div
        css={{
          position: "absolute",
          bottom: "-3rem",
          width: "100%",
        }}
      >
        <HeroToMainOverlay />
      </div>
    </>
  )
}

export default Hero
