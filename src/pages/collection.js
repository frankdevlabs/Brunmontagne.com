import React from "react"
import Layout from "../components/Layout"
import "./collection.scss"
import ProductCards from "../components/ProductCards"
import ParseImageData from "../utils/parseImageData"
import { graphql } from "gatsby"

const CollectionPage = ({ data }) => {
  const StrapCards = ParseImageData(data.watchStraps.edges)
  const WatchCards = ParseImageData(data.watches.edges)
  return (
    <Layout>
      <section id="watches" className="section-watches">
        <div className="section-watches__container">
          <h3 className="heading-3">Horloges</h3>
          <ProductCards cards={WatchCards} />
        </div>
      </section>
      <section className="section-collection-media">
        <div className="section-collection-media__container">media</div>
      </section>
      <section id="watch-straps" className="section-watch-straps">
        <div className="section-watch-straps__container">
          <h3 className="heading-3">Losse banden bij de Representor</h3>
          <ProductCards cards={StrapCards} />
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query CollectionQuery($locale: String!) {
    watchStraps: allPrismicProduct(
      filter: {
        lang: { eq: $locale }
        data: {
          variable_product: { eq: false }
          categories: {
            elemMatch: { category: { uid: { eq: "watch-strap" } } }
          }
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
    watches: allPrismicProduct(
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

export default CollectionPage
