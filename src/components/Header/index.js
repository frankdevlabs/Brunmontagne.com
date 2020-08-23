import React from "react"
import { useTranslation } from "react-i18next"
import Slider from "./slider"
import TV from "./tv"
import Button from "../Button"
import { isMobile as _isMobile } from "../../utils/isMobile"
import "./header.scss"

const Header = () => {
  let isMobile = true

  React.useEffect(() => {
    isMobile = _isMobile()
  })

  const { t } = useTranslation()

  return (
    <header className="header ">
      <div className="header__cover">
        <div className="header__text">
          <h1 className="heading-1">brunmontagne</h1>
          <p className="heading-tagline">Represents you</p>
          <div className="header__categories columns">
            <div className="header__category column is-full-mobile">
              <Button
                to={`/${t("navigation.product-category")}/${t(
                  "navigation.watches.slug"
                )}`}
                className="btn btn--secondary btn--cta"
              >
                {t("navigation.watches.term")}
              </Button>
            </div>
            <div className="header__category column is-full-mobile">
              <Button
                to={`/${t("navigation.product-category")}/${t(
                  "navigation.pre-orders.slug"
                )}`}
                className="btn btn--secondary btn--cta"
              >
                {t("navigation.pre-orders.term")}
              </Button>
            </div>
            <div className="header__category column is-full-mobile">
              <Button
                to={`/${t("navigation.product-category")}/${t(
                  "navigation.watch-straps.slug"
                )}`}
                className="btn btn--secondary btn--cta"
              >
                {t("navigation.watch-straps.term")}
              </Button>
            </div>
          </div>
        </div>
        {isMobile ? <Slider /> : null}
      </div>
      {!isMobile ? <TV /> : null}
    </header>
  )
}

export default Header
