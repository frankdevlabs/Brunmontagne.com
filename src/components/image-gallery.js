import React, { useState, useEffect, useCallback } from "react"; // eslint-disable-line no-unused-vars
import useEmblaCarousel from "embla-carousel-react";
import { GatsbyImage } from "gatsby-plugin-image";
import { SRLWrapper } from "simple-react-lightbox";
import { useTheme } from "@emotion/react";
import NavRight from "../assets/vectors/nav-right.svg";
import NavLeft from "../assets/vectors/nav-left.svg";
import ImageGalleryThumbnails from "./image-gallery-thumbnails";
import ImageGalleryNavigation from "./image-gallery-navigation";
import mq from "../theme/media-queries";

const NavButton = ({ direction, disabled, onClick, children, color }) => (
  <button
    css={{
      outline: "0",
      cursor: "pointer",
      backgroundColor: "transparent",
      touchAction: "manipulation",
      position: "absolute",
      zIndex: "1",
      top: "50%",
      transform: "translateY(-50%)",
      border: "0",
      width: "30px",
      height: "30px",
      justifyContent: "center",
      alignItems: "center",
      fill: color,
      padding: "0",
      ...(direction === "prev" ? { left: "27px" } : { right: "27px" }),
      "&:disabled": {
        cursor: "default",
        opacity: "0.3",
      },
      "& > svg": {
        width: "100%",
        height: "100%",
      },
    }}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const PrevButton = ({ enabled, onClick, color }) => (
  <NavButton
    direction="prev"
    onClick={onClick}
    disabled={!enabled}
    color={color}
  >
    <NavLeft />
  </NavButton>
);

const NextButton = ({ enabled, onClick, color }) => (
  <NavButton
    direction="next"
    onClick={onClick}
    disabled={!enabled}
    color={color}
  >
    <NavRight />
  </NavButton>
);

const ImageGallery = ({
  images,
  hasThumnails,
  hasNavigationDots,
  fallbackAltText,
}) => {
  const theme = useTheme();
  const { PRIMARY_LIGHT, TERTIARY } = theme.colors;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [mainViewportRef, embla] = useEmblaCarousel();
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
  });
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  );

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || (hasThumnails && !emblaThumbs)) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla || (hasThumnails && !emblaThumbs)) return;
    setSelectedIndex(embla.selectedScrollSnap());
    if (hasThumnails) emblaThumbs.scrollTo(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla || (hasThumnails && !emblaThumbs)) return;
    onSelect();
    if (hasNavigationDots) setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, onSelect, emblaThumbs]);
  return (
    <div
      css={{
        backgroundColor: PRIMARY_LIGHT,
        maxWidth: "761px",
      }}
    >
      <SRLWrapper options={{ thumbnails: { showThumbnails: false } }}>
        <div
          css={{
            position: "relative",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "4px",
          }}
        >
          <div
            ref={mainViewportRef}
            css={{
              overflow: "hidden",
              width: " 100%",
              "&.is-draggable": {
                cursor: "grab",
              },
              "&.is-dragging": {
                cursor: "grabbing",
              },
            }}
          >
            <div
              css={{
                display: "flex",
                userSelect: "none",
                WebkitTouchCallout: "none",
                KhtmlUserSelect: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {images.map((image) => {
                return (
                  <div
                    key={image.id}
                    css={{
                      minWidth: "100%",
                      position: "relative",
                    }}
                  >
                    <div
                      css={{
                        position: "relative",
                        overflow: "hidden",
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%",
                      }}
                    >
                      <a
                        href={image.gatsbyImageData.images.fallback.src}
                        data-attribute="SRL"
                      >
                        <GatsbyImage
                          image={image.gatsbyImageData}
                          style={{
                            maxHeight: "42.8rem",
                          }}
                          alt={image.altText || fallbackAltText}
                        />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <PrevButton
            onClick={scrollPrev}
            enabled={prevBtnEnabled}
            color={TERTIARY}
          />
          <NextButton
            onClick={scrollNext}
            enabled={nextBtnEnabled}
            color={TERTIARY}
          />
        </div>
      </SRLWrapper>
      {hasThumnails && (
        <ImageGalleryThumbnails
          onThumbClick={onThumbClick}
          images={images}
          selectedIndex={selectedIndex}
          thumbViewportRef={thumbViewportRef}
          fallbackAltText={fallbackAltText}
        />
      )}
      {hasNavigationDots && (
        <ImageGalleryNavigation
          selectedIndex={selectedIndex}
          scrollSnaps={scrollSnaps}
          scrollTo={scrollTo}
        />
      )}
    </div>
  );
};

export default ImageGallery;
