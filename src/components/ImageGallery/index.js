import React, { useState, useEffect, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useEmblaCarousel } from "embla-carousel/react"
import Img from "gatsby-image"
import { Thumb } from "./thumbnail"
import { SRLWrapper } from "simple-react-lightbox"
import "./gallery.scss"

const Index = ({ images }) => {
  const { t } = useTranslation("translation")

  const [firstImageID, setFirstImageID] = useState(images[0].node.id)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainViewportRef, embla] = useEmblaCarousel()
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    selectedClass: "",
  })

  const onThumbClick = useCallback(
    index => {
      if (!embla || !emblaThumbs) return
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index)
    },
    [embla, emblaThumbs]
  )

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return
    setSelectedIndex(embla.selectedScrollSnap())
    emblaThumbs.scrollTo(embla.selectedScrollSnap())
  }, [embla, emblaThumbs, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    else if (firstImageID !== images[0].node.id) {
      setFirstImageID(images[0].node.id)
      embla.scrollTo(0)
    }
    onSelect()
    embla.on("select", onSelect)
  }, [embla, onSelect, firstImageID, images, setFirstImageID])
  return (
    <>
      <SRLWrapper>
        <div className="gallery">
          <div className="gallery__viewport" ref={mainViewportRef}>
            <div className="gallery__container">
              {images.map(image => (
                <div className="gallery__slide" key={image.node.id}>
                  <div className="gallery__slide__inner">
                    <Img
                      fluid={image.node.childImageSharp.fluid}
                      style={{ margin: "1rem", maxHeight: "calc(50vh - 4rem)" }}
                      imgStyle={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SRLWrapper>
      <div className="gallery gallery--counter">
        {t("product.image")} {selectedIndex + 1} {t("product.of")}{" "}
        {images.length}
      </div>
      <div className="gallery gallery--thumb">
        <div className="gallery__viewport" ref={thumbViewportRef}>
          <div className="gallery__container gallery__container--thumb">
            {images.map((image, index) => {
              return (
                <Thumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  imgSrc={image.node.childImageSharp.fixed}
                  key={image.node.id}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
