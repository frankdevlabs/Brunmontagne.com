import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const ProductPage = ({ data }) => {
  const product = data.gcms.product
  const assets = data.gcms.assets

  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <div style={{ maxWidth: "560px" }}>
        {assets.images.map(image => {
          return <Img fluid={image.node.childImageSharp.fluid} />
        })}
      </div>
      <p>
        {new Intl.NumberFormat("nl-NL", {
          style: "currency",
          currency: "EUR",
        }).format(product.price)}
      </p>
      <div
        dangerouslySetInnerHTML={{
          __html: product.description.html,
        }}
      />
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query ProductPageQuery($id: ID!, $locale: [GraphCMS_Locale!]!) {
    gcms {
      product(where: { id: $id }, locales: $locale) {
        id
        price
        salePrice
        sale
        name
        locale
        slug
        description {
          html
        }
      }
      assets: product(where: { id: $id }) {
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
