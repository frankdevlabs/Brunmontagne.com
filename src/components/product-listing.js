import React from "react" // eslint-disable-line no-unused-vars
import ProductCard from "./product-card"

// To optimize LCP we mark the first product card as eager so the image gets loaded faster
const ProductListing = ({ products = [] }) => (
  <div>
    {products.map((p, index) => (
      <ProductCard product={p} key={p.id} eager={index === 0} />
    ))}
  </div>
)

export default ProductListing