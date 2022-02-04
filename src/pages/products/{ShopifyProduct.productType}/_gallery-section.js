import React from "react"; // eslint-disable-line no-unused-vars
import ImageGallery from "../../../components/image-gallery";

const Gallery = ({ images, title }) => {
  return (
    <section
      css={{
        paddingTop: "0 !important",
      }}
    >
      <ImageGallery
        images={images}
        fallbackAltText={title}
        hasThumnails={process.env.GATSBY_IMAGE_GALLERY_THUMBNAILS === "1"}
        hasNavigationDots={process.env.GATSBY_IMAGE_GALLERY_NAVIGATION === "1"}
      />
    </section>
  );
};

export default React.memo(Gallery);
