import React from "react"; // eslint-disable-line no-unused-vars
import LayoutContainer from "../containers/layout-container";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import ProductListing from "../components/product-listing";

const CollectionPage = ({ data, pageContext }) => {
  const { t } = useTranslation();
  const description = t("collection-page.description");
  const title = t("collection-page.title");
  const lang = pageContext.i18n.language;
  const { straps, watches } = data;

  return (
    <LayoutContainer
      title={title}
      description={description}
      path={location.pathname}
      type="website"
      lang={lang}
    >
      <section>
        <div className="container">
          <div css={{ margin: "5rem 0 7rem 0" }}>
            <h1>{title}</h1>
          </div>
          <div>
            <ProductListing
              products={watches?.edges}
              lang={lang}
              justifyContent="justifyStart"
            />
          </div>
          <div css={{ margin: "7rem 0 5rem" }}>
            <h2>{t("collection-page.title-straps")}</h2>
          </div>
          <div css={{ marginBottom: "7rem" }}>
            <ProductListing
              products={straps?.edges}
              lang={lang}
              justifyContent="justifyStart"
            />
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
};

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    watches: allShopifyProduct(filter: { productType: { eq: "Watches" } }) {
      edges {
        node {
          ...ProductCard
        }
      }
    }
    straps: allShopifyProduct(
      filter: { productType: { eq: "Horlogebanden" } }
    ) {
      edges {
        node {
          ...ProductCard
        }
      }
    }
  }
`;

export default CollectionPage;
