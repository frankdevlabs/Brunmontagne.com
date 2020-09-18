import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { usePageContext } from "../../../pageContext"
import { DEFAULT_OPTIONS } from "../../../constants"
import "./languagePicker.scss"

const languageID = lang => {
  if (lang === "nl") {
    return { current: "netherlands", inActive: "united-kingdom" }
  }

  return { current: "united-kingdom", inActive: "netherlands" }
}

const LanguagePicker = props => {
  const { originalPath, lang } = usePageContext()
  const langID = languageID(lang)
  const { defaultLanguage, supportedLanguages } = DEFAULT_OPTIONS

  return (
    <>
      {props.mode === "flat" ? (
        supportedLanguages.map(supportedLanguage => {
          const _langID = languageID(supportedLanguage)
          const path =
            defaultLanguage === supportedLanguage
              ? originalPath
              : `/${supportedLanguage}${originalPath}`

          return (
            <GatsbyLink
              key={supportedLanguage}
              aria-label={`Change language to ${
                lang === "en" ? "dutch" : "english"
              }`}
              to={path}
            >
              <svg className="language-picker__icon">
                <use xlinkHref={`/svg/main.svg#${_langID.current}`}></use>
              </svg>
            </GatsbyLink>
          )
        })
      ) : (
        <div className="language-picker">
          <button className="language-picker--active">
            <svg className="language-picker__icon">
              <use xlinkHref={`/svg/main.svg#${langID.current}`}></use>
            </svg>
          </button>
          <div className="language-picker--inactive">
            <GatsbyLink
              aria-label={`Change language to ${
                lang === "en" ? "dutch" : "english"
              }`}
              to={`${lang === "en" ? "" : "/en"}${originalPath}`}
            >
              <svg className="language-picker__icon">
                <use xlinkHref={`/svg/main.svg#${langID.inActive}`}></use>
              </svg>
            </GatsbyLink>
          </div>
        </div>
      )}
    </>
  )
}

export default React.memo(LanguagePicker)
