import React from "react"
import { useTranslation } from "react-i18next"
import "./discount.scss"

const Discount = () => {
  const { t } = useTranslation("translation")

  return (
    <section id="discount-brunmontagne" className="discount">
      <div className="discount__container">
        <h2 className="discount__header">{t("discount.header1")}</h2>
        <h3 className="discount__header">
          <strong> {t("discount.header2-bold")}</strong> {t("discount.header2")}
        </h3>
      </div>
    </section>
  )
}

export default Discount
