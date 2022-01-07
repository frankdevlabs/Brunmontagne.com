import React from "react"
import { useTranslation } from "react-i18next"
import Button from "../Button"
import Slider from "./slider"

const HomeHeader = () => {
  // const [isMobile, setIsMobile] = React.useState(true)
  //
  // React.useEffect(() => {
  //   setIsMobile(_isMobile())
  // }, [])

  const { t } = useTranslation()
  return (
    <>
      <div className="header-home__cover">
        <div className="header-home__promo-poly-modal">
          <h3 className="promo-font-side">
            {t("navigation.promo-fall-2021.tagline")}
          </h3>
        </div>
        <div className="header-home__text">
          <div className="header-home__text-wrapper">
            <h1 className="heading-1">brunmontagne</h1>
            <p className="heading-tagline">Represents you</p>
            <h2 className="promo-font">
              {t("navigation.promo-fall-2021.fall")}
            </h2>
            <span className="promo-font-tagline">
              {t("navigation.promo-fall-2021.promotion")}{" "}
              {/*<u className="promo-font-tagline-innner">*/}
              {/*  {t("navigation.promo-fall-2021.code")}*/}
              {/*</u>*/}
            </span>
            <Button
              to="/products/representor-steel-silver/"
              className="btn btn--secondary btn--cta"
            >
              {t("navigation.promo-fall-2021.term")}
            </Button>
          </div>
          {/*<div className="header-home__categories columns">*/}
          {/*  <div className="header-home__category column is-full-mobile">*/}
          {/*    <Button*/}
          {/*      to="/collection#watches"*/}
          {/*      className="btn btn--secondary btn--cta"*/}
          {/*    >*/}
          {/*      {t("navigation.watches.term")}*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*  <div className="header-home__category column is-full-mobile">*/}
          {/*    <Button*/}
          {/*      to="/collection#watch-straps"*/}
          {/*      className="btn btn--secondary btn--cta"*/}
          {/*    >*/}
          {/*      {t("navigation.watch-straps.term")}*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <Slider />
        {/*{isMobile ? <Slider /> : null}*/}
      </div>
      {/*{!isMobile ? <TV /> : null}*/}
    </>
  )
}

export default HomeHeader
