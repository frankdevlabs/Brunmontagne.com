import React from "react"
import Helmet from "react-helmet"
import { useTranslation } from "react-i18next"
import useSiteMetadata from "../../hooks/useSiteMetaData"
import { DEFAULT_OPTIONS } from "../../../constants"
import { usePageContext } from "../../../pageContext"

const SEO = ({ title, pageTitle, description, noIndex }) => {
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
    >
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
        const supportedLangCanonicalUrl = `${siteUrl}/${supportedLang}${originalPath}`

        return (
          <link
            rel="alternate"
            href={supportedLangCanonicalUrl}
            hrefLang={locales[supportedLang]}
            key={supportedLang}
          />
        )
      })}
      {noIndex ? <meta name="robots" content="noindex" /> : ""}
    </Helmet>
  )
}

export default SEO
