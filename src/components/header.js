import React from "react" // eslint-disable-line no-unused-vars
import {
  useTranslation,
  useI18next,
  Link as I18NextLink,
} from "gatsby-plugin-react-i18next"
import { useTheme } from "@emotion/react"
import mq from "../theme/media-queries"
import BMLogo from "../assets/vectors/bm-logo-vector.svg"
import ShoppingCart from "../assets/vectors/shopping-cart.svg"
import User from "../assets/vectors/user.svg"

const NavList = ({ lang }) => {
  const { t } = useTranslation()
  const NavItems = t("menu", { returnObjects: true })

  return NavItems.map((i, n) => (
    <NavItem key={n} to={i.to} lang={lang}>
      {i.label}
    </NavItem>
  ))
}

const NavItem = ({ to, children, lang }) => (
  <I18NextLink
    className="anchor"
    to={to}
    language={lang}
    css={{
      fontSize: "1.6rem",
      lineHeight: "19px",
      letterSpacing: "0.01em",
      paddingTop: "11px",
      marginRight: "30px",
      whiteSpace: "nowrap",

      [mq("sm")]: {
        paddingTop: "0",
      },
    }}
  >
    {children}
  </I18NextLink>
)

const Header = () => {
  const theme = useTheme()
  const { lang } = useI18next()
  return (
    <header
      css={{
        position: "relative",
        zIndex: 1,
        padding: `3.2rem ${theme.padding.DEFAULT} 0 ${theme.padding.DEFAULT}`,
        [mq("lg")]: {
          padding: `3.2rem ${theme.padding.XL} 0 ${theme.padding.XL}`,
        },
        [mq("md")]: {
          padding: `3.2rem ${theme.padding.MD} 0 ${theme.padding.MD}`,
        },
        [mq("sm")]: {
          padding: `3.2rem ${theme.padding.SM} 0 ${theme.padding.SM}`,
        },
      }}
    >
      <div className="container">
        <div className="flexbox col-margin">
          <div className="col third">
            <div
              css={{
                display: "flex",
                marginTop: "2.6rem",
              }}
            >
              <NavList lang={lang} />
            </div>
          </div>
          <div className="col third">
            <div
              css={{
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              <I18NextLink aria-label="home-button" to="/" language={lang}>
                <BMLogo />
              </I18NextLink>
            </div>
          </div>
          <div className="col third">
            <div
              css={{
                margin: "2.1rem 15px -1.5rem 15px",
              }}
              className="flexbox justifyEnd"
            >
              <div className="col">
                <ShoppingCart />
              </div>
              <div className="col">
                <User />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
