import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const ProductPage = ({ data }) => {
  const product = data.gcms.product
  console.log(product.localizations[0])

  return (
    <React.Fragment>
      <h1>{product.localizations[0].name}</h1>
      <div style={{ maxWidth: "560px" }}>
        {product.images.map(image => {
          return <Img fluid={image.node.childImageSharp.fluid} />
        })}
      </div>
      <p>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(product.price)}
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: product.localizations[0].description.html,
        }}
      />
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query ProductPageQuery($id: ID!) {
    gcms {
      product(where: { id: $id }) {
        id
        price
        salePrice
        sale
        localizations(locales: nl) {
          id
          name
          locale
          slug
          description {
            html
          }
        }
        images {
          id
          alt
          url
          node {
            childImageSharp {
              fluid(maxWidth: 560) {
                base64
                aspectRatio
                originalImg
                originalName
                tracedSVG
                srcWebp
                srcSetWebp
                src
                srcSet
                sizes
                presentationHeight
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`

export default ProductPage
