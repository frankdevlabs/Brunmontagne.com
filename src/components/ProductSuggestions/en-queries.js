import { graphql, useStaticQuery } from "gatsby"

const ENQueries = () => {
  return useStaticQuery(graphql`
    query ENSuggestionQuery {
      watchStraps: allPrismicProduct(
        limit: 4
        filter: {
          lang: { eq: "en-gb" }
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
                      ...ProductFieldsNOIMG
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
          lang: { eq: "en-gb" }
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
                      ...ProductFieldsNOIMG
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
    fragment ProductFieldsNOIMG on PrismicProduct {
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
  `)
}

export default ENQueries
