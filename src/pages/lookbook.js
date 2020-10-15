import React from "react"
import Layout from "../components/Layout"
import Lookbook from "../components/Lookbook"
import "./lookbook.scss"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

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
          <h2 className="heading-2">Lookbook</h2>
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
              fluid(maxWidth: 520) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          carouselImages {
            localFile {
              childImageSharp {
                fluid(maxWidth: 520) {
                  ...GatsbyImageSharpFluid
                }
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
