import React, { useMemo } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useTranslation } from "react-i18next"
import Button from "../Button"
import Link from "../Link"
import * as styles from "../../scss/components/modules/productCard/card.module.scss"
import useInView from "../../hooks/useInView"

const Card = ({ data: { uid, data }, position, list }) => {
  const { t } = useTranslation("translation")

  const options = [
    ...new Set(
      data.variable_products.reduce((allOptions, cur) => {
        const product = cur.product.document.data
        const components = product.inventory_components.reduce(
          (allComponents, cur) => {
            const indexOf = allOptions.findIndex(
              i => i.id === cur.component.document.id
            )
            if (indexOf === -1)
              return [
                ...allComponents,
                {
                  id: cur.component.document.id,
                  ...cur.component.document.data,
                },
              ]
            else return allComponents
          },
          []
        )

        return [...allOptions, ...components]
      }, [])
    ),
  ]

  const strapLeatherOptions = options.filter(
    e => e.inventory_type === "STRAP" && e.material === "LEATHER"
  )
  const strapSteelOptions = options.filter(
    e => e.inventory_type === "STRAP" && e.material === "STEEL"
  )
  const strapRubberOptions = options.filter(
    e => e.inventory_type === "STRAP" && e.material === "RUBBER"
  )
  const caseOptions = options.filter(e => e.inventory_type === "CASE")

  const price =
    data.variable_products.length > 0
      ? data.variable_products[0].product.document.data.price
      : data.price

  const firstStrapOption =
    data.variable_products.length > 0
      ? data.variable_products[0].product.document.data.inventory_components.filter(
          i => {
            return i.component.document.data.inventory_type === "STRAP"
          }
        )[0].component.document.data.public_name
      : ""

  const firstCaseOption =
    data.variable_products.length > 0
      ? data.variable_products[0].product.document.data.inventory_components.filter(
          i => {
            return i.component.document.data.inventory_type === "CASE"
          }
        )[0].component.document.data.public_name
      : ""

  const productSubTitle =
    data.variable_products.length > 0
      ? `${t("product.movement")}: ${firstCaseOption} | ${t(
          "product.watchStrap"
        )}: ${firstStrapOption}`
      : ""

  const id =
    data.variable_products.length > 0
      ? data.variable_products[0].product.document.data.sku
      : data.sku

  const DataLayerValue = useMemo(() => {
    return {
      item_name: data.name,
      item_id: id,
      item_variant: productSubTitle,
      item_brand: "Brunmontagne",
      item_category: data.categories[0].category.document.uid,
      item_list_name: list, // If associated with a list selection.
      item_list_id: list, // If associated with a list selection.
      index: position + 1, // If associated with a list selection.
      quantity: 1,
      ...(productSubTitle !== "" ? { item_variant: productSubTitle } : {}),
      price: price,
    }
  }, [id, data, price, list, position, productSubTitle])

  const [containerRef, isVisible] = useInView(
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    },
    () => {
      if (isVisible) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "viewed_list_item",
          item: DataLayerValue,
          element: containerRef,
        })
      }
    },
    true
  )

  return (
    <div
      ref={containerRef}
      data-product-id={id}
      data-product-dl={JSON.stringify(DataLayerValue)}
      className={styles.card + " column is-one-quarter is-half-touch"}
    >
      <div className={styles.card__container}>
        <Link to={`/products/${uid}/`} className={styles.card__overlayBtn} />
        <div className={styles.card__imageOverlay}>{""}</div>
        <div
          className={styles.card__image}
          style={{ maxWidth: "340px", minHeight: "24rem" }}
        >
          <div className={styles.card__image1 + " active"}>
            <GatsbyImage
              image={
                data.images[0].image.localFile.childImageSharp.gatsbyImageData
              }
              alt={data.images[0].alt}
            />
          </div>
          <div className={styles.card__image2 + " inactive"}>
            <GatsbyImage
              image={
                data.images[1].image.localFile.childImageSharp.gatsbyImageData
              }
              alt={data.images[1].alt}
            />
          </div>
        </div>
        <div className={styles.card__btn}>
          <div className={styles.card__btnInner}>
            <Link
              to={`/products/${uid}/`}
              className={"btn btn--secondary " + styles.btnSecondary}
            >
              {t("productCards.btn")}
            </Link>
            <Button
              to={`/products/${uid}/`}
              className={"btn btn--primary " + styles.btnPrimary}
            >
              {t("productCards.btn")}
            </Button>
          </div>
        </div>
        <div className={styles.card__information}>
          <div className="is-mobile columns">
            <div className="column">
              <h3 className={styles.card__heading + " heading-3"}>
                {data.title.text}
              </h3>
              <p className={styles.card__subTitle}>{data.subtitle.text}</p>
            </div>
            <div className={styles.card__price + " column is-narrow"}>
              <span className="price">&euro; {price},-</span>
            </div>
          </div>
          <div
            className={
              styles.card__informationBottom + " is-mobile is-multiline columns"
            }
          >
            {strapLeatherOptions.length > 0 ? (
              <div className="column">
                <strong className={styles.card__optionHeader}>
                  {t("productCards.leatherStraps")}:
                </strong>
                <ul className={styles.card__options}>
                  {strapLeatherOptions.map(option => (
                    <li
                      key={option.id}
                      className={styles.card__optionColor}
                      style={{ background: `${option.color}` }}
                    >
                      {""}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {strapSteelOptions.length > 0 ? (
              <div className="column">
                <strong className={styles.card__optionHeader}>
                  {t("productCards.steelStraps")}
                </strong>
                <ul className={styles.card__options}>
                  {strapSteelOptions.map(option => (
                    <li
                      key={option.id}
                      className={styles.card__optionColor}
                      style={{ background: `${option.color}` }}
                    >
                      {""}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {strapRubberOptions.length > 0 ? (
              <div className="column">
                <strong className={styles.card__optionHeader}>
                  {t("productCards.rubberStraps")}:
                </strong>
                <ul className={styles.card__options}>
                  {strapRubberOptions.map(option => (
                    <li
                      key={option.id}
                      className={styles.card__optionColor}
                      style={{ background: `${option.color}` }}
                    >
                      {""}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {caseOptions.length > 0 ? (
              <div className="column is-full">
                <strong className={styles.card__optionHeader}>
                  {t("productCards.movement")}
                </strong>
                <ul className={styles.card__options}>
                  {caseOptions.map(option => (
                    <li key={option.id} className={styles.card__option}>
                      {option.public_name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
