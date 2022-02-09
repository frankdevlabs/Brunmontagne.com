import React from "react"; // eslint-disable-line no-unused-vars
import SectionTitle from "../../components/section-title";
import ProductListing from "../../components/product-listing";
import mq from "../../theme/media-queries";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../../components/link";

const CollectionSection = (props) => {
  const { t } = useTranslation();
  const { products, lang } = props;
  return (
    <section>
      <div
        className="container"
        css={{
          [mq("md")]: {
            "& > div.justifyEnd": {
              justifyContent: "center",
            },
          },
        }}
      >
        <div
          css={{
            maxWidth: "69.7rem",
            margin: "8.9rem 0 16rem auto",
            [mq("xl")]: {
              margin: "3.9rem 0 8rem auto",
            },
            [mq("sm")]: {
              margin: "1.9rem 0 5rem auto",
            },
          }}
        >
          <SectionTitle>
            {t("collection.title-part-1")}{" "}
            <strong>{t("collection.title-part-2")}</strong>{" "}
            {t("collection.title-part-3")}
          </SectionTitle>
        </div>
        <ProductListing products={products} lang={lang} position="justifyEnd" />
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            margin: "8.6rem 0 10.2rem 0",
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
