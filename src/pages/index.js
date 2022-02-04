import React from "react"; // eslint-disable-line no-unused-vars
import { useTranslation } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import LayoutContainer from "../containers/layout-container";
import HeroSection from "./_landing/_hero-section";
import CollectionSection from "./_landing/_collection-section";

export const query = graphql`
  query ($language: String!) {
    collection: shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
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
  }
`;

const IndexPage = ({ data, pageContext, location }) => {
  const { t } = useTranslation();
  const description = t("description");
  const title = t("pageTitle");
  const lang = pageContext.i18n.language;

  return (
    <LayoutContainer
      title={title}
      description={description}
      path={location.pathname}
      type="website"
      lang={lang}
    >
      <HeroSection />
      <CollectionSection products={data?.collection?.products} lang={lang} />
    </LayoutContainer>
  );
};

export default IndexPage;
