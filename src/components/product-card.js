import React from "react" // eslint-disable-line no-unused-vars
import { graphql } from "gatsby"
// import { GatsbyImage } from "gatsby-plugin-image"
// import { getShopifyImage } from "gatsby-source-shopify"

const ProductCard = ({ product, eager }) => {
  return (
    <pre>
      <code>{JSON.stringify({ product: product, eager: eager }, null, 2)}</code>
    </pre>
  )
}

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
      id
      altText
      gatsbyImageData(aspectRatio: 1, width: 640)
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
  }
`

export default ProductCard
