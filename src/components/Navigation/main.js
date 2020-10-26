import React from "react"
import NavList from "./list"
import Cart from "./cart"
import LanguagePicker from "../LanguagePicker"
import "./main.scss"
import Link from "../Link"

export default props => {
  return (
    <>
      <nav
        className={`navigation-mobile ${
          props.sticky ? " navigation-mobile__sticky" : ""
        }`}
        role="navigation"
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
      <nav
        className={`navigation ${props.sticky ? " navigation__sticky" : ""}`}
        role="navigation"
      >
        <div className="navigation__container columns is-variable">
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
          <div className="navigation__logo column is-one-quarter-desktop">
            <Link to="/" className="navigation__logo-home">
              <svg className="navigation__img">
                <use xlinkHref="/svg/main.svg#logo"></use>
              </svg>
            </Link>
          </div>
          <div className="navigation__main is-narrow-tablet column">
            <div className="navigation__columns columns is-mobile">
              <div className="navigation__menu column">
                <NavList items={props.items} mode="default" />
              </div>
              <div className="navigation__cart column is-narrow-mobile">
                <Cart />
              </div>
              <div className="navigation__auth column is-narrow-mobile">
                <button
                  className="navigation__auth--link snipcart-customer-signin"
                  aria-label="cart-button"
                >
                  <svg className="navigation__auth--icon">
                    <use xlinkHref="/svg/main.svg#person"></use>
                  </svg>
                </button>
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
