import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Parapgraphs from "../components/Paragraphs"
import "./about-us.scss"

const AboutUsPage = ({ data: { prismicAboutPage } }) => {
  const {
    data: { seo_description, paragraphs, title },
  } = prismicAboutPage

  return (
    <Layout seoPageTitle={title.text} seoDescription={seo_description}>
      <section className="section-about">
        <h2 className="heading-2">{title.text}</h2>
        <Parapgraphs data={paragraphs} />
      </section>
    </Layout>
  )
}

export default AboutUsPage

export const pageQuery = graphql`
  query AboutUsPageQuery($locale: String!) {
    prismicAboutPage(lang: { eq: $locale }) {
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
              fluid(maxWidth: 215) {
                ...GatsbyImageSharpFluid
              }
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