import React from "react"
import { Link } from "gatsby"
import NavList from "./list"
import "./item.scss"

const setClasses = (mode, items) => {
  if (mode === "default" && items.length > 0) {
    return "navigation__item navigation__item--has-dropdown column is-narrow"
  } else if (mode === "default") {
    return "navigation__item column is-narrow"
  } else if (mode === "mobile" && items.length > 0) {
    return "navigation-mobile__item navigation-mobile__item--has-dropdown"
  } else if (mode === "mobile") {
    return "column is-narrow navigation-mobile__item"
  }
}

export default props => {
  const classes = setClasses(props.mode, props.items)

  return (
    <li className={classes}>
      <Link
        to={props.to}
        className={`navigation__link ${
          props.mode === "mobile" ? " navigation__link-secondary" : null
        }`}
      >
        {props.children}
        {props.items.length > 0 ? (
          <svg width="14px" height="14px">
            <use xlinkHref="/svg/main.svg#arrow-down"></use>
          </svg>
        ) : null}
      </Link>
      {props.items.length > 0 ? (
        <NavList items={props.items} isSubMenu={true} mode={props.mode} />
      ) : null}
    </li>
  )
}
