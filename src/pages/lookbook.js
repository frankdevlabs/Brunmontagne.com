import React from "react"
import Layout from "../components/Layout"
import Img from "gatsby-image"
import "./lookbook.scss"
import { graphql } from "gatsby"

const LookbookPage = ({
  data: {
    allInstaNode: { edges },
  },
}) => {
  console.log(edges.length)
  return (
    <Layout>
      <section className="section-lookbook">
        <div className="section-lookbook__headline">
          <svg className="section-lookbook__icon">
            <use xlinkHref="/svg/main.svg#instagram"></use>
          </svg>
          <h2 className="heading-2">Instagram Lookbook</h2>
        </div>
        <div className="section-lookbook__gallery">
          {edges.map(({ node }) => {
            return (
              <div key={node.id} className="section-lookbook__gallery-item">
                <Img
                  className="section-lookbook__gallery-image"
                  fluid={node.localFile.childImageSharp.fluid}
                  alt="person writing in a notebook beside by an iPad, laptop, printed photos, spectacles, and a cup of coffee on a saucer"
                />
              </div>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query InstagramPostQuery {
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
        }
      }
    }
  }
`

export default LookbookPage
