import React from "react"; // eslint-disable-line no-unused-vars
import ProductCard from "./product-card";

// To optimize LCP we mark the first product card as eager so the image gets loaded faster
const ProductListing = ({
  products = [],
  size,
  position,
  lang,
  justifyContent,
  name,
}) => (
  <div
    className={`flexbox col-margin alignBaseline grid${
      position ? " " + position : ""
    }${justifyContent ? " " + justifyContent : ""}`}
  >
    {products.map((p, index) => (
      <ProductCard
        listName={name}
        listIndex={index}
        size={size}
        product={p}
        key={p.id || p.node.id}
        eager={index === 0}
        lang={lang}
      />
    ))}
  </div>
);

export default ProductListing;
