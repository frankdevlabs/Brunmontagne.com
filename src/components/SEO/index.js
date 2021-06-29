import React from "react"
import Helmet from "react-helmet"
import { useTranslation } from "react-i18next"
import useSiteMetadata from "../../hooks/useSiteMetaData"
import { DEFAULT_OPTIONS } from "../../../constants"
import { usePageContext } from "../../../pageContext"

const SEO = ({ title, pageTitle, description, noIndex }) => {
  const GOOGLE_FONTS_PATH =
    "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@100;300;400;700&display=swap"
  const { siteUrl } = useSiteMetadata()
  const { supportedLanguages, locales } = DEFAULT_OPTIONS
  const { t } = useTranslation()
  const { lang, originalPath } = usePageContext()
  const metaDescription = description || t("siteMetadata.description")
  const metaPageTitle = pageTitle || t("siteMetadata.pageTitle")
  const metaTitle = title || t("siteMetadata.title")
  const canonicalUrl = `${siteUrl}/${lang}${originalPath}`

  return (
    <Helmet
      htmlAttributes={{
        lang: locales[lang],
      }}
      defer={false}
      title={`${metaTitle} | ${metaPageTitle}`}
      link={[
        { rel: "canonical", href: canonicalUrl },
        {
          rel: "alternate",
          href: `${siteUrl}${originalPath}`,
          hrefLang: "x-default",
        },
        {
          rel: "preload",
          href: GOOGLE_FONTS_PATH,
          as: "style",
          onLoad: "this.onload=null;this.rel='stylesheet'",
        },
      ].concat(
        supportedLanguages.map(supportedLang => {
          const supportedLangCanonicalUrl = `${siteUrl}/${supportedLang}${originalPath}`

          return {
            rel: "alternate",
            href: supportedLangCanonicalUrl,
            hrefLang: locales[supportedLang],
          }
        })
      )}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: metaTitle | metaPageTitle,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:locale",
          content: lang,
        },
        {
          property: "og:url",
          content: canonicalUrl,
        },
      ].concat(
        noIndex
          ? {
              name: "robots",
              content: "noindex",
            }
          : []
      )}
    />
  )
}

export default SEO
