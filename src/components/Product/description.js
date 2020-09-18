import React from "react"
import "./description.scss"
import { useTranslation } from "react-i18next"

const Description = props => {
  const { t } = useTranslation("translation")

  return (
    <div className="product-description">
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
