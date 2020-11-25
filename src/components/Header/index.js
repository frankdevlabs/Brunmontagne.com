import React from "react"
import HomeHeader from "./homeHeader"
import "./header.scss"

const Header = props => {
  const setClasses = mode => {
    if (mode === "home") return "header-home"
    return "header-page"
  }

  const classes = setClasses(props.mode)

  return (
    <header className={classes}>
      {props.mode === "home" ? <HomeHeader slides={props.slides} /> : null}
    </header>
  )
}

export default Header
