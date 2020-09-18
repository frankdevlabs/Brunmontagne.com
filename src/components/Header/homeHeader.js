import React from "react"
import { useTranslation } from "react-i18next"
import Slider from "./slider"
import TV from "./tv"
import Button from "../Button"
import { isMobile as _isMobile } from "../../utils/isMobile"

const HomeHeader = () => {
  const [isMobile, setIsMobile] = React.useState(true)

  React.useEffect(() => {
    setIsMobile(_isMobile())
  }, [])

  const { t } = useTranslation()

  return (
    <>
      <div className="header-home__cover">
        <div className="header-home__text">
          <h1 className="heading-1">brunmontagne</h1>
          <p className="heading-tagline">Represents you</p>
          <div className="header-home__categories columns">
            <div className="header-home__category column is-full-mobile">
              <Button
                to={`/${t("navigation.product-category")}/${t(
                  "navigation.watches.slug"
                )}`}
                className="btn btn--secondary btn--cta"
              >
                {t("navigation.watches.term")}
              </Button>
            </div>
            <div className="header-home__category column is-full-mobile">
              <Button
                to={`/${t("navigation.product-category")}/${t(
                  "navigation.pre-orders.slug"
                )}`}
                className="btn btn--secondary btn--cta"
              >
                {t("navigation.pre-orders.term")}
              </Button>
            </div>
            <div className="header-home__category column is-full-mobile">
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
        {!isMobile ? <Slider /> : null}
      </div>
      {isMobile ? <TV /> : null}
    </>
  )
}

export default HomeHeader
