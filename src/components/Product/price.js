import React from "react"

import "./price.scss"
import { useTranslation } from "react-i18next"

const formatPrice = p => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(p)
}

const discountPercentage = (sp, rp) => {
  return Math.floor(((rp - sp) / rp) * 100)
}

const Price = props => {
  const base = props.sale ? props.salePrice : props.regularPrice
  const { t } = useTranslation("translation")

  return (
    <div className="product-price">
      <span className="product-price__base">{formatPrice(base)}</span>
      {props.sale ? (
        <div className="product-price__promo">
          <div className="product-price__regular">
            {t("product.regularPrice")}{" "}
            <del>{formatPrice(props.regularPrice)}</del>
          </div>
          <div className="product-price__percentage">
            {t("product.youSave")}{" "}
            {discountPercentage(props.salePrice, props.regularPrice)}%
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Price
