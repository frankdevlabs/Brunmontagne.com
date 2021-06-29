import React from "react"
import { useTranslation } from "react-i18next"
import * as styles from "../../scss/components/modules/discount.module.scss"

const Discount = () => {
  const { t } = useTranslation("translation")

  return (
    <section id="discount-brunmontagne" className={styles.discount}>
      <div className={styles.discount__container}>
        <h2 className={styles.discount__header}>{t("discount.header1")}</h2>
        <h3 className={styles.discount__header}>
          <strong> {t("discount.header2-bold")}</strong> {t("discount.header2")}
        </h3>
      </div>
    </section>
  )
}

export default Discount
