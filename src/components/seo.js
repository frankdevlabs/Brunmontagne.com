import React from "react"; // eslint-disable-line no-unused-vars
import { Helmet } from "react-helmet";
import { useTranslation } from "gatsby-plugin-react-i18next";

function Seo(props) {
  const { description, lang, keywords, title, image, type, path } = props;
  /*
   Google Fonts share link (used to adjust settings):
   https://fonts.google.com/share?selection.family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,700
   */
  const GOOGLE_FONTS_PATH =
    "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,700&display=swap";

  const { t } = useTranslation();
  const metaDescription = description || t("description") || "";
  const siteTitle = t("title") || "";
  const metaImage =
    image && image.gatsbyImageData
      ? image.gatsbyImageData.images.fallback.src
      : `${process.env.GATSBY_HOME_PAGE}/op-brand-image.jpg`;
  const metaImageAlt = (image && image.alt) || "Brunmontagne.com";
  const canonicalUrl = `${process.env.GATSBY_HOME_PAGE}${
    lang === "nl" ? "" : "/en/"
  }${path}`;
  const nonCanonicalUrl = `${process.env.GATSBY_HOME_PAGE}${
    lang !== "nl" ? "" : "/en"
  }${path}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
        prefix: "og: http://ogp.me/ns#",
      }}
      title={title}
      titleTemplate={title === siteTitle ? "%s" : `${siteTitle} | %s`}
      link={[
        { rel: "canonical", href: canonicalUrl },
        {
          rel: "alternate",
          href: process.env.GATSBY_HOME_PAGE + "/",
          hrefLang: "x-default",
        },
        {
          rel: "alternate",
          href: canonicalUrl,
          hrefLang: lang,
        },
        {
          rel: "alternate",
          href: nonCanonicalUrl,
          hrefLang: lang === "nl" ? "en" : "nl",
        },
        {
          rel: "preload",
          href: GOOGLE_FONTS_PATH,
          as: "style",
          onLoad: "this.onload=null;this.rel='stylesheet'",
        },
      ]}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: `${title} | ${siteTitle}`,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: type,
        },
        {
          property: "og:url",
          content: canonicalUrl,
        },
        {
          property: "og:image",
          content: metaImage,
        },
        {
          property: "og:locale",
          content: lang,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:title",
          content: `${title} | ${siteTitle}`,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
        {
          property: "twitter:image",
          content: metaImage,
        },
        {
          property: "twitter:image:alt",
          content: metaImageAlt,
        },
      ].concat(
        keywords && keywords.length > 0
          ? {
              name: "keywords",
              content: keywords.join(", "),
            }
          : []
      )}
    >
      <noscript>
        {` < link href=${GOOGLE_FONTS_PATH} rel="stylesheet" type="text/css" />`}
      </noscript>
    </Helmet>
  );
}

export default Seo;
