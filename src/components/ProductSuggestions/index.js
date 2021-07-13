import React from "react"
import ProductCards from "../ProductCards"
import NlQueries from "./nl-queries"
import ENQueries from "./en-queries"

const ProductSuggestions = props => {
  const data = props.lang === "nl" ? NlQueries() : ENQueries()

  return (
    <section className="section-product-strap-suggestions">
      <div className="section-product-strap-suggestions__straps">
        <h3 className="heading-3">{props.strapSuggestionsTitle}</h3>
        <ProductCards
          cards={data.watchStraps.edges}
          list={`${props.listName} - strap suggestions`}
        />
      </div>
      <div className="section-product-strap-suggestions__watches">
        <h3 className="heading-3">{props.watchSuggestionsTitle}</h3>
        <ProductCards
          cards={data.watches.edges}
          list={`${props.listName} - watch suggestions`}
        />
      </div>
    </section>
  )
}

export default ProductSuggestions
