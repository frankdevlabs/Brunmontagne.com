import React from "react"; // eslint-disable-line no-unused-vars
import SectionTitle from "../../components/section-title";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { StaticImage } from "gatsby-plugin-image";
import mq from "../../theme/media-queries";

const MOBILE_HEIGHT = "20rem";
const MOBILE_BREAKPOINT = "sm";

const BlockquoteColumn = ({ children, flexPosition = "center" }) => {
  return (
    <div
      css={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: flexPosition,
        [mq(MOBILE_BREAKPOINT)]: {
          height: MOBILE_HEIGHT,
        },
      }}
    >
      {children}
    </div>
  );
};

const Row = ({ children }) => (
  <div
    css={{
      display: "flex",
      marginTop: "3.5rem",
      justifyContent: "space-between",
      "& > *": {
        flex: "0 1 50%",
      },
      "& > div:first-of-type": {
        paddingRight: "2rem",
        [mq(MOBILE_BREAKPOINT)]: {
          paddingRight: "0",
        },
      },
      "& > div:last-of-type": {
        paddingLeft: "2rem",
        [mq(MOBILE_BREAKPOINT)]: {
          paddingLeft: "0",
        },
      },
      [mq(MOBILE_BREAKPOINT)]: {
        flexWrap: "wrap",
        marginTop: "4rem",
        maxHeight: MOBILE_HEIGHT,
        "& > div": {
          flex: "0 1 100%",
        },
      },
    }}
  >
    {children}
  </div>
);

const TestimonialSection = () => {
  const { t } = useTranslation();
  const Testimonials = Array.isArray(
    t("testimonial.items", { returnObjects: true })
  )
    ? t("testimonial.items", { returnObjects: true }).map((t, i) => (
        <blockquote
          key={i}
          css={{
            fontStyle: "italic",
            fontWeight: "300",
            fontSize: "2.5rem",
            lineHeight: "30px",
            letterSpacing: "0.02em",
            [mq("lg")]: {
              fontSize: "1.8rem",
              lineHeight: "22px",
              letterSpacing: "0.01em",
            },
            [mq(MOBILE_BREAKPOINT)]: {
              fontSize: "1.5rem",
              lineHeight: "18px",
              textAlign: "center",
            },
          }}
        >
          &quot;{t.content}&quot;
          <div css={{ marginTop: "2rem" }}>
            <cite
              css={{
                fontStyle: "normal",
                fontSize: "1.6rem",
                lineHeight: "19px",
                [mq("lg")]: {
                  fontSize: "1.4rem",
                },
                [mq("md")]: {
                  fontSize: "1.2rem",
                },
              }}
            >
              {t.author}
            </cite>
          </div>
        </blockquote>
      ))
    : [];

  return (
    <section>
      <div className="container">
        <div>
          <div
            css={{
              maxWidth: "68.6rem",
              marginTop: "4.5rem",
              [mq("md")]: { marginTop: "6rem" },
            }}
          >
            <SectionTitle textAlign="left">
              <strong>{t("testimonial.title-part-1")}</strong>{" "}
              {t("testimonial.title-part-2")}
            </SectionTitle>
          </div>
          <div
            css={{
              marginTop: "1.5rem",
              [mq(MOBILE_BREAKPOINT)]: {
                position: "relative",
                "& > div > div.t-image": {
                  maxHeight: MOBILE_HEIGHT,
                  position: "absolute",
                  opacity: "0.25",
                  marginTop: "0",
                },
                "& > div > div.t-image > div": {
                  maxHeight: MOBILE_HEIGHT,
                },
              },
            }}
          >
            <Row>
              <BlockquoteColumn>{Testimonials[0]}</BlockquoteColumn>
              <div className="t-image">
                <StaticImage
                  src="../../assets/images/testimonial-section-1.jpg"
                  alt="brunmontagne representor voorkant"
                  placeholder="blurred"
                  layout="constrained"
                  height={511}
                  width={700}
                />
              </div>
            </Row>
            <Row>
              <div
                className="t-image"
                css={{
                  marginTop: "2rem",
                }}
              >
                <StaticImage
                  src="../../assets/images/testimonial-section-2.jpg"
                  alt="brunmontagne representor gedragen door iemand met colbert"
                  placeholder="blurred"
                  layout="constrained"
                  width={700}
                  height={511}
                />
              </div>
              <BlockquoteColumn margin="0 14.9rem 0 auto" maxWidth={36.9}>
                {Testimonials[1]}
              </BlockquoteColumn>
            </Row>
            <Row>
              <BlockquoteColumn>{Testimonials[2]}</BlockquoteColumn>
              <div
                className="t-image"
                css={{
                  marginTop: "2rem",
                }}
              >
                <StaticImage
                  src="../../assets/images/testimonial-section-3.jpg"
                  alt="brunmontagne representor dial"
                  placeholder="blurred"
                  layout="constrained"
                  width={700}
                  height={511}
                />
              </div>
            </Row>
            <Row>
              <div className="t-image" css={{ marginTop: "2rem" }}>
                <StaticImage
                  src="../../assets/images/testimonial-section-4.jpg"
                  alt="brunmontagne representor table"
                  placeholder="blurred"
                  layout="constrained"
                  width={700}
                  height={511}
                  objectPosition="25% 50%"
                />
              </div>
              <BlockquoteColumn>{Testimonials[3]}</BlockquoteColumn>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
