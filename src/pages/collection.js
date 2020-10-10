import React from "react"
import Layout from "../components/Layout"
import "./collection.scss"
import ProductCards from "../components/ProductCards"
import ParseImageData from "../utils/parseImageData"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image-es5"
import Blockquote from "../components/Blockquote"

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
        <MediaSectionContainer
          className={`section-collection-media__container`}
          image={data.backgroundImageMediaSection.childImageSharp.fluid}
        >
          <div className="section-collection-media__quote">
            <Blockquote>
              Een extra horlogeband van Brunmontagne sluit uiteraard perfect aan
              op de sluiting van de Representor.
              <span>Pascal Bruinenberg, oprichter Brunmontagne</span>
            </Blockquote>
          </div>
        </MediaSectionContainer>
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

const MediaSectionContainer = ({ className, image, children }) => {
  const backgroundFluidImageStack = [
    `linear-gradient(
                      to right bottom,
                      rgba(255, 255, 255, 0.7),
                      rgba(255, 255, 255, 0.7)
      )`,
    image,
  ]
  return (
    <BackgroundImage
      Tag="div"
      className={className}
      fluid={backgroundFluidImageStack}
      preserveStackingContext={true}
      style={{ backgroundSize: "cover" }}
    >
      {children}
    </BackgroundImage>
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
    backgroundImageMediaSection: file(
      relativePath: { eq: "Adjustments.jpeg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 878) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default CollectionPage
