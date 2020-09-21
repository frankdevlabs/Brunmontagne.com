import React from "react"
import NavList from "./list"
import Cart from "./cart"
import LanguagePicker from "../LanguagePicker"
import "./main.scss"

export default props => {
  return (
    <>
      <nav
        className="navigation-mobile"
        role="navigation"
        for="navigation-mobile"
      >
        <div className="navigation-mobile__menu">
          <input
            className="navigation-mobile__checkbox "
            type="checkbox"
            id="navigation-mobile"
          />
          <div className="navigation-mobile__container">
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </div>
          <NavList languageItem={true} mode="mobile" items={props.items} />
        </div>
      </nav>
      <nav className="navigation" role="navigation">
        <div className="navigation__container columns is-variable is-8">
          <div className="navigation__ghost-item navigation__cart column is-narrow">
            <a
              className="navigation__cart--link"
              href="https://wwww.brunmontagne.com"
              aria-label="cart"
              role="button"
            >
              <i aria-hidden="true"></i>
            </a>
            <span className="navigation__cart--notification">0</span>
          </div>
          <div className="navigation__logo column is-one-quarter is-half-mobile">
            <a href="/" className="navigation__logo-home">
              <svg className="navigation__img">
                <use xlinkHref="/svg/main.svg#logo"></use>
              </svg>
            </a>
          </div>
          <div className="navigation__main is-narrow-tablet is-three-quarters-desktop column">
            <div className="navigation__columns columns">
              <div className="navigation__menu column">
                <NavList items={props.items} mode="default" />
              </div>
              <div className="navigation__cart column is-narrow">
                <Cart />
              </div>
              <div className="navigation__language column is-narrow">
                <LanguagePicker />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
