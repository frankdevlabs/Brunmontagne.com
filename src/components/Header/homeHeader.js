import React from "react"
import { useTranslation } from "react-i18next"
import Button from "../Button"
import Slider from "./slider"

const HomeHeader = ({ slides }) => {
  // const [isMobile, setIsMobile] = React.useState(true)
  //
  // React.useEffect(() => {
  //   setIsMobile(_isMobile())
  // }, [])

  const { t } = useTranslation()
  return (
    <>
      <div className="header-home__cover">
        <div className="header-home__text">
          <div class="header-home__text-wrapper">
            <h1 className="heading-1">brunmontagne</h1>
            <p className="heading-tagline">Represents you</p>
          </div>
          <div className="header-home__categories columns">
            <div className="header-home__category column is-full-mobile">
              <Button
                to="/collection#watches"
                className="btn btn--secondary btn--cta"
              >
                {t("navigation.watches.term")}
              </Button>
            </div>
            <div className="header-home__category column is-full-mobile">
              <Button
                to="/collection#watch-straps"
                className="btn btn--secondary btn--cta"
              >
                {t("navigation.watch-straps.term")}
              </Button>
            </div>
          </div>
        </div>
        <Slider slides={slides} />
        {/*{isMobile ? <Slider /> : null}*/}
      </div>
      {/*{!isMobile ? <TV /> : null}*/}
    </>
  )
}

export default HomeHeader
