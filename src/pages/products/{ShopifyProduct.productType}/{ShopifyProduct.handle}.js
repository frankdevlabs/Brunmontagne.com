import React from "react"; // eslint-disable-line no-unused-vars
import { graphql } from "gatsby";
import LayoutContainer from "../../../containers/layout-container";
import TitleSection from "./_title-section";
import OrderSection from "./_order-section";
import GallerySection from "./_gallery-section";
import ReviewsSection from "./_reviews-section";
import SuggestionsSection from "./_suggestions-section";
// import isEqual from "lodash.isequal"
// import { GatsbyImage, getSrc } from "gatsby-plugin-image"
// import { StoreContext } from "../../../context/store-context"

const Product = (props) => {
  console.log(props);
  const {
    pageContext,
    location,
    data: { product },
  } = props;
  const lang = pageContext.i18n.language;
  const title = product.fields[`${lang}_locale`].title;
  const metaDescription = product.fields[`${lang}_locale`].metaDescription;
  console.log({ title, metaDescription });
  return (
    <LayoutContainer
      title={title}
      description={metaDescription}
      path={location.pathname}
      type="og:product"
      image={product.metaImage}
      lang={pageContext.i18n.language}
    >
      <TitleSection title={title} />
      <GallerySection />
      <OrderSection />
      <ReviewsSection />
      <SuggestionsSection />
    </LayoutContainer>
  );
};

export const query = graphql`
  query ($id: String!, $productType: String!, $language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      metaImage: featuredImage {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 50
          height: 50
          aspectRatio: 1
        )
      }
      fields {
        nl_locale {
          title
          description
          metaDescription
        }
        en_locale {
          title
          description
          metaDescription
        }
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        fields {
          nl_locale {
            title
          }
          en_locale {
            title
          }
        }
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

export default Product;
