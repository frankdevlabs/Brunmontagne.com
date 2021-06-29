import React from "react"
import { useTranslation } from "react-i18next"
import * as styles from "../../scss/components/modules/product/description.module.scss"

const Description = props => {
  const { t } = useTranslation("translation")

  return (
    <div className={styles.productDescription}>
      <h3 className="heading-3">{t("product.description")}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: props.content,
        }}
      />
    </div>
  )
}

export default Description
