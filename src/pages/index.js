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
          <p className="long-paragraph">
            {t("home.collection-section-description")}
          </p>
          <ProductCards cards={Cards} />
          <div className="section-collection__btn">
            <a href="/shop/" className="btn btn--secondary btn">
              {t("home.collection-section-collection-btn")}
            </a>
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
