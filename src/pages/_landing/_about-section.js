import React from "react"; // eslint-disable-line no-unused-vars
import { graphql, useStaticQuery } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import BackgroundImage from "gatsby-background-image";
import { useTranslation } from "gatsby-plugin-react-i18next";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import mq from "../../theme/media-queries";
import { useTheme } from "@emotion/react";
import Link from "../../components/link";

const SectionWithBackgroundImage = ({ children }) => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(
          relativePath: { eq: "images/background-about.jpg" }
        ) {
          childImageSharp {
            gatsbyImageData(
              width: 1440
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    `
  );
  const image = [
    getImage(placeholderImage),
    `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85))`,
  ].reverse();
  const bgImage = convertToBgImage(image);
  return (
    <BackgroundImage
      Tag="section"
      css={{
        zIndex: 0,
        maxWidth: "1440px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 0,
      }}
      {...bgImage}
      preserveStackingContext
    >
      {children}
    </BackgroundImage>
  );
};

const AboutSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <SectionWithBackgroundImage>
      <div
        css={{
          padding: `3.2rem ${theme.padding.DEFAULT} 13.2rem ${theme.padding.DEFAULT}`,
          [mq("xl")]: {
            padding: `2.2rem ${theme.padding.XL} 10.2rem ${theme.padding.XL}`,
          },
          [mq("md")]: {
            padding: `1.2rem ${theme.padding.MD} 7.2rem ${theme.padding.MD}`,
          },
          [mq("sm")]: {
            padding: `1.2rem ${theme.padding.SM} 7.2rem ${theme.padding.SM}`,
          },
        }}
      >
        <div className="container">
          <div css={{ marginTop: "6rem", marginBottom: "8rem" }}>
            <blockquote
              css={{
                maxWidth: "48.8rem",
                display: "block",
                margin: "0 auto",
                fontStyle: "italic",
                fontWeight: "300",
                fontSize: "3.5rem",
                lineHeight: "42px",
                letterSpacing: "0.02em",
                [mq("lg")]: { fontSize: "2.5rem", lineHeight: "32px" },
                [mq("sm")]: { fontSize: "1.6rem", lineHeight: "22px" },
              }}
            >
              &quot;
              <strong css={{ fontWeight: "700" }}>
                {t("about.quote-part-1")}{" "}
              </strong>
              {t("about.quote-part-2")}
              <br />
              {t("about.quote-part-3")}&quot;
              <br />
              <div css={{ marginTop: "2rem" }}>
                <cite css={{ fontSize: "1.6rem", lineHeight: "19px" }}>
                  {t("about.cited-person")}
                </cite>
              </div>
            </blockquote>
          </div>
          <div
            css={{ maxWidth: "612px", marginLeft: "auto", marginRight: "auto" }}
          >
            <LiteYouTubeEmbed
              id="BOKKEjAn0Xc" // Default none, id of the video or playlist
              adNetwork={false} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
              playlist={false} // Use  true when your ID be from a playlist
              poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
              title="Tijdloze Passie" // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
              noCookie={true} //Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
            />
          </div>
          <div
            css={{
              marginTop: "8rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/about/" ui="button">
              {t("about.button-link")}
            </Link>
          </div>
        </div>
      </div>
    </SectionWithBackgroundImage>
  );
};

export default AboutSection;
