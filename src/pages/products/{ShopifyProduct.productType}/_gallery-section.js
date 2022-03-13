import React from "react"; // eslint-disable-line no-unused-vars
import ImageGallery from "../../../components/image-gallery";

const Gallery = ({ images, title, selectedVariant }) => {
  return (
    <section
      css={{
        paddingTop: "0 !important",
      }}
    >
      <ImageGallery
        images={images}
        fallbackAltText={title}
        selectedVariant={selectedVariant}
        hasThumnails={process.env.GATSBY_IMAGE_GALLERY_THUMBNAILS === "1"}
        hasNavigationDots={process.env.GATSBY_IMAGE_GALLERY_NAVIGATION === "1"}
      />
    </section>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return prevProps.selectedVariant.sku === nextProps.selectedVariant.sku;
};

export default React.memo(Gallery, propsAreEqual);
