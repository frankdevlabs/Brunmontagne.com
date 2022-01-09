import React from "react" // eslint-disable-line no-unused-vars
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import ProductListing from "../components/product-listing"
import LayoutContainer from "../containers/layout-container"

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

const IndexPage = ({ data, pageContext }) => {
  console.log(pageContext)
  const { t } = useTranslation()
  const description = t("description")
  const title = t("pageTitle")
  console.log(description, title)
  return (
    <LayoutContainer
      title={title}
      description={description}
      path="/"
      type="website"
      lang={pageContext.i18n.language}
    >
      <h1>{t("title")}</h1>
      <ProductListing products={data?.collection?.products} />
    </LayoutContainer>
  )
}

export default IndexPage
