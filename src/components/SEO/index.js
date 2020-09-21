import React from "react"
import Helmet from "react-helmet"
import { useTranslation } from "react-i18next"
import useSiteMetadata from "../../hooks/useSiteMetaData"
import { DEFAULT_OPTIONS } from "../../../constants"
import { usePageContext } from "../../../pageContext"

const SEO = ({ title, pageTitle, description }) => {
  const { siteUrl } = useSiteMetadata()
  const { supportedLanguages, defaultLanguage } = DEFAULT_OPTIONS
  const { t } = useTranslation()

  const { lang, originalPath } = usePageContext()
  console.log(title, description)
  const metaDescription = description || t("siteMetadata.description")
  const metaPageTitle = pageTitle || t("siteMetadata.pageTitle")
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
      titleTemplate={`%s | ${metaPageTitle}`}
    >
      <title>{metaTitle}</title>
      <meta property="og:title" content={`${metaTitle} | ${metaPageTitle}`} />
      <meta name="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:locale" content={lang} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
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
