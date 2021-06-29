import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import { GatsbyImage } from "gatsby-plugin-image"
import ProductContext from "../Product/context"
import * as styles from "../../scss/components/modules/productSpecifications.module.scss"

const Specifications = ({ image }) => {
  const { t } = useTranslation("translation")
  const productSpecification = t("product.productSpecification")
  const {
    product: { specifications },
  } = useContext(ProductContext)
  return (
    <div className={styles.specifications + " columns"}>
      <div className={styles.specifications__list + " column is-narrow"}>
        <h3 className="heading-3">{productSpecification}</h3>
        {specifications.map(spec => {
          return (
            <div key={spec.key} className={styles.specifications__item}>
              <div className={styles.specifications__title}>{spec.key}</div>
              <div>{spec.value}</div>
            </div>
          )
        })}
      </div>
      <div className="column">
        <div className={styles.specifications__img}>
          <GatsbyImage
            image={image.childImageSharp.gatsbyImageData}
            alt="sketch image"
          />
        </div>
      </div>
    </div>
  )
}

export default Specifications
