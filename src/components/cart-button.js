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
        "&:hover > svg > path, &:active > svg > path,": {
          fill: theme.colors.YELLOW,
        },
      }}
    >
      <Cart />
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
