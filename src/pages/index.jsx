import * as React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import ProductListing from "../components/product-listing"

const IndexPage = ({ data }) => {
  console.log(data)
  const { t } = useTranslation()
  return (
    <div>
      <h1>{t("title")}</h1>
      <ProductListing products={data?.collection?.products} />
    </div>
  )
}

export const query = graphql`
  query ($language: String!) {
    collection: shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

export default IndexPage
