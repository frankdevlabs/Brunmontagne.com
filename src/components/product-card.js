import React from "react"; // eslint-disable-line no-unused-vars
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { getShopifyImage } from "gatsby-source-shopify";
import { useTheme } from "@emotion/react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./link";
import { formatPrice } from "../utils/format-price";

const ProductCard = ({ product, eager }) => {
  const {
    title,
    priceRangeV2,
    slug,
    images: [firstImage],
    vendor,
    storefrontImages,
    totalVariants,
  } = product;

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    priceRangeV2.minVariantPrice.amount
  );

  const defaultImageHeight = 200;
  const defaultImageWidth = 200;
  let storefrontImageData = {};
  if (storefrontImages) {
    const storefrontImage = storefrontImages.edges[0].node;
    try {
      storefrontImageData = getShopifyImage({
        image: storefrontImage,
        layout: "fixed",
        width: defaultImageWidth,
        height: defaultImageHeight,
      });
    } catch (e) {
      console.error(e);
    }
  }

  const hasImage =
    firstImage || Object.getOwnPropertyNames(storefrontImageData || {}).length;

  const theme = useTheme();
  const { t } = useTranslation();

  console.log({
    title,
    priceRangeV2,
    slug,
    images: [firstImage],
    vendor,
    storefrontImages,
    storefrontImageData,
    hasImage,
  });
  return (
    <div className="col fourth">
      <Link
        // className={productCardStyle}
        to={slug}
        ariaLabel={`View ${title} product page`}
        ui="custom"
        customStyle={{
          color: "blue",
          backgroundColor: theme.colors.PRIMARY_LIGHT,
          display: "block",
          borderRadius: "8px",
          minHeight: "42rem",
        }}
      >
        {hasImage ? (
          <div
            css={{ maxWidth: "27rem", padding: "4%", paddingTop: "3.5rem" }}
            data-name="product-image-box"
          >
            <GatsbyImage
              css={{ borderRadius: "2px" }}
              alt={firstImage?.altText ?? title}
              image={firstImage?.gatsbyImageData ?? storefrontImageData}
              loading={eager ? "eager" : "lazy"}
            />
          </div>
        ) : (
          <div
            style={{ height: defaultImageHeight, width: defaultImageWidth }}
          />
        )}
        <div
          css={{ padding: "4%" }}
          // className={productDetailsStyle}
        >
          <span
            css={{
              textAlign: "center",
              display: "block",
              marginTop: "4.2rem",
              marginBottom: "3.2rem",
              fontWeight: "bold",
              fontSize: "1.6rem",
              lineHeight: "22px",
            }}
          >
            {totalVariants}{" "}
            {totalVariants > 1 ? t("product.variants") : t("product.variant")}
          </span>
        </div>
      </Link>
    </div>
  );
};

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
      id
      altText
      gatsbyImageData(aspectRatio: 1, width: 640)
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
