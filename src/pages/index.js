import React from "react"
import { useTranslation } from "react-i18next"
import Layout from "../components/Layout"
import ProductCards from "../components/ProductCards"

import "./home.scss"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const { t } = useTranslation()
  const Cards = data.landingPage.edges.reduce(
    (acc, cur) => [
      ...acc,
      { id: cur.node.id, uid: cur.node.uid, ...cur.node.data },
    ],
    []
  )
  return (
    <Layout
      seoPageTitle={t("home.pageTitle")}
      seoDescription={t("home.description")}
      headerMode="home"
    >
      <section className="section-collection">
        <div className="section-collection__container ">
          <h2 className="heading-2">{t("home.collection-section-title")}</h2>
          <ProductCards cards={Cards} />
          <div className="section-collection__btn">
            <a href="/shop/" className="btn btn--secondary btn">
              {t("home.collection-section-collection-btn")}
            </a>
          </div>
        </div>
      </section>
      <section className="section-story">
        <div className="section-story__container">
          <div className="section-story__columns columns">
            <div className="section-story__text column">
              <blockquote className="section-story__quote">
                Opvallen, zonder hierin te overdrijven en geschikt voor iedere
                gelegenheid. <br /> <br /> Dat is de filosofie achter de
                horloges van Brunmontagne. Uniek, stijlvol en tijdloos.
                <span>Pascal Bruinenberg, oprichter Brunmontagne</span>
              </blockquote>
            </div>
            <div className="section-story__video column">
              <div className="section-story__video-container">
                <iframe
                  title="Passie"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/BOKKEjAn0Xc"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-media">
        <div className="section-media__container">
          <div className="section-media__columns columns">
            <div className="section-media__text column">
              <h3 className="heading-3">In de media</h3>
            </div>
            <div className="section-media__text column"></div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query LandingPageProductCards($locale: String!) {
    landingPage: allPrismicProduct(
      limit: 4
      filter: {
        lang: { eq: $locale }
        data: {
          variable_product: { eq: false }
          categories: { elemMatch: { category: { uid: { eq: "watches" } } } }
        }
      }
    ) {
      edges {
        node {
          ...ProductFields
          data {
            variable_products {
              product {
                document {
                  ... on PrismicProduct {
                    ...ProductFields
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
