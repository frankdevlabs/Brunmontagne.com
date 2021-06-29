import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import BackgroundImage from "../components/BackgroundImage"
import Layout from "../components/Layout"
import Product from "../components/Product"
import ProductCards from "../components/ProductCards"
import ProductSpecifications from "../components/ProductSpecifications"
import Reviews from "../components/Reviews"
import ReviewForm from "../components/ReviewForm"
import ParseImageData from "../utils/parseImageData"
import "../scss/templates/productPage.scss"

const ProductPage = props => {
  const { t } = useTranslation()
  const { data, location } = props
  const StrapCards = ParseImageData(data.watchStraps.edges)
  const WatchCards = ParseImageData(data.watches.edges)
  const isWatchStrap =
    data.productPage.data.categories.filter(
      i => i.category.document.uid === "watch-strap"
    ).length > 0
      ? true
      : false

  const image = [
    `linear-gradient(
                      to right bottom,
                      rgba(255, 255, 255, 0.85),
                      rgba(255, 255, 255, 0.88)
      )`,
    data.backgroundProductPage.childImageSharp.gatsbyImageData,
  ]

  const strapSuggestionsTitle = isWatchStrap
    ? t("product.isWatchStrap.strapSuggestionsTitle")
    : t("product.isWatch.strapSuggestionsTitle")
  const watchSuggestionsTitle = isWatchStrap
    ? t("product.isWatchStrap.watchSuggestionsTitle")
    : t("product.isWatch.watchSuggestionsTitle")

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
            <ProductSpecifications image={data.sketchImage} />
          </div>
        </section>
      )}
      <BackgroundImage className="section-reviews" image={image} tag="section">
        <Reviews reviews={data.productPage.data.reviews} />
        <ReviewForm uid={data.productPage.uid} />
      </BackgroundImage>
      <section className="section-product-strap-suggestions">
        <div className="section-product-strap-suggestions__straps">
          <h3 className="heading-3">{strapSuggestionsTitle}</h3>
          <ProductCards
            cards={StrapCards}
            list={`${data.productPage.data.name} - strap suggestions`}
          />
        </div>
        <div className="section-product-strap-suggestions__watches">
          <h3 className="heading-3">{watchSuggestionsTitle}</h3>
          <ProductCards
            cards={WatchCards}
            list={`${data.productPage.data.name} - watch suggestions`}
          />
        </div>
      </section>
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
    watchStraps: allPrismicProduct(
      limit: 4
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
      limit: 4
      filter: {
        lang: { eq: $locale }
        data: {
          variable_product: { eq: false }
          categories: { elemMatch: { category: { uid: { eq: "watches" } } } }
        }
        uid: { ne: $uid }
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
    backgroundProductPage: file(relativePath: { eq: "Adjustments.jpeg" }) {
      childImageSharp {
        gatsbyImageData(width: 878, quality: 50)
      }
    }
    sketchImage: file(relativePath: { eq: "representor-product-sketch.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 850, quality: 50)
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
        node {
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
                  node {
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
