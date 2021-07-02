import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { getImage } from "gatsby-plugin-image"
import BackgroundImage from "../components/BackgroundImage"
import Layout from "../components/Layout"
import Product from "../components/Product"
import ProductSpecifications from "../components/ProductSpecifications"
import Reviews from "../components/Reviews"
import ReviewForm from "../components/ReviewForm"
import "../scss/templates/productPage.scss"
import ProductSuggestions from "../components/ProductSuggestions"

const ProductPage = props => {
  const { t } = useTranslation()
  const {
    data,
    location,
    pageContext: { images },
  } = props

  const isWatchStrap =
    data.productPage.data.categories.filter(
      i => i.category.document.uid === "watch-strap"
    ).length > 0
  const pluginImage = getImage(
    images.data.backgroundProductPage.childImageSharp.gatsbyImageData
  )
  const gradient = `linear-gradient(
                      to right bottom,
                      rgba(255, 255, 255, 0.85),
                      rgba(255, 255, 255, 0.88)
      )`
  const bgImage = [gradient, pluginImage]

  const strapSuggestionsTitle = isWatchStrap
    ? t("product.isWatchStrap.strapSuggestionsTitle")
    : t("product.isWatch.strapSuggestionsTitle")
  const watchSuggestionsTitle = isWatchStrap
    ? t("product.isWatchStrap.watchSuggestionsTitle")
    : t("product.isWatch.watchSuggestionsTitle")
  //
  const noIndex = props.location.pathname.indexOf("/variants/") > 0

  return (
    <Layout
      seoDescription={data.productPage.data.seo.text}
      seoPageTitle={data.productPage.data.name}
      location={location}
      crumbLabel={data.productPage.data.name}
      noIndex={noIndex}
    >
      <section className="section-product">
        <Product isWatchStrap={isWatchStrap} />
      </section>
      {isWatchStrap ? null : (
        <section className="section-specifications">
          <div className="section-specifications__container">
            <ProductSpecifications image={images.data.sketchImage} />
          </div>
        </section>
      )}
      <section className="section-reviews">
        <BackgroundImage image={bgImage} className="section-reviews">
          <Reviews reviews={data.productPage.data.reviews} />
          <ReviewForm uid={data.productPage.uid} />
        </BackgroundImage>
      </section>
      <ProductSuggestions
        lang="nl"
        strapSuggestionsTitle={strapSuggestionsTitle}
        watchSuggestionsTitle={watchSuggestionsTitle}
        listName={data.productPage.data.name}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ProductBySlug($uid: String!, $locale: String!) {
    productPage: prismicProduct(uid: { eq: $uid }, lang: { eq: $locale }) {
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

  fragment ProductFields on PrismicProduct {
    id
    uid
    lang
    data {
      title {
        text
      }
      subtitle {
        text
      }
      collection {
        document {
          ... on PrismicCollection {
            data {
              name
              description {
                html
              }
            }
          }
        }
      }
      images {
        alt
        image {
          localFile {
            id
            publicURL
            childImageSharp {
              gatsbyImageData(
                placeholder: TRACED_SVG
                quality: 50
                breakpoints: [100, 500, 750, 1500]
              )
            }
          }
        }
      }
      name
      seo {
        text
      }
      description {
        html
      }
      specifications {
        specification {
          document {
            ... on PrismicSpecification {
              data {
                key
                value
              }
            }
          }
        }
      }
      variable_product
      price
      discount_price
      discount_active
      sku
      inventory_components {
        component {
          document {
            ... on PrismicInventory {
              id
              data {
                name
                public_name
                stock
                inventory_type
                color
                in_backorder
                backorder_expected_date_available
                material
                images {
                  alt
                  image {
                    localFile {
                      id
                      childImageSharp {
                        gatsbyImageData(width: 74, layout: FIXED)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      categories {
        category {
          document {
            ... on PrismicCategory {
              uid
              data {
                name
                description {
                  html
                }
              }
            }
          }
        }
      }
      reviews {
        review {
          document {
            ... on PrismicReview {
              first_publication_date
              data {
                name
                email
                date
                headline {
                  text
                }
                message {
                  text
                }
                rating
              }
            }
          }
        }
      }
    }
  }
`

export default ProductPage
