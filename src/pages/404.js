import React from "react"
import { graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"
import BackgroundImage from "../components/BackgroundImage"
import ExtLink from "../components/ExternalLink"
import Layout from "../components/Layout"
import "../scss/pages/404.scss"

const NotFoundPage = ({ data: { background } }) => {
  const { t } = useTranslation("translation")
  const sectionImage = [
    `
      linear-gradient(
        to right bottom,
        rgba(240,147,43, 0.5),
        rgba(240,147,43, 0.5)
      )`,
    getImage(background),
  ]
  return (
    <Layout
      seoPageTitle={t("404.pageTitle")}
      seoDescription={t("404.description")}
    >
      <section>
        <BackgroundImage className={`section-404`} image={sectionImage}>
          <div className="section-404__container">
            <div className={`section-404__text background"`}>
              <h1 className="heading-1 white-text ">Oops!</h1>
              <p className="long-paragraph white-text">{t("404.pageTitle")}</p>
              <p className="long-paragraph white-text">
                {t("404.msg")}{" "}
                <ExtLink
                  to="mailto:info@brunmontagne.com"
                  targetBlank={false}
                  mode="secondary"
                >
                  info@brunmontagne.com
                </ExtLink>
                .
              </p>
              <div className="section-404__btn">
                <a href="/shop/" className="btn btn--primary btn">
                  {t("404.btn")}
                </a>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query NotFoundPageQuery {
    background: file(relativePath: { eq: "randy-laybourne-unsplash.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 1920, quality: 70, webpOptions: { quality: 70 })
      }
    }
  }
`

export default NotFoundPage
