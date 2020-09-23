import React from "react"
import ExtLink from "../ExternalLink"
import "./footer.scss"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__social">
        <ul className="social__list">
          <li className="social__item">
            <ExtLink
              to="https://www.facebook.com/brunmontagne/"
              mode="secondary"
            >
              <svg className="social__icon">
                <use xlinkHref="/svg/main.svg#facebook"></use>
              </svg>
            </ExtLink>
          </li>
          <li className="social__item">
            <ExtLink
              to="https://www.instagram.com/brunmontagne/"
              mode="secondary"
            >
              <svg className="social__icon">
                <use xlinkHref="/svg/main.svg#instagram"></use>
              </svg>
            </ExtLink>
          </li>
        </ul>
      </div>
      <div className="footer__container">
        <div className="contact">
          <h2 className="heading-4">Brunmontagne</h2>
          <address className="contact__address">
            Binnendijk 79 <br />
            8461LH Rottum
            <br />
          </address>
          <ExtLink
            to="mailto:info@brunmontagne.com"
            targetBlank={false}
            mode="secondary"
          >
            info@brunmontagne.com
          </ExtLink>
          <p className="contact__phone url url-secondary">085 0074449</p>
        </div>
        <div className="footer-nav">
          <ul className="footer-nav__legal columns is-centered">
            <li className="footer-nav__item column">
              <a
                href="/privacy/"
                className="footer-nav__link url url-secondary"
              >
                Privacy & cookie statement
              </a>
            </li>
            <li className="footer-nav__item column">
              <a
                href="/conditions/"
                className="footer-nav__link url url-secondary"
              >
                Terms & conditions
              </a>
            </li>
            <li className="footer-nav__item column">
              <a
                href="/returns/"
                className="footer-nav__link url url-secondary"
              >
                Warranty and returns
              </a>
            </li>
          </ul>
        </div>
        <p className="copyright">Brunmontagne &copy; 2020</p>
        <p className="webdesign">
          Webdesign{" "}
          <ExtLink to="https://www.linkedin.com/in/devriesfr" mode="secondary">
            <strong>FDV</strong>
          </ExtLink>
        </p>
      </div>
    </footer>
  )
}

export default Footer
