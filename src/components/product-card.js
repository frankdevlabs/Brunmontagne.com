import React from "react"; // eslint-disable-line no-unused-vars
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useTheme } from "@emotion/react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./link";

const ProductCard = ({ product, eager, size, lang }) => {
  const {
    fields,
    slug,
    images: [firstImage],
    totalVariants,
  } = product;

  const title = fields[`${lang}_locale`].title;

  const defaultImageHeight = 200;
  const defaultImageWidth = 190;

  const hasImage = firstImage;

  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <div
      className={`col ${size ? size : "fourth"}`}
      css={{ maxWidth: "27rem" }}
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
    title
    slug: gatsbyPath(
      filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
    )
    images {
      id
      altText
      gatsbyImageData(aspectRatio: 1.25, width: 270)
    }
    fields {
      nl_locale {
        title
      }
      en_locale {
        title
      }
    }
    vendor
    totalVariants
  }
`;

export default ProductCard;
