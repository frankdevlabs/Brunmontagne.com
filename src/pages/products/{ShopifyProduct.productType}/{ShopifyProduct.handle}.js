import React, { // eslint-disable-line no-unused-vars
  useContext,
  useState,
  useCallback,
  useEffect,
  memo,
} from "react";
import { graphql } from "gatsby";
import { useTheme } from "@emotion/react";
import { useI18next } from "gatsby-plugin-react-i18next";
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
import { arrayMove } from "../../../utils/array-move";
import mq from "../../../theme/media-queries";
import useQueryString from "use-query-string";
import { navigate } from "gatsby";

const Product = (props) => {
  const theme = useTheme();
  const {
    pageContext,
    location,
    data: { product, reviews, averageAllReviews, suggestions },
  } = props;
  const { variants, priceRangeV2, images, metaImage, metafields, fields } =
    product;

  const { language } = useI18next();
  const { client } = useContext(StoreContext);

  const [query] = useQueryString(props.location, navigate);
  let initialVariant = variants[0];
  if (query.sku) {
    const index = variants.findIndex((v) => v.sku === query.sku);
    if (index > -1) initialVariant = variants[index];
  }

  const [variant, setVariant] = useState({ ...initialVariant });
  const [_images, setImages] = useState(images);

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
    if (variant.image) {
      const variantImageId = variant.image.id;
      const indexOfImage = _images.findIndex(
        (i) => i.shopifyId === variantImageId
      );
      if (indexOfImage !== 0) setImages(arrayMove(_images, indexOfImage, 0));
    }
    checkAvailablity(product.storefrontId);
  }, [
    productVariant.storefrontId,
    checkAvailablity,
    product.storefrontId,
    _images,
    variant,
  ]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  );

  const specifications = metafields.filter((mf) => mf.key === "specifications");
  const hasVariants = variants.length > 1;
  const hasSpecifications = specifications.length === 1;
  const hasReviews = reviews.edges.length > 0;

  const lang = pageContext.i18n.language;
  const title = fields[`${lang}_locale`].title;
  const description = fields[`${lang}_locale`].description;
  const metaDescription = fields[`${lang}_locale`].metaDescription;

  // eslint-disable-next-line react/display-name
  const OrderSectionMemo = memo(() => (
    <OrderSection
      product={{
        productVariant,
        title: product.title,
        productType: product.productType,
      }}
      title={title}
      description={description}
      price={price}
      variantId={productVariant.storefrontId}
      available={available}
      hasVariants={hasVariants}
      selectedVariant={variant}
      querySku={query.sku}
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
              <GallerySection
                images={_images}
                title={title}
                selectedVariant={variant}
              />
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
            <SuggestionsSection
              title={product.title}
              products={suggestions.nodes}
              lang={lang}
            />
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
      title
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
        shopifyId
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
        sku
        availableForSale
        storefrontId
        title
        price
        image {
          id
        }
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
