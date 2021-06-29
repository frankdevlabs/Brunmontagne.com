import React from "react"

import * as styles from "../../scss/components/modules/product/price.module.scss"
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
    <div className={styles.productPrice}>
      <span className={styles.productPrice__base}>{formatPrice(base)}</span>
      {props.sale ? (
        <div className="product-price__promo">
          <div className={styles.productPrice__regular}>
            {t("product.regularPrice")}{" "}
            <del>{formatPrice(props.regularPrice)}</del>
          </div>
          <div className={styles.productPrice__percentage}>
            {t("product.youSave")}{" "}
            {discountPercentage(props.salePrice, props.regularPrice)}%
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Price
