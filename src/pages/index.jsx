import * as React from "react"
import { graphql } from "gatsby"
import ProductListing from "../components/product-listing"

const IndexPage = ({ data }) => (
  <div>
    <h1>Brunmontagne &mdash; Represents you</h1>
    <ProductListing products={data?.shopifyCollection?.products} />
  </div>
)

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`

export default IndexPage
