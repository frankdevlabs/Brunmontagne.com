import React from "react"
import BackgroundImage from "gatsby-background-image-es5"

const BackgroundImageWrapper = ({ className, tag, image, children }) => {
  return (
    <BackgroundImage
      Tag={tag}
      className={className}
      fluid={image}
      preserveStackingContext={true}
      style={{ backgroundSize: "cover" }}
    >
      {children}
    </BackgroundImage>
  )
}

export default BackgroundImageWrapper
