import React from "react"; // eslint-disable-line no-unused-vars
import { graphql } from "gatsby";
import LayoutContainer from "../containers/layout-container";

const Page = ({ data, pageContext, location }) => {
  const lang = pageContext.i18n.language;
  const content = data.content.html;
  const { title, description } = data.content.frontmatter;
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
          <div
            css={{
              maxWidth: "70rem",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "6rem",

              "&  > div > h1": {
                marginBottom: "4rem",
              },
              "& > div:last-of-type": {
                "& > p, & > ol": {
                  marginBottom: "1.5rem",
                },
                "& > ol": {
                  marginLeft: "2.5rem",
                },
                "& > h3, & > h4": {
                  marginTop: "2.5rem",
                },
              },
            }}
          >
            <div>
              <h1>{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </div>
        </div>
      </section>
    </LayoutContainer>
  );
};

export const pageQuery = graphql`
  query ($path: String!, $language: String!) {
    content: markdownRemark(
      frontmatter: { slug: { eq: $path }, locale: { eq: $language } }
    ) {
      id
      frontmatter {
        slug
        description
        title
      }
      html
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

export default Page;
