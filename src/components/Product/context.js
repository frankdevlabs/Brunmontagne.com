import React from "react"

const defaultState = {
  product: {},
  activeVariableProduct: "",
  variableProductsUIDs: [],
  setActiveVariableProduct: () => {},
  options: [],
}

const ProductContext = React.createContext(defaultState)

class ProductProvider extends React.Component {
  constructor(props) {
    super(props)
    if (props.product) {
      const { product, strapOptions, caseOptions } = this.props
      const uids = Object.keys(product.variableProducts)
      this.state = {
        product,
        variableProductsUIDs: uids,
        activeVariableProduct: uids && props.variant ? props.variant : uids[0],
        setActiveVariableProduct: this.setActiveVariableProduct,
        options: { straps: strapOptions, cases: caseOptions },
      }
    } else {
      this.state = defaultState
    }
  }

  setActiveVariableProduct = uid => {
    this.setState({
      activeVariableProduct: uid,
    })
  }

  render() {
    return (
      <ProductContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

export default ProductContext

export { ProductProvider }
