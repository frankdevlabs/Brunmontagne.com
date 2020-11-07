import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import Img from "gatsby-image"
import ProductContext from "../Product/context"
import "./specifications.scss"

const Specifications = ({ image }) => {
  const { t } = useTranslation("translation")
  const productSpecification = t("product.productSpecification")
  const {
    product: { specifications },
  } = useContext(ProductContext)
  return (
    <>
      <div className="specifications columns">
        <div className="specifications__list column is-narrow">
          <h3 className="heading-3">{productSpecification}</h3>
          {specifications.map(spec => {
            return (
              <div className="specifications__item">
                <div className="specifications__title">{spec.key}</div>
                <div className="specifications__value">{spec.value}</div>
              </div>
            )
          })}
        </div>
        <div className="specifications__img-container column">
          <div className="specifications__img">
            <Img fluid={image.childImageSharp.fluid} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Specifications
