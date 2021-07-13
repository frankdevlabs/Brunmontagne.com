import React from "react"
import Reviews from "../Reviews"
import ReviewForm from "../ReviewForm"
import BackgroundImage from "../BackgroundImage"
import { getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

const ProductReviews = ({ reviews, uid }) => {
  const image = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "Adjustments.jpeg" }) {
        childImageSharp {
          gatsbyImageData(width: 878, quality: 70, webpOptions: { quality: 70 })
        }
      }
    }
  `)
  const pluginImage = getImage(image.file.childImageSharp.gatsbyImageData)
  const gradient = `linear-gradient(
                      to right bottom,
                      rgba(255, 255, 255, 0.85),
                      rgba(255, 255, 255, 0.88)
      )`
  const bgImage = [gradient, pluginImage]
  return (
    <BackgroundImage image={bgImage} className="section-reviews">
      <Reviews reviews={reviews} />
      <ReviewForm uid={uid} />
    </BackgroundImage>
  )
}

export default ProductReviews
