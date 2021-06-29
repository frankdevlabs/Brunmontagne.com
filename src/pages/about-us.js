import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Parapgraphs from "../components/Paragraphs"
import "../scss/pages/about-us.scss"

const AboutUsPage = ({ data: { prismicAboutPage } }) => {
  const {
    data: { seo_description, paragraphs, title },
  } = prismicAboutPage

  return (
    <Layout seoPageTitle={title.text} seoDescription={seo_description}>
      <section className="section-about">
        <h1 className="heading-2">{title.text}</h1>
        <Parapgraphs data={paragraphs} />
      </section>
    </Layout>
  )
}

export default AboutUsPage

export const pageQuery = graphql`query AboutUsPageQuery($locale: String!) {
  prismicAboutPage(lang: {eq: $locale}) {
    id
    uid
    data {
      seo_description
      title {
        text
      }
      paragraphs {
        paragraphType
        alt
        image {
          childImageSharp {
            gatsbyImageData(width: 215, layout: CONSTRAINED)
          }
        }
        content {
          html
          text
        }
      }
    }
  }
}
`
