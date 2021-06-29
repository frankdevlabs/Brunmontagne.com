import React from "react"
import { useTranslation } from "react-i18next"
import { usePageContext } from "../../../pageContext"
import * as styles from "../../scss/components/modules/product/add-to-cart-btn.module.scss"

const AddToCartButton = props => {
  const { t } = useTranslation("translation")
  const { lang } = usePageContext()
  return (
    <button
      className={`${styles.productCart__btn} snipcart-add-item btn btn--primary`}
      data-item-id={props.id}
      data-item-price={props.sale ? props.salePrice : props.price}
      data-item-url={
        lang === "en" ? "/en" + props.slug + "/" : props.slug + "/"
      }
      data-item-description={props.productSubTitle}
      data-item-image={props.image}
      data-item-name={props.name}
      data-item-has-taxes-included="true"
    >
      <svg className={styles.productCart__icon}>
        <use xlinkHref="/svg/main.svg#plus"></use>
      </svg>
      {t("product.inBasket")}
    </button>
  )
}

export default AddToCartButton
