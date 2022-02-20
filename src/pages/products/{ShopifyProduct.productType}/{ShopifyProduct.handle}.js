import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  memo,
  useMemo,
} from "react"; // eslint-disable-line no-unused-vars
import { graphql } from "gatsby";
import { useTheme } from "@emotion/react";
import LayoutContainer from "../../../containers/layout-container";
import TitleSection from "./_title-section";
import OrderSection from "./_order-section";
import GallerySection from "./_gallery-section";
import ReviewsSection from "./_reviews-section";
import SuggestionsSection from "./_suggestions-section";
import SpecificationsSection from "./_specifications-section";
import MobileOnlyDescriptionSection from "./_mobile-only-description-section";
import { StoreContext } from "../../../context/store-context";
import { formatPrice } from "../../../utils/format-price";
import mq from "../../../theme/media-queries";

const Product = (props) => {
  const theme = useTheme();
  const {
    pageContext,
    location,
    data: { product, reviews, averageAllReviews, suggestions },
  } = props;

  const {
    variants,
    variants: [initialVariant],
    priceRangeV2,
    images,
    metaImage,
    metafields,
    selectVariant,
    fields,
  } = product;

  const { client } = useContext(StoreContext);

  const [variant, setVariant] = useState({ ...initialVariant });

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant;

  const [available, setAvailable] = useState(productVariant.availableForSale);

  const checkAvailablity = useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? [];

        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [productVariant.storefrontId, client.product]
  );

  const handleVariantChange = (event) => {
    const value = event.target.value;

    if (value === "") {
      return;
    }

    const selectedVariant = variants.find((variant) => variant.id === value);

    setVariant({ ...selectedVariant });
  };

  useEffect(() => {
    checkAvailablity(product.storefrontId);
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  );

  const specifications = metafields.filter((mf) => mf.key === "specifications");
  const hasVariants = variants.length > 1;
  const hasSpecifications = specifications.length === 1;
  const hasReviews = reviews.edges.length > 1;

  const lang = pageContext.i18n.language;
  const title = fields[`${lang}_locale`].title;
  const description = fields[`${lang}_locale`].description;
  const metaDescription = fields[`${lang}_locale`].metaDescription;

  // eslint-disable-next-line react/display-name
  const OrderSectionMemo = memo(() => (
    <OrderSection
      title={title}
      description={description}
      price={price}
      variantId={productVariant.storefrontId}
      available={available}
      hasVariants={hasVariants}
      selectVariant={selectVariant}
      handleVariantChange={handleVariantChange}
      variants={variants}
      lang={lang}
    />
  ));

  return (
    <LayoutContainer
      title={title}
      description={metaDescription}
      path={location.pathname}
      type="og:product"
      image={metaImage}
      lang={lang}
      topLayerComponent={
        <nav
          role="navigation"
          aria-label="mobile"
          css={{
            display: "none",
            visibility: "hidden",
            marginLeft: "auto",
            flex: "0 1 100%",
            [mq("lg")]: {
              display: "block",
              visibility: "visible",
              position: "sticky",
              bottom: "0",
              zIndex: "9000",
            },
          }}
        >
          <OrderSectionMemo />
        </nav>
      }
    >
      <TitleSection
        title={title}
        votes={reviews.edges.length}
        averageAllReviews={averageAllReviews}
      />
      <div
        css={{
          padding: `0 ${theme.padding.DEFAULT}`,
          [mq("xl")]: {
            padding: `0 ${theme.padding.XL}`,
          },
          [mq("md")]: {
            padding: `0 ${theme.padding.MD}`,
          },
          [mq("sm")]: {
            padding: `0 ${theme.padding.SM}`,
          },
        }}
      >
        <div
          className="container"
          css={{
            display: "flex",
            "& > *": { width: "100%", padding: "0" },
            "& > div > section": { padding: "35px 0" },
            [mq("lg")]: {
              flexWrap: "wrap",
            },
          }}
        >
          <div
            css={{
              maxWidth: "761px",
              marginRight: "auto",
              [mq("lg")]: {
                maxWidth: "100%",
              },
            }}
          >
            <div
              css={{
                "& > section": {
                  padding: "0",
                  paddingBottom: "35px",
                },
                [mq("lg")]: {
                  display: "flex",
                  "& > section": {
                    flex: "0 1 50%",
                  },
                  "& > section:first-of-type": {
                    marginRight: "15px",
                  },
                  "& > section:last-child": {
                    paddingTop: "35px",
                    marginLeft: "15px",
                  },
                },
                [mq("md")]: {
                  flexWrap: "wrap",
                  "& > section": {
                    flex: "0 1 100%",
                  },
                  "& > section:first-of-type": {
                    marginRight: "0",
                  },
                  "& > section:last-child": {
                    marginLeft: "0",
                  },
                },
              }}
            >
              <GallerySection images={images} title={title} />
              <MobileOnlyDescriptionSection
                description={description}
                price={price}
              />
            </div>
            {hasSpecifications && (
              <SpecificationsSection
                specifications={JSON.parse(specifications[0].value)}
                lang={lang}
              />
            )}
            {hasReviews && (
              <ReviewsSection
                reviews={reviews.edges}
                averageAllReviews={averageAllReviews}
                lang={lang}
              />
            )}
            <SuggestionsSection products={suggestions.nodes} lang={lang} />
          </div>
          <nav
            role="navigation"
            aria-label="main-product"
            css={{
              maxWidth: "49rem",
              marginLeft: "auto",
              flex: "0 1 34%",
              [mq("lg")]: {
                flex: "0 1 100%",
                display: "none",
                visibility: "hidden",
              },
            }}
          >
            <OrderSectionMemo />
          </nav>
        </div>
      </div>
    </LayoutContainer>
  );
};

export const query = graphql`
  query (
    $id: String!
    $productType: String!
    $language: String!
    $handle: String!
  ) {
    averageAllReviews: googleAvgPerHandleSheet(
      handle__Shopify_: { eq: $handle }
    ) {
      id
      average
    }
    reviews: allGoogleReviewsSheet(
      filter: { handle__Shopify_: { eq: $handle } }
    ) {
      edges {
        node {
          id
          name
          rating
          textnl: textNL
          texten: textEN
          date
        }
      }
    }
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
      productType
      tags
      metafields {
        id
        key
        value
      }
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
        altText
        id
        gatsbyImageData(layout: FULL_WIDTH, width: 761, placeholder: TRACED_SVG)
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
        id
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
      limit: 6
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

export default Product;
