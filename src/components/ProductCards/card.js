import React from "react"
import Img from "gatsby-image"
import Button from "../Button"
import Link from "../Link"
import "./card.scss"
import { useTranslation } from "react-i18next"

const Card = ({ data, options }) => {
  const { t } = useTranslation("translation")

  const [activeImage, setActiveImage] = React.useState(1)
  const toggleImage = () => {
    if (activeImage < 2) setActiveImage(activeImage + 1)
    else {
      setActiveImage(1)
    }
  }
  const strapLeatherOptions = options.filter(
    e => e.inventory_type === "STRAP" && e.material === "LEATHER"
  )
  const strapSteelOptions = options.filter(
    e => e.inventory_type === "STRAP" && e.material === "STEEL"
  )
  const caseOptions = options.filter(e => e.inventory_type === "CASE")

  return (
    <div className="card column is-one-quarter is-half-touch is-full-mobile">
      <div className="card__container">
        <button
          onClick={toggleImage}
          className="card__arrow-btn card__arrow-btn--left"
          aria-label="move-product-image-left"
        >
          <svg className="card__arrow">
            <use xlinkHref="/svg/main.svg#arrow-left"></use>
          </svg>
        </button>
        <button
          onClick={toggleImage}
          className="card__arrow-btn card__arrow-btn--right"
          aria-label="move-product-image-right"
        >
          <svg className="card__arrow">
            <use xlinkHref="/svg/main.svg#arrow-right"></use>
          </svg>
        </button>
        <div className="card__image-overlay"></div>
        <div className="card__image" style={{ maxWidth: "285px" }}>
          <div
            className={`card__image--1 ${
              activeImage === 1 ? "active" : "inactive"
            }`}
          >
            <Img fluid={data.images[0].node.childImageSharp.fluid} />
          </div>
          <div
            className={`card__image--2 ${
              activeImage === 2 ? "active" : "inactive"
            }`}
          >
            <Img fluid={data.images[1].node.childImageSharp.fluid} />
          </div>
        </div>
        <div className="card__btn">
          <div className="card__btn--inner">
            <Link to={`/products/${data.uid}`} className="btn btn--secondary">
              Bekijk
            </Link>
            <Button to={`/products/${data.uid}`} className="btn btn--primary">
              Bekijk
            </Button>
          </div>
        </div>
        <div className="card__information">
          <div className="card__information-top is-mobile columns">
            <div className="card__header column">
              <h3 className="card__heading heading-3">{data.title.text}</h3>
              <p className="card__sub-title">{data.subtitle.text}</p>
            </div>
            <div className="card__price column">
              <p className="price">&euro; 249,-</p>
            </div>
          </div>
          <div className="card__information-bottom is-mobile is-multiline columns">
            {strapLeatherOptions.length > 0 ? (
              <div className="card__option-item column">
                <strong className="card__option-header">
                  {t("productCards.leatherStraps")}:
                </strong>
                <ul className="card__options">
                  {strapLeatherOptions.map(option => (
                    <li
                      key={option.id}
                      className="card__option-color"
                      style={{ background: `${option.color}` }}
                    ></li>
                  ))}
                </ul>
              </div>
            ) : null}
            {strapSteelOptions.length > 0 ? (
              <div className="card__option-item column">
                <strong className="card__option-header">
                  {t("productCards.steelStraps")}
                </strong>
                <ul className="card__options">
                  {strapSteelOptions.map(option => (
                    <li
                      key={option.id}
                      className="card__option-color"
                      style={{ background: `${option.color}` }}
                    ></li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="card__option-item column">
              <strong className="card__option-header">
                {t("productCards.movement")}
              </strong>
              <ul className="card__options">
                {caseOptions.map(option => (
                  <li className="card__option">{option.public_name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
