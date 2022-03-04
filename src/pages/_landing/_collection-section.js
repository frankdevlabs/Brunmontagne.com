import React from "react"; // eslint-disable-line no-unused-vars
import SectionTitle from "../../components/section-title";
import ProductListing from "../../components/product-listing";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../../components/link";
import ProductDeliveryTerms from "../../components/product-delivery-terms";

const CollectionSection = (props) => {
  const { t } = useTranslation();
  const { products, lang } = props;
  return (
    <section>
      <div className="container">
        <div
          css={{
            maxWidth: "69.7rem",
            margin: "2.5rem 0 4.4rem auto",
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
          position="justifyEnd"
        />
        <div css={{ margin: "4rem auto" }}>
          <ProductDeliveryTerms position="flex-end" />
        </div>
        <div
          css={{
            display: "flex",
            justifyContent: "center",
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
