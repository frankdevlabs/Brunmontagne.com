import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { getImage } from "gatsby-plugin-image"
import Blockquote from "../components/Blockquote"
import BackgroundImage from "../components/BackgroundImage"
import Layout from "../components/Layout"
import ProductCards from "../components/ProductCards"
import ParseImageData from "../utils/parseImageData"
import "../scss/pages/collection.scss"

const CollectionPage = ({ data }) => {
  const { t } = useTranslation()

  const StrapCards = ParseImageData(data.watchStraps.edges)
  const WatchCards = ParseImageData(data.watches.edges)

  return (
    <Layout
      seoPageTitle={t("collection.pageTitle")}
      seoDescription={t("collection.description")}
    >
      <section id="watches" className="section-watches">
        <div className="section-watches__container">
          <h1 className="heading-3">{t("collection.watchTitle")}</h1>
          <ProductCards cards={WatchCards} list="Collection - Watch" />
        </div>
      </section>
      <section className="section-collection-media">
        <MediaSectionContainer
          className={`section-collection-media__container`}
          image={data.backgroundImageMediaSection}
        >
          <div className="section-collection-media__quote">
            <Blockquote>
              {t("home.section-story-quote-1")}
              <br /> <br /> {t("home.section-story-quote-2")}
              <span>{t("home.section-story-pascal")}</span>
            </Blockquote>
          </div>
        </MediaSectionContainer>
      </section>
      <section id="watch-straps" className="section-watch-straps">
        <div className="section-watch-straps__container">
          <h3 className="heading-3">{t("collection.strapTitle")}</h3>
          <ProductCards cards={StrapCards} list="Collection - Straps" />
        </div>
      </section>
    </Layout>
  )
}

const MediaSectionContainer = ({ className, image, children }) => {
  const sectionImage = [
    `linear-gradient(
                      to right bottom,
                      rgba(255, 255, 255, 0.7),
                      rgba(255, 255, 255, 0.7)
      )`,
    getImage(image),
  ]
  return (
    <BackgroundImage className={className} image={sectionImage}>
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
          ...ProductPageFields
          data {
            variable_products {
              product {
                document {
                  ... on PrismicProduct {
                    ...ProductPageFields
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
          ...ProductPageFields
          data {
            variable_products {
              product {
                document {
                  ... on PrismicProduct {
                    ...ProductPageFields
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
        gatsbyImageData(width: 878, quality: 70, webpOptions: { quality: 70 })
      }
    }
  }
`

export default CollectionPage
