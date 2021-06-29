import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import Layout from "../components/Layout"
import Lookbook from "../components/Lookbook"
import "../scss/pages/lookbook.scss"

const LookbookPage = ({
  data: {
    allInstaNode: { edges },
  },
}) => {
  const { t } = useTranslation()

  return (
    <Layout
      seoPageTitle={t("lookbookPage.pageTitle")}
      seoDescription={t("lookbookPage.description")}
    >
      <section className="section-lookbook">
        <div className="section-lookbook__headline">
          <svg className="section-lookbook__icon">
            <use xlinkHref="/svg/main.svg#instagram"></use>
          </svg>{" "}
          <h1 className="heading-2">Lookbook</h1>
        </div>
        <Lookbook items={edges} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query InstagramPostQuery($locale: String!) {
    allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 150) {
      edges {
        node {
          id
          username
          likes
          caption
          comments
          hashtags
          timestamp
          permalink
          localFile {
            childImageSharp {
              gatsbyImageData(width: 520, layout: CONSTRAINED)
            }
          }
          carouselImages {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 520, layout: CONSTRAINED)
              }
            }
          }
          linkedProducts(locale: $locale) {
            id
            uid
            data {
              name
            }
          }
        }
      }
    }
  }
`

export default LookbookPage
