import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Product from "../components/Product"
import Reviews from "../components/Reviews"
import ProductCards from "../components/ProductCards"
import "./productPage.scss"

const ProductPage = props => {
  const { data, location } = props
  console.log(data)
  const StrapCards = data.watchStraps.edges.reduce(
    (acc, cur) => [
      ...acc,
      { id: cur.node.id, uid: cur.node.uid, ...cur.node.data },
    ],
    []
  )
  const WatchCards = data.watches.edges.reduce(
    (acc, cur) => [
      ...acc,
      { id: cur.node.id, uid: cur.node.uid, ...cur.node.data },
    ],
    []
  )
  return (
    <Layout
      seoDescription={data.productPage.data.seo.text}
      seoPageTitle={data.productPage.data.name}
      location={location}
      crumbLabel={data.productPage.data.name}
    >
      <section className="section-product">
        <Product />
      </section>
      <section className="section-reviews">
        <Reviews reviews={data.productPage.data.reviews} />
      </section>
      <section className="section-product-strap-suggestions">
        <div className="section-product-strap-suggestions__straps">
          <h3 className="heading-3">Bekijk onze ook onze banden</h3>
          <ProductCards cards={StrapCards} />
        </div>
        <div className="section-product-strap-suggestions__watches">
          <h3 className="heading-3">Of... bekijk onze modellen</h3>
          <ProductCards cards={WatchCards} />
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
          childImageSharp {
            fluid(maxWidth: 560) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 74) {
              ...GatsbyImageSharpFixed
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
                material
                images {
                  alt
                  node {
                    id
                    childImageSharp {
                      fixed(width: 74) {
                        ...GatsbyImageSharpFixed
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
