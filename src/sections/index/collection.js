import React from "react" // eslint-disable-line no-unused-vars
import SectionTitle from "../../components/section-title"
import ProductListing from "../../components/product-listing"

const Collection = props => {
  const { products } = props
  return (
    <section>
      <div className="container">
        <div
          css={{
            maxWidth: "69.7rem",
            margin: "8.9rem 0 16rem auto",
          }}
        >
          <SectionTitle>
            Bekijk onze <strong>stijlvolle</strong> collectie
          </SectionTitle>
        </div>
        <ProductListing products={products} />
      </div>
    </section>
  )
}

export default Collection
