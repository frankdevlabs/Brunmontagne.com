import React from "react"
import { useTranslation } from "react-i18next"
import * as styles from "../../scss/components/modules/product/stock.module.scss"

const Stock = ({ stock, backorder }) => {
  const { t } = useTranslation("translation")
  return (
    <div className={styles.productStock}>
      {backorder.state ? (
        <>
          <div className={styles.productStock__backorder}>
            {t("product.notBackorderIcon")}
          </div>
          <div className={styles.productStock__info}>
            <span>
              {t("product.notBackorderMsg")}
              {backorder.expected}.
            </span>
          </div>
        </>
      ) : stock > 0 ? (
        <>
          <div className={styles.productStock__available}>
            {t("product.availableIcon")}
          </div>
          <div className={styles.productStock__info}>
            <span>
              {stock} {t("product.availableStockMsg")}.{" "}
            </span>
            <span>{t("product.availableMsg")}</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.productStock__notAvailable}>
            {t("product.notAvailableIcon")}
          </div>
          <div
            className={`${styles.productStock__info} ${styles.productStock__infoNotAvailable}`}
          >
            <span>{t("product.notAvailableMsg")}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default Stock
