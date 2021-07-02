import React, { useState, useEffect, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useEmblaCarousel } from "embla-carousel/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Thumb } from "./thumbnail"
import { SRLWrapper } from "simple-react-lightbox"

const Index = ({ images }) => {
  const { t } = useTranslation("translation")

  const [firstImageID, setFirstImageID] = useState(images[0].image.localFile.id)
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
    else if (firstImageID !== images[0].image.id) {
      setFirstImageID(images[0].image.id)
      embla.scrollTo(0)
    }
    onSelect()
    embla.on("select", onSelect)
  }, [embla, onSelect, firstImageID, images, setFirstImageID])
  return (
    <>
      <SRLWrapper options={{ thumbnails: { showThumbnails: false } }}>
        <div className="gallery">
          <div className="gallery__viewport" ref={mainViewportRef}>
            <div className="gallery__container">
              {images.map(({ image, alt }) => {
                return (
                  <div className="gallery__slide" key={image.localFile.id}>
                    <div className="gallery__slide__inner">
                      <a href={image.localFile.publicURL} data-attribute="SRL">
                        <GatsbyImage
                          image={
                            image.localFile.childImageSharp.gatsbyImageData
                          }
                          style={{
                            margin: "1rem",
                            maxHeight: "calc(50vh - 4rem)",
                          }}
                          imgStyle={{ objectFit: "contain" }}
                          alt={alt}
                        />
                      </a>
                    </div>
                  </div>
                )
              })}
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
          <div className="gallery__container gallery--thumb">
            {images.map(({ image, alt }, index) => {
              return (
                <Thumb
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  imgSrc={image.localFile.childImageSharp.gatsbyImageData}
                  imgAlt={alt}
                  key={image.localFile.id}
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
