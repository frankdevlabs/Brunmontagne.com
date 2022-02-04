import React from "react"; // eslint-disable-line no-unused-vars
import { useTheme } from "@emotion/react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import AddToCart from "../../../components/add-to-cart-button";
import FastDeliverTruck from "../../../assets/vectors/fast-delivery-truck.svg";
import ProductDescription from "../../../components/product-description";
import ProductPrice from "../../../components/product-price";
import ProductDeliveryTerms from "../../../components/product-delivery-terms";
import mq from "../../../theme/media-queries";

const Order = ({
  title,
  price,
  variants,
  description,
  variantId,
  available,
  hasVariants,
  handleVariantChange,
  lang,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <section
      css={{
        padding: "0",
        paddingLeft: "3.1rem",
        borderLeft: `0.5px solid ${theme.colors.SECONDARY_LIGHT}`,
        height: "100%",
        [mq("lg")]: {
          maxHeight: "12rem",
          backgroundColor: theme.colors.PRIMARY_LIGHT,
          padding: "0",
          width: "100vw",
          left: `-${theme.padding.XL}`,
          position: "relative",
          borderLeft: "unset",
          borderTop: `1px solid ${theme.colors.SECONDARY_LIGHT}`,
          [mq("md")]: {
            left: `-${theme.padding.MD}`,
          },
          [mq("sm")]: {
            left: `-${theme.padding.SM}`,
          },
        },
      }}
    >
      <div
        css={{
          position: "sticky",
          top: "2rem",
          [mq("lg")]: {
            position: "relative",
            top: "unset",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "3%",
            flexWrap: "wrap",
          },
        }}
      >
        <h2
          css={{
            fontSize: "2.2rem",
            lineHeight: "25px",
            letterSpacing: " 0.01em",
            [mq("lg")]: {
              display: "none",
              visibility: "hidden",
            },
          }}
        >
          {title}
        </h2>
        <div
          css={{
            margin: "3.5rem 0",
            [mq("lg")]: {
              margin: "0",
            },
            [mq("sm")]: {
              // flex: "0 1 50%",
            },
          }}
        >
          <ProductPrice price={price} />
        </div>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            marginBottom: "3.1rem",
            [mq("sm")]: {
              marginBottom: "1.5%",
            },
          }}
        >
          <div css={{ marginRight: "1.3rem" }}>{t("options-text")}:</div>
          <fieldset>
            <select
              aria-label="variants"
              onChange={handleVariantChange}
              css={{
                height: "3.6rem",
                background: theme.colors.PRIMARY_LIGHT,
                border: `1px solid ${theme.colors.SECONDARY_LIGHT}`,
                borderRadius: "2px",
                color: theme.colors.SECONDARY_LIGHT,
              }}
            >
              {hasVariants &&
                variants.map(({ id, fields, availableForSale }) => {
                  const title = `${fields[`${lang}_locale`].title}${
                    availableForSale
                      ? ""
                      : " (" + t("buttons.out-of-stock-option") + ")"
                  }`;
                  return (
                    <option value={id} key={id}>
                      {title.length >= 23 ? `${title.slice(0, 23)}...` : title}
                    </option>
                  );
                })}
            </select>
          </fieldset>
        </div>
        <div
          css={{
            paddingTop: "1.65rem",
            paddingBottom: "3.4rem",
            borderTop: `1px solid ${theme.colors.SECONDARY_LIGHT}`,
            borderBottom: `1px solid ${theme.colors.SECONDARY_LIGHT}`,
            [mq("lg")]: {
              display: "none",
              visibility: "hidden",
            },
          }}
        >
          <ProductDescription description={description} />
        </div>
        <div
          css={{
            marginTop: "4.9rem",
            [mq("lg")]: {
              marginTop: "0",
              flex: "0 1 35%",
            },
            [mq("sm")]: {
              flex: "0 1 100%",

              "& > button": {
                padding: "1.3rem 0",
              },
            },
          }}
        >
          <AddToCart variantId={variantId} quantity={1} available={available} />
        </div>
        <div
          css={{
            marginTop: "4.6rem",
            [mq("lg")]: {
              display: "none",
              visibility: "hidden",
            },
          }}
        >
          <ProductDeliveryTerms />
        </div>
      </div>
    </section>
  );
};

export default Order;
