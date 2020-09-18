import React from "react"
import ImageGallery from "../ImageGallery"
import Price from "./price"
import Stock from "./stock"
import AddToCartButton from "./add-to-cart-btn"
import Description from "./description"
import Rating from "../Rating"
import Options from "./options"
import ProductContext from "./context"
import "./product.scss"
import { withTranslation } from "react-i18next"

class Product extends React.Component {
  render() {
    const { t } = this.props

    return (
      <ProductContext.Consumer>
        {value => {
          const {
            product: { name, description, variableProducts = [] },
          } = value

          const { price, discountPrice, discountActive, images } =
            value.variableProductsUIDs.length > 0
              ? variableProducts[value.activeVariableProduct]
              : value.product

          const { id, uid, options } =
            value.variableProductsUIDs.length > 0
              ? variableProducts[value.activeVariableProduct]
              : value.product

          const stock =
            value.variableProductsUIDs.length > 0
              ? Math.min(options.case.stock, options.strap.stock)
              : options.case.stock || options.strap.stock

          const slug =
            value.variableProductsUIDs.length > 0
              ? `/products/${value.product.uid}/variants/${uid}`
              : `/products/${uid}`

          return (
            <div className="product columns is-tablet is-multiline">
              <div className="product__header column is-full">
                <h2 className="heading-2">{name}</h2>
                <div className="product__header-meta">
                  <div className="product__header-meta-option">
                    <Rating />
                  </div>
                  {options ? (
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
                <Stock stock={stock} />
                {value.variableProductsUIDs.length > 0 ? <Options /> : null}
                <div className="product__add-to-cart-button">
                  <AddToCartButton
                    id={id}
                    sale={discountActive}
                    salePrice={discountPrice}
                    price={price}
                    slug={slug}
                    name={name}
                    image={images[0].node.childImageSharp.fluid.src}
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
