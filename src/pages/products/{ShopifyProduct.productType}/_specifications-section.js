import React from "react"; // eslint-disable-line no-unused-vars
import { useTranslation } from "gatsby-plugin-react-i18next";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import mq from "../../../theme/media-queries";

const SpecificationsSection = ({ specifications, lang }) => {
  const { t } = useTranslation();
  const { image } = useStaticQuery(
    graphql`
      query {
        image: file(relativePath: { eq: "images/representor-design.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 498
              placeholder: TRACED_SVG
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    `
  );
  return (
    <section>
      <div css={{ marginBottom: "1.8rem" }}>
        <h2>{t("titles.specs-section")}</h2>
      </div>
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          [mq("md")]: {
            flexDirection: "column",
            alignItems: "baseline",
          },
        }}
      >
        <div>
          {specifications.map((spec, index) => {
            const { key, value } = spec[lang];
            return (
              <div
                key={`${index}-${key}-${value}`}
                css={{
                  marginBottom: "2.4rem",
                  fontSize: "1.2rem",
                  lineHeight: "158%",
                  letterSpacing: "0.01em",
                }}
              >
                <div>
                  <strong>{key}</strong>
                </div>
                <div>{value}</div>
              </div>
            );
          })}
        </div>
        <div>
          <GatsbyImage
            alt="Representor design"
            image={image.childImageSharp.gatsbyImageData}
          />
        </div>
      </div>
    </section>
  );
};

export default SpecificationsSection;
