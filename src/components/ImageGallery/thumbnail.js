import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

export const Thumb = ({ selected, onClick, imgSrc, imgAlt }) => (
  <div
    className={`gallery__slide gallery__slide--thumb ${
      selected ? "is-selected" : ""
    }`}
  >
    <button
      onClick={onClick}
      className="gallery__slide__inner gallery__slide__inner--thumb"
      type="button"
    >
      <GatsbyImage
        width={74}
        image={imgSrc}
        className="gallery__slide__thumbnail"
        alt={imgAlt}
      />
    </button>
  </div>
)
