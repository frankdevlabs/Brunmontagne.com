import React from "react"; // eslint-disable-line no-unused-vars
import { useTheme } from "@emotion/react";

const ProductPrice = ({ price }) => {
  const theme = useTheme();
  return (
    <span
      css={{
        fontWeight: "bold",
        fontSize: "1.9rem",
        lineHeight: "23px",
        letterSpacing: "0.01em",
        color: theme.colors.GREEN,
      }}
    >
      {price}
    </span>
  );
};

export default ProductPrice;
