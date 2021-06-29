import React from "react"
import { BgImage } from "gbimage-bridge"

const BackgroundImageWrapper = ({ className, image, children }) => {
  return (
    <BgImage image={image} className={className}>
      {children}
    </BgImage>
  )
}

export default BackgroundImageWrapper
