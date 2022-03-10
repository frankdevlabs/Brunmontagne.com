import React from "react"; // eslint-disable-line no-unused-vars
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useTheme } from "@emotion/react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./link";
import { formatPrice } from "../utils/format-price";
import { productCardData } from "../utils/gtm";
import { useInView } from "../utils/use-in-view";

const ProductCard = ({
  listName = "not set",
  listIndex = 0,
  product,
  eager,
  size,
  lang,
}) => {
  const _product = product.node ? product.node : product;
  const {
    fields,
    slug,
    images: [firstImage],
    totalVariants,
    priceRangeV2,
  } = _product;

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  );

  const title = fields[`${lang}_locale`].title;

  const defaultImageHeight = 200;
  const defaultImageWidth = 190;

  const hasImage = firstImage;

  const theme = useTheme();
  const { t } = useTranslation();

  // Start: GTM related
  const gtmData = productCardData(_product, listName, listIndex);
  const [cardRef, isVisible] = useInView(
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    },
    () => {
      if (isVisible) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "viewed_list_item",
          item: gtmData,
          element: cardRef,
        });
      }
    },
    true
  );
  // END: GTM related
  return (
    <div
      className={`col ${size ? size : "fourth"}`}
      css={{ maxWidth: "27rem" }}
      // Start: GTM related
      ref={cardRef}
      data-product-id={gtmData.item_id}
      data-product-dl={JSON.stringify(gtmData)}
      // END: GTM related
    >
      <Link
        to={slug}
        ariaLabel={`View ${title} product page`}
        ui="custom"
        customStyle={{
          display: "block",
          borderRadius: "1px",
          border: `1px solid ${theme.colors.SECONDARY_LIGHT}`,
          height: "42rem",
          padding: "2px 0px 2px 2px",
          margin: "5px 1px 3px 0px",
          transition: "all 0.30s ease-in-out",
          "&:hover": {
            padding: "2px 0px 2px 2px",
            margin: "5px 1px 3px 0px",
            border: "2px solid white",
            color: theme.colors.YELLOW,

            "& > div > div:last-of-type > span > div": {
              color: theme.colors.YELLOW,
            },
          },
        }}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "3.5rem 4%",
          }}
        >
          <div>
            <h3
              css={{
                fontWeight: "bold",
                fontSize: "1.6rem",
                lineHeight: "19px",
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              {title}
            </h3>
          </div>
          {hasImage ? (
            <div
              css={{ marginLeft: "auto", marginRight: "auto" }}
              data-name="product-image-box"
            >
              <GatsbyImage
                css={{ borderRadius: "2px" }}
                alt={firstImage?.altText ?? title}
                image={firstImage?.gatsbyImageData}
                loading={eager ? "eager" : "lazy"}
              />
            </div>
          ) : (
            <div
              style={{ height: defaultImageHeight, width: defaultImageWidth }}
            />
          )}
          <div css={{ padding: "4%" }}>
            <span
              css={{
                textAlign: "center",
                display: "block",
                lineHeight: "17px",
                fontWeight: "300",
                fontSize: "1.4rem",
              }}
            >
              <div
                css={{
                  color: theme.colors.GREEN_LIGHT,
                  marginBottom: "0.5rem",
                  transition: "all 0.30s ease-in-out",
                }}
              >
                {price}
              </div>
              {t("product.available-in")} {totalVariants}{" "}
              {totalVariants > 1 ? t("product.variants") : t("product.variant")}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    variants {
      sku
    }
    productType
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
      id
      altText
      gatsbyImageData(aspectRatio: 1, width: 220)
    }
    fields {
      nl_locale {
        title
      }
      en_locale {
        title
      }
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
    totalVariants
  }
`;

export default ProductCard;
