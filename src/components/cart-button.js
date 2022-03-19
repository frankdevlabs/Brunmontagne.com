import React from "react"; // eslint-disable-line no-unused-vars
import Link from "./link";
import Cart from "../assets/vectors/shopping-cart.svg";
import mq from "../theme/media-queries";
import { useTheme } from "@emotion/react";

const CartButton = ({ quantity }) => {
  const theme = useTheme();
  return (
    <Link
      ui="custom"
      aria-label={`Shopping Cart with ${quantity} items`}
      to="/cart/"
      customStyle={{
        position: "relative",
      }}
    >
      <div css={{ position: "relative" }}>
        <div
          css={{
            backgroundColor: theme.colors.YELLOW,
            borderRadius: "4px",
            maxHeight: "36px",
            "&:hover": {
              backgroundColor: theme.colors.YELLOW_LIGHT,
            },
          }}
        >
          <Cart />
        </div>
        {quantity > 0 && (
          <div
            css={{
              position: "absolute",
              right: "-1rem",
              fontSize: "1rem",
              top: "-1rem",
            }}
          >
            {quantity}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CartButton;
