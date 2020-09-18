import React from "react"

import Img from "gatsby-image"

export const Thumb = ({ selected, onClick, imgSrc }) => (
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
      {/*<img className="embla__slide__thumbnail" src={imgSrc} alt="A cool cat." />*/}
      <Img className="gallery__slide__thumbnail" fixed={imgSrc} />
    </button>
  </div>
)
