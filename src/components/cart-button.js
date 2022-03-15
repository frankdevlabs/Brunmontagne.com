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
      to="/cart"
      customStyle={{
        position: "relative",
        "&:hover > div, &:active > div": {
          backgroundColor: theme.colors.YELLOW_LIGHT,
        },
      }}
    >
      <div
        css={{
          backgroundColor: theme.colors.YELLOW,
          borderRadius: "4px",
          maxHeight: "36px",
        }}
      >
        <Cart />
      </div>
      {quantity > 0 && (
        <div
          css={{
            position: "absolute",
            top: "-3rem",
            right: "0rem",
            fontSize: "1rem",
            [mq("xl")]: {
              top: "-2rem",
            },
          }}
        >
          {quantity}
        </div>
      )}
    </Link>
  );
};

export default CartButton;
