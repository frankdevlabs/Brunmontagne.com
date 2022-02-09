import React from "react"; // eslint-disable-line no-unused-vars
import { graphql, useStaticQuery } from "gatsby";
import SectionTitle from "../../components/section-title";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

const BlockquoteColumn = ({
  children,
  maxWidth = 0,
  margin = "default",
  flexPosition = "center",
}) => {
  return (
    <div
      css={{
        flex: "1",
        ...(maxWidth > 0
          ? { maxWidth: `${maxWidth}rem` }
          : { maxWidth: "39rem" }),
        ...(margin === "default"
          ? { marginRight: "4.3rem" }
          : { margin: margin }),
        display: "flex",
        flexDirection: "column",
        justifyContent: flexPosition,
      }}
    >
      {children}
    </div>
  );
};

const Row = ({ children }) => (
  <div css={{ display: "flex", marginTop: "7.1rem" }}>{children}</div>
);

const TestimonialSection = () => {
  const { t } = useTranslation();
  const Testimonials = t("testimonial.items", { returnObjects: true }).map(
    (t, i) => (
      <blockquote
        key={i}
        css={{
          fontStyle: "italic",
          fontWeight: "300",
          fontSize: "2.5rem",
          lineHeight: "30px",
          letterSpacing: "0.02em",
        }}
      >
        &quot;{t.content}&quot;
        <div css={{ marginTop: "2rem" }}>
          <cite
            css={{
              fontStyle: "normal",
              fontSize: "1.6rem",
              lineHeight: "19px",
            }}
          >
            {t.author}
          </cite>
        </div>
      </blockquote>
    )
  );
  const { image1, image2, image3 } = useStaticQuery(
    graphql`
      query {
        image1: file(relativePath: { eq: "images/testimonial-section-1.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 550
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        image2: file(relativePath: { eq: "images/testimonial-section-2.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 364
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        image3: file(relativePath: { eq: "images/testimonial-section-3.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 645
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    `
  );

  return (
    <section>
      <div className="container">
        <div css={{ maxWidth: "1160px", marginRight: "auto" }}>
          <div css={{ maxWidth: "68.6rem", marginTop: "10rem" }}>
            <SectionTitle textAlign="left">
              <strong>{t("testimonial.title-part-1")}</strong>{" "}
              {t("testimonial.title-part-2")}
            </SectionTitle>
          </div>
          <div css={{ marginTop: "10rem" }}>
            <Row>
              <BlockquoteColumn maxWidth={54}>
                {Testimonials[0]}
              </BlockquoteColumn>
              <div css={{ flex: "0 1 550px" }}>
                <StaticImage
                  src="../../assets/images/testimonial-section-1.jpg"
                  alt="brunmontagne representor voorkant"
                  placeholder="blurred"
                  layout="fixed"
                  width={550}
                  height={354}
                />
              </div>
            </Row>
            <Row>
              <div css={{ flex: "0 1 364px", marginTop: "7.4rem" }}>
                <StaticImage
                  src="../../assets/images/testimonial-section-2.jpg"
                  alt="brunmontagne representor gedragen door iemand met colbert"
                  placeholder="blurred"
                  layout="fixed"
                  width={364}
                  height={500}
                />
              </div>
              <BlockquoteColumn margin="0 14.9rem 0 auto" maxWidth={36.9}>
                {Testimonials[1]}
              </BlockquoteColumn>
            </Row>
            <Row>
              <BlockquoteColumn>{Testimonials[2]}</BlockquoteColumn>
              <div css={{ flex: "0 1 364px", marginTop: "7.4rem" }}>
                <StaticImage
                  src="../../assets/images/testimonial-section-3.jpg"
                  alt="brunmontagne representor dial"
                  placeholder="blurred"
                  layout="fixed"
                  width={645}
                  height={511}
                />
              </div>
            </Row>
            <Row>
              <BlockquoteColumn>{Testimonials[3]}</BlockquoteColumn>
              <BlockquoteColumn margin="0 14.9rem 0 auto">
                {Testimonials[4]}
              </BlockquoteColumn>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
