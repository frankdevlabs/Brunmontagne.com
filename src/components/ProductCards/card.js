import React from "react"
import Img from "gatsby-image"
import Button from "../Button"
import Link from "../Link"
import "./card.scss"
import { useTranslation } from "react-i18next"

const Card = ({ data, position, list }) => {
  const { t } = useTranslation("translation")

  const options = [
    ...new Set(
      data.variable_products.reduce((allOptions, cur) => {
        const product = cur.product.document.data
        const components = product.inventory_components.reduce(
          (allComponents, cur) => {
            const indexOf = allOptions.findIndex(
              i => i.id === cur.component.document.id
            )
            if (indexOf === -1)
              return [
                ...allComponents,
                {
                  id: cur.component.document.id,
                  ...cur.component.document.data,
                },
              ]
            else return allComponents
          },
          []
        )

        return [...allOptions, ...components]
      }, [])
    ),
  ]
  const strapLeatherOptions = options.filter(
    e => e.inventory_type === "STRAP" && e.material === "LEATHER"
  )
  const strapSteelOptions = options.filter(
    e => e.inventory_type === "STRAP" && e.material === "STEEL"
  )
  const strapRubberOptions = options.filter(
    e => e.inventory_type === "STRAP" && e.material === "RUBBER"
  )
  const caseOptions = options.filter(e => e.inventory_type === "CASE")

  const price =
    data.variable_products.length > 0
      ? data.variable_products[0].product.document.data.price
      : data.price

  const firstStrapOption =
    data.variable_products.length > 0
      ? data.variable_products[0].product.document.data.inventory_components.filter(
          i => {
            return i.component.document.data.inventory_type === "STRAP"
          }
        )[0].component.document.data.public_name
      : ""

  const firstCaseOption =
    data.variable_products.length > 0
      ? data.variable_products[0].product.document.data.inventory_components.filter(
          i => {
            return i.component.document.data.inventory_type === "CASE"
          }
        )[0].component.document.data.public_name
      : ""

  const productSubTitle =
    data.variable_products.length > 0
      ? `${t("product.movement")}: ${firstCaseOption} | ${t(
          "product.watchStrap"
        )}: ${firstStrapOption}`
      : ""

  const dataLayer = JSON.stringify({
    eventCategory: "Product Click",
    list: list,
    position: position,
    variant: productSubTitle,
    product: data,
  })

  return (
    <div className="card column is-one-quarter is-half-touch">
      <div className="card__container">
        <div className="card__image-overlay"></div>
        <div
          className="card__image"
          style={{ maxWidth: "285px", minHeight: "24rem" }}
        >
          <div className="card__image--1 active">
            <Img fluid={data.images[0].node.childImageSharp.fluid} />
          </div>
          <div className="card__image--2 inactive">
            <Img fluid={data.images[1].node.childImageSharp.fluid} />
          </div>
        </div>
        <div className="card__btn">
          <div className="card__btn--inner">
            <Link
              to={`/products/${data.uid}`}
              data-product={dataLayer}
              className="btn btn--secondary"
            >
              Bekijk
            </Link>
            <Button
              to={`/products/${data.uid}`}
              data-product={dataLayer}
              className="btn btn--primary"
            >
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
            <div className="card__price column is-narrow">
              <span className="price">&euro; {price},-</span>
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
                    >
                      {""}
                    </li>
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
                    >
                      {""}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {strapRubberOptions.length > 0 ? (
              <div className="card__option-item column">
                <strong className="card__option-header">
                  {t("productCards.rubberStraps")}:
                </strong>
                <ul className="card__options">
                  {strapRubberOptions.map(option => (
                    <li
                      key={option.id}
                      className="card__option-color"
                      style={{ background: `${option.color}` }}
                    >
                      {""}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {caseOptions.length > 0 ? (
              <div className="card__option-item column is-full">
                <strong className="card__option-header">
                  {t("productCards.movement")}
                </strong>
                <ul className="card__options">
                  {caseOptions.map(option => (
                    <li key={option.id} className="card__option">
                      {option.public_name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
