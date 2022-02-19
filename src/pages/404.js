import React from "react"; // eslint-disable-line no-unused-vars
import LayoutContainer from "../containers/layout-container";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../components/link";

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
  }
`;

const NotFoundPage = ({ pageContext, location }) => {
  const { t } = useTranslation();
  const description = t("404-page.description");
  const title = t("404-page.pageTitle");
  const lang = pageContext.i18n.language;
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
          {" "}
          <div
            css={{
              textAlign: "center",
              maxWidth: "48ch",
              marginLeft: "auto",
              marginRight: "auto",
              minHeight: "50vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h1 css={{ marginBottom: "1rem" }}>{t("404-page.pageTitle")}</h1>
            <p>{t("404-page.description")}</p>
            <div css={{ marginTop: "4rem" }}>
              <Link ui="button" to="/">
                {t("404-page.button")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
};

export default NotFoundPage;
