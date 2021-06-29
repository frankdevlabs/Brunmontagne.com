import React, { useContext, useState, useEffect } from "react"
import { SnipcartContext } from "gatsby-plugin-snipcart-advanced/context"
import { Link as GatsbyLink } from "gatsby"
import { usePageContext } from "../../../pageContext"
import { DEFAULT_OPTIONS } from "../../../constants"

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
  const { changeLanguage } = useContext(SnipcartContext)

  const [initialLang] = useState(lang)
  const [initialLoad, setInitialLoad] = useState(true)

  const onClickFn = () => {
    const setLangTo = lang === "en" ? "nl" : "en"
    changeLanguage(setLangTo)
  }

  useEffect(() => {
    if (initialLang === "en" && initialLoad) {
      changeLanguage("en")
      setInitialLoad(false)
    }
  }, [initialLang, changeLanguage, initialLoad, setInitialLoad])
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
              onClick={onClickFn}
            >
              <svg className="language-picker__icon">
                <use xlinkHref={`/svg/main.svg#${_langID.current}`}></use>
              </svg>
            </GatsbyLink>
          )
        })
      ) : (
        <div className="language-picker">
          <span></span>
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
              onClick={onClickFn}
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
