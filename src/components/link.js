import React from "react" // eslint-disable-line no-unused-vars
import { useI18next, Link as I18NextLink } from "gatsby-plugin-react-i18next"
import ArrowEast from "../assets/vectors/arrow-east.svg"
import { useTheme } from "@emotion/react"

const Link = props => {
  const { children, ui, to, external } = props
  const _props = { to }
  const theme = useTheme()
  const hoverColor = theme.colors.TETIATERY

  const buttonStyles = {
    padding: "2rem 0",
    borderBottom: "2px solid #F1F1F1",
    whiteSpace: "nowrap",
    display: "inline-flex",
    "&, & > *, & > * > path": {
      transition: "all 0.5s ease",
    },
    "&:hover, &:active": {
      borderBottom: `2px solid ${hoverColor}`,
    },
    "&:hover > span, &:active > span": {
      color: hoverColor,
    },
    "&:hover > svg > path, &:active > svg > path": {
      fill: hoverColor,
    },
  }

  if (ui === "button") {
    const { lang } = useI18next()

    return (
      <I18NextLink css={buttonStyles} {..._props} language={lang}>
        <span css={{ marginRight: "3rem" }}>{children}</span>
        <ArrowEast />
      </I18NextLink>
    )
  }
}

export default Link
