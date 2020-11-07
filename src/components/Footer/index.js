import React from "react"
import { useTranslation } from "react-i18next"
import ExtLink from "../ExternalLink"
import Link from "../Link"
import { usePageContext } from "../../../pageContext"
import "./footer.scss"

const Footer = ({ stickyNav }) => {
  const { t } = useTranslation()
  const { lang } = usePageContext()
  return (
    <footer className={`footer${stickyNav ? " footer__sticky-nav" : ""}`}>
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
          <p className="contact__phone url url-secondary">
            {t("common.phone-number")}
          </p>
        </div>
        <div className="footer-nav">
          <ul className="footer-nav__legal columns is-centered">
            <li className="footer-nav__item column">
              <Link
                to="/privacy/"
                className="footer-nav__link url url-secondary"
              >
                Privacy & cookie statement
              </Link>
            </li>
            <li className="footer-nav__item column">
              <Link to="/terms/" className="footer-nav__link url url-secondary">
                {lang === "en" ? "Terms & conditions" : "Algemene voorwaarden"}
              </Link>
            </li>
            <li className="footer-nav__item column">
              <Link
                to="/returns/"
                className="footer-nav__link url url-secondary"
              >
                {lang === "en"
                  ? "Warranty and returns"
                  : "Garantie en retouren"}
              </Link>
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
