import React from "react"; // eslint-disable-line no-unused-vars
import { useTranslation } from "gatsby-plugin-react-i18next";
import mq from "../theme/media-queries";
import { GatsbyImage } from "gatsby-plugin-image";
import { useTheme } from "@emotion/react";

const Thumbnail = ({ selected, onClick, imgSrc, imgAlt, color }) => (
  <div
    css={{
      paddingLeft: "0",
      minWidth: "20%",
      border: selected ? `2px solid ${color}` : `1px solid ${color}`,
      [mq("md")]: {
        minWidth: "25%",
      },
      [mq("sm")]: {
        minWidth: "50%",
      },
    }}
  >
    <button
      onClick={onClick}
      type="button"
      css={{
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        touchAction: "manipulation",
        cursor: "pointer",
        border: "0",
        outline: "0",
        margin: "0",
        padding: "0",
        height: "10rem",
        width: "100%",
        backgroundColor: "transparent",
        position: "relative",
        display: "block",
        overflow: "hidden",
      }}
    >
      <GatsbyImage
        width={74}
        image={imgSrc}
        alt={imgAlt}
        css={{
          opacity: selected ? "1" : "0.2",
          transition: "opacity 0.2s ease",
        }}
      />
    </button>
  </div>
);

const ImageGalleryThumbnails = ({
  selectedIndex,
  images,
  thumbViewportRef,
  onThumbClick,
  fallbackAltText,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { PRIMARY } = theme.colors;
  return (
    <>
      <div
        css={{
          padding: "5px 5px 20px 5px",
          marginTop: "-16px",
          textAlign: "center",
          color: "#333",
          fontSize: "1.2rem",
        }}
      >
        {t("product.image")} {selectedIndex + 1} {t("product.of")}{" "}
        {images.length}
      </div>
      <div
        css={{
          position: "relative",
          padding: "2rem",
          maxWidth: "670px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "0",
          marginTop: "-12px",
        }}
      >
        <div
          ref={thumbViewportRef}
          css={{
            overflow: "hidden",
            width: " 100%",
            "&.is-draggable": {
              cursor: "grab",
            },
            "&__viewport.is-dragging": {
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
              marginLeft: "-1rem",
              paddingTop: "0",
              marginTop: "-12px",
            }}
          >
            {images.map((image, index) => {
              return (
                <Thumbnail
                  onClick={() => onThumbClick(index)}
                  selected={index === selectedIndex}
                  imgSrc={image.gatsbyImageData}
                  imgAlt={image.altText || fallbackAltText}
                  key={image.id}
                  color={PRIMARY}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ImageGalleryThumbnails, (prevProps, nextProps) => {
  /*
      When using this function you always need to return
      a Boolean. For now we'll say the props are NOT equal
      which means the component should rerender.
    */
  return prevProps.thing === nextProps.thing;
});
