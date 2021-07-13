import React from "react"
import HomeHeader from "./homeHeader"

const Header = props => {
  const setClasses = mode => {
    if (mode === "home") return "header-home"
    return "header-page"
  }

  const classes = setClasses(props.mode)

  return (
    <header className={classes}>
      {props.mode === "home" ? <HomeHeader /> : null}
    </header>
  )
}

export default Header
