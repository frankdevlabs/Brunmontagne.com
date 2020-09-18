import React from "react"
import { useTranslation } from "react-i18next"
import "./stock.scss"

const Stock = ({ stock }) => {
  const { t } = useTranslation("translation")
  return (
    <div className="product-stock">
      {stock > 0 ? (
        <>
          <div className="product-stock__available">
            {t("product.availableIcon")}
          </div>
          <div className="product-stock__info">
            <span>
              {stock} {t("product.availableStockMsg")}.{" "}
            </span>
            <span>{t("product.availableMsg")}</span>
          </div>
        </>
      ) : (
        <>
          <div className="product-stock__not-available">
            {t("product.notAvailableIcon")}
          </div>
          <div className="product-stock__info product-stock__info--not-available">
            <span>{t("product.notAvailableMsg")}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default Stock
