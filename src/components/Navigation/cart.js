import React from "react"
import { SnipcartContext } from "gatsby-plugin-snipcart-advanced/context"

const Cart = () => {
  const { state } = React.useContext(SnipcartContext)
  const { cartQuantity } = state

  return (
    <>
      <button
        className="navigation__cart--link snipcart-checkout"
        aria-label="cart-button"
      >
        <svg className="navigation__cart--icon">
          <use xlinkHref="/svg/main.svg#cart"></use>
        </svg>
        <span className="navigation__cart--notification">{cartQuantity}</span>

      </button>
    </>
  )
}

export default Cart
