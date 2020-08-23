import React from "react"
import Img from "gatsby-image"
import Button from "../Button"
import "./card.scss"

const Card = ({ product, assets }) => {
  const [activeImage, setActiveImage] = React.useState(1)
  const toggleImage = () => {
    if (activeImage < 2) setActiveImage(activeImage + 1)
    else {
      setActiveImage(1)
    }
  }
  return (
    <div className="card column is-one-quarter is-half-touch is-full-mobile">
      <div className="card__container">
        <button
          onClick={toggleImage}
          className="card__arrow-btn card__arrow-btn--left"
        >
          <svg className="card__arrow">
            <use xlinkHref="/svg/main.svg#arrow-left"></use>
          </svg>
        </button>
        <button
          onClick={toggleImage}
          className="card__arrow-btn card__arrow-btn--right"
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
            <Img fluid={assets.images[0].node.childImageSharp.fluid} />
          </div>
          <div
            className={`card__image--2 ${
              activeImage === 2 ? "active" : "inactive"
            }`}
          >
            <Img fluid={assets.images[1].node.childImageSharp.fluid} />
          </div>
        </div>
        <div className="card__btn">
          <div className="card__btn--inner">
            <Button to="/slut" className="btn btn--secondary">
              Bekijk
            </Button>
            <Button to="/slut" className="btn btn--primary">
              Bekijk
            </Button>
          </div>
        </div>
        <div className="card__information">
          <div className="card__information-top is-mobile columns">
            <div className="card__header column">
              <h3 className="card__heading heading-3">Representor</h3>
              <p className="card__sub-title">Staal/Blauw</p>
            </div>
            <div className="card__price column">
              <p className="price">&euro; 249,-</p>
            </div>
          </div>
          <div className="card__information-bottom is-mobile is-multiline columns">
            <div className="card__option-item column">
              <strong className="card__option-header">Leren banden</strong>
              <ul className="card__options">
                <li className="card__option-color card__option-color--black"></li>
                <li className="card__option-color card__option-color--blue"></li>
                <li className="card__option-color card__option-color--green"></li>
              </ul>
            </div>
            <div className="card__option-item column">
              <strong className="card__option-header">Stalen banden</strong>
              <ul className="card__options">
                <li className="card__option-color card__option-color--rose"></li>
                <li className="card__option-color card__option-color--silver"></li>
              </ul>
            </div>
            <div className="card__option-item column">
              <strong className="card__option-header">Uurwerk</strong>
              <ul className="card__options">
                <li className="card__option">Seiko</li>
                <li className="card__option">Miyota</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
