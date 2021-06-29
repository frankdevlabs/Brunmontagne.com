import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import "../scss/templates/page.scss"

const Page = ({ data: { page } }) => {
  const {
    data: { title, seo_page_title, seo_description, paragraphs },
  } = page

  return (
    <Layout
      seoPageTitle={seo_page_title}
      seoDescription={seo_description}
      noIndex={true}
    >
      <section className="section-page">
        <h1 className="heading-2">{title.text}</h1>
        <div className="section-page__content">
          {paragraphs.map(paragraph => (
            <div dangerouslySetInnerHTML={{ __html: paragraph.content.html }} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($uid: String!, $locale: String!) {
    page: prismicPage(uid: { eq: $uid }, lang: { eq: $locale }) {
      data {
        title {
          text
        }
        seo_page_title
        seo_description
        paragraphs {
          content {
            html
          }
        }
      }
    }
  }
`

export default Page
