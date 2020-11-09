import React from "react"
import { withTranslation } from "react-i18next"
import AddToCartButton from "./add-to-cart-btn"
import Description from "./description"
import ImageGallery from "../ImageGallery"
import Options from "./options"
import Price from "./price"
import Rating from "../Rating"
import Stock from "./stock"
import Link from "../Link"
import ProductContext from "./context"
import "./product.scss"

class Product extends React.Component {
  render() {
    const { t } = this.props
    // const productSpecification = t("product.productSpecification")
    return (
      <ProductContext.Consumer>
        {value => {
          const {
            product: { name, description, variableProducts = [], reviews },
          } = value

          const { price, discountPrice, discountActive, sku } =
            value.variableProductsUIDs.length > 0
              ? variableProducts[value.activeVariableProduct]
              : value.product

          const images =
            value.variableProductsUIDs.length > 0
              ? [
                  ...value.variableProductsUIDs.reduce(
                    (cur, val) => {
                      if (val !== value.activeVariableProduct) {
                        const newImages = []
                        const indices = cur.map(i => i.node.id)
                        for (
                          let i = 0;
                          i < variableProducts[val].images.length;
                          i++
                        ) {
                          if (
                            indices.indexOf(
                              variableProducts[val].images[i].node.id
                            ) === -1
                          )
                            newImages.push(variableProducts[val].images[i])
                        }

                        return [...cur, ...newImages]
                      }
                      return cur
                    },
                    [...variableProducts[value.activeVariableProduct].images]
                  ),
                ]
              : value.product.images

          const { uid, options } =
            value.variableProductsUIDs.length > 0
              ? variableProducts[value.activeVariableProduct]
              : value.product

          const stock =
            value.variableProductsUIDs.length > 0
              ? Math.min(options.case.stock, options.strap.stock)
              : value.product.inventory_components[0].component.document.data
                  .stock

          const isBackorder =
            options.case.in_backorder || options.strap.in_backorder
          const backorderDate = isBackorder
            ? options.case.backorder_expected_date_available ||
              options.strap.backorder_expected_date_available
            : "1970-01-01"

          const slug =
            value.variableProductsUIDs.length > 0
              ? `/products/${value.product.uid}/variants/${uid}`
              : `/products/${uid}`

          const avgRating = () => {
            let total = 0
            for (let i = 0; i < reviews.length; i++) {
              total += reviews[i].rating
            }
            const avg = total / reviews.length
            return Math.round((avg + Number.EPSILON) * 10) / 10
          }

          const productSubTitle =
            value.variableProductsUIDs.length > 0
              ? `${t("product.movement")}: ${options.case.public_name} | ${t(
                  "product.watchStrap"
                )}: ${options.strap.public_name}`
              : ""

          return (
            <div className="product columns is-tablet is-multiline">
              <div
                className="product__header column is-full"
                style={{ margin: "0 1.5%" }}
              >
                <h2 className="heading-2">{name}</h2>
                <div className="product__header-meta">
                  <div className="product__header-meta-option">
                    {reviews.length > 0 ? (
                      <Rating value={avgRating()} votes={reviews.length} />
                    ) : (
                      <span>
                        <Link
                          className="link__primary"
                          to={`/products/${value.product.uid}#reviews`}
                        >
                          {t("product.noReviewMsg")}
                        </Link>
                      </span>
                    )}
                  </div>
                  {!this.props.isWatchStrap ? (
                    <>
                      <div className="product__header-meta-option">
                        {t("product.movement")}: {options.case.public_name}
                      </div>
                      <div className="product__header-meta-option">
                        {t("product.watchStrap")}: {options.strap.public_name}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="product__gallery column is-half-tablet">
                <ImageGallery images={images} />
              </div>
              <div className="product__content column is-half-tablet">
                <Price
                  regularPrice={price}
                  salePrice={discountPrice}
                  sale={discountActive}
                />
                <Stock
                  stock={stock}
                  backorder={{ state: isBackorder, expected: backorderDate }}
                />
                {value.variableProductsUIDs.length > 0 ? <Options /> : null}
                <div className="product__add-to-cart-button">
                  <AddToCartButton
                    id={sku}
                    sale={discountActive}
                    salePrice={discountPrice}
                    price={price}
                    slug={slug}
                    name={name}
                    image={images[0].node.childImageSharp.fluid.src}
                    productSubTitle={productSubTitle}
                  />
                </div>
                <Description content={description.html} />
              </div>
            </div>
          )
        }}
      </ProductContext.Consumer>
    )
  }
}

export default withTranslation("translation")(Product)
