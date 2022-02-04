import React from "react"; // eslint-disable-line no-unused-vars
import ProductListing from "../../../components/product-listing";
import { useTranslation } from "gatsby-plugin-react-i18next";
import mq from "../../../theme/media-queries";

const SuggestionsSection = ({ products, lang }) => {
  const { t } = useTranslation();
  return (
    <section>
      <div css={{ marginBottom: "1.8rem" }}>
        <h2>{t("titles.suggestions-section")}</h2>
      </div>
      <div
        css={{
          marginRight: "2%",
          [mq("md")]: {
            "& > div": {
              justifyContent: "flex-start",
            },
            "& > div > div.col.third": {
              flex: "0 1 50%",
            },
          },
          [mq("sm")]: {
            "& > div > div.col.third": {
              maxWidth: "32rem",
              flex: "0 1 100%",
            },
          },
        }}
      >
        <ProductListing size="third" products={products} lang={lang} />
      </div>
    </section>
  );
};

export default SuggestionsSection;
