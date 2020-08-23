import React from "react"
import Item from "./item"
import "./list.scss"
import LanguagePicker from "../LanguagePicker"

const setClasses = (mode, isSubMenu) => {
  if (mode === "default" && isSubMenu === true) {
    return "navigation__list navigation__list-sub column is-narrow"
  } else if (mode === "default") {
    return "navigation__list columns is-variable is-8"
  } else if (mode === "mobile" && isSubMenu === true) {
    return "navigation-mobile__list-sub column is-narrow"
  } else if (mode === "mobile") {
    return "navigation-mobile__list columns is-variable is-8"
  }
}

export default props => {
  const classes = setClasses(props.mode, props.isSubMenu)

  return (
    <ul className={classes}>
      {props.items.map(item => {
        return (
          <Item
            key={item.to}
            to={item.to}
            mode={props.mode}
            items={item.subMenu}
          >
            {item.content}
          </Item>
        )
      })}
      {props.languageItem ? (
        <li className="navigation-mobile__item navigation-mobile__language">
          <LanguagePicker mode="flat" />
        </li>
      ) : null}
    </ul>
  )
}
