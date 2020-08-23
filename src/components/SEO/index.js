import React from "react"
import Helmet from "react-helmet"
import { useTranslation } from "react-i18next"
import { DEFAULT_OPTIONS } from "../../../constants"
import { usePageContext } from "../../../pageContext"

const SEO = ({ title, description }) => {
  const { supportedLanguages, siteUrl, defaultLanguage } = DEFAULT_OPTIONS
  const { t } = useTranslation()

  const { lang, originalPath } = usePageContext()

  const metaDescription = description || t("siteMetadata.description")
  const metaTitle = title || t("siteMetadata.title")

  const canonicalUrl =
    lang === defaultLanguage
      ? `${siteUrl}${originalPath}`
      : `${siteUrl}/${lang}${originalPath}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      titleTemplate={`%s | ${t("siteMetadata.title")}`}
    >
      <title>{metaTitle}</title>
      <meta property="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:locale" content={lang} />
      <link rel="canonical" href={canonicalUrl} />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteUrl}${originalPath}`}
      />
      {supportedLanguages.map(supportedLang => {
        const path =
          lang === supportedLang
            ? `/${originalPath}`
            : `/${supportedLang}${originalPath}`
        return (
          <link
            rel="alternate"
            href={`${siteUrl}${path}`}
            hrefLang={supportedLang}
            key={supportedLang}
          />
        )
      })}
    </Helmet>
  )
}

export default SEO
