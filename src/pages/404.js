import React from "react"
import { useTranslation } from "react-i18next"
import Layout from "../components/Layout"
import ExtLink from "../components/ExternalLink"
import "./404.scss"
import BackgroundImage from "../components/BackgroundImage"
import { graphql } from "gatsby"

const NotFoundPage = ({ data: { background } }) => {
  const { t } = useTranslation("translation")
  const sectionImage = [
    `
      linear-gradient(
        to right bottom,
        rgba(240,147,43, 0.5),
        rgba(240,147,43, 0.5)
      )`,
    background.childImageSharp.fluid,
  ]
  return (
    <Layout
      seoPageTitle={t("404.pageTitle")}
      seoDescription={t("404.description")}
    >
      <BackgroundImage
        tag="section"
        className={`section-404`}
        image={sectionImage}
      >
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
    </Layout>
  )
}

export const pageQuery = graphql`
  query NotFoundPageQuery {
    background: file(relativePath: { eq: "randy-laybourne-unsplash.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default NotFoundPage
