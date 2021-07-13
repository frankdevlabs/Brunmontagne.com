import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import { GatsbyImage } from "gatsby-plugin-image"
import ProductContext from "../Product/context"
import * as styles from "../../scss/components/modules/productSpecifications.module.scss"
import { graphql, useStaticQuery } from "gatsby"

const Specifications = () => {
  const { t } = useTranslation("translation")
  const productSpecification = t("product.productSpecification")
  const {
    product: { specifications },
  } = useContext(ProductContext)
  const image = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "representor-product-sketch.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 850, quality: 50, webpOptions: { quality: 70 })
        }
      }
    }
  `)

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
            image={image.file.childImageSharp.gatsbyImageData}
            alt="sketch image"
          />
        </div>
      </div>
    </div>
  )
}

export default Specifications
