import React from "react"; // eslint-disable-line no-unused-vars
import SectionTitle from "../../components/section-title";
import ProductListing from "../../components/product-listing";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { useTheme } from "@emotion/react";
import Link from "../../components/link";
import ProductDeliveryTerms from "../../components/product-delivery-terms";
import mq from "../../theme/media-queries";

const CollectionSection = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { products, lang } = props;
  return (
    <section
      css={{
        padding: `0 ${theme.padding.DEFAULT} 35px ${theme.padding.DEFAULT}`,
        [mq("xl")]: {
          padding: `0 ${theme.padding.XL} 35px ${theme.padding.XL}`,
        },
        [mq("md")]: {
          padding: `0 ${theme.padding.MD} 35px ${theme.padding.MD}`,
        },
        [mq("sm")]: {
          padding: `0 ${theme.padding.SM} 35px ${theme.padding.SM}`,
        },
      }}
    >
      <div className="container">
        <div
          css={{
            maxWidth: "69.7rem",
            margin: "2.5rem auto 4.4rem 0",
          }}
        >
          <SectionTitle>
            {t("collection.title-part-1")}{" "}
            <strong>{t("collection.title-part-2")}</strong>{" "}
            {t("collection.title-part-3")}
          </SectionTitle>
        </div>
        <ProductListing
          name="Home Page"
          products={products}
          lang={lang}
          position="justifyStart"
        />
        <div css={{ margin: "4rem auto" }}>
          <ProductDeliveryTerms position="flex-start" />
        </div>
        <div
          css={{
            display: "flex",
            justifyContent: "flex-start",
            margin: "5rem 0",
          }}
        >
          <Link to="/collection/" ui="button">
            {t("collection.button-link")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
