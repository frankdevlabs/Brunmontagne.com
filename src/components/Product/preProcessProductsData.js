export const preProcessProductData = ({ productPage }) => {
  const getOptions = variableProducts => {
    return variableProducts.reduce((options, item, index) => {
      const newOptions = item.product.document.data.inventory_components.reduce(
        (components, currentComponent) => {
          let currentComponentData = currentComponent.component.document.data
          const indexOf = options
            .map(e => {
              return e.name
            })
            .indexOf(currentComponentData.name)

          const linkedVariableProduct = [
            variableProducts[index].product.document.uid,
          ]

          if (indexOf === -1) {
            currentComponentData.linkedVariableProducts = linkedVariableProduct
            return [...components, currentComponentData]
          } else {
            options[indexOf].linkedVariableProducts.push(
              ...linkedVariableProduct
            )
          }

          return components
        },
        []
      )

      return [...options, ...newOptions]
    }, [])
  }

  const options = getOptions(productPage.data.variable_products)
  const strapOptions = options.filter(e => e.inventory_type === "STRAP")
  const caseOptions = options.filter(e => e.inventory_type === "CASE")
  const flatProduct = ({
    id,
    uid,
    lang,
    data: {
      name,
      collection,
      images,
      description,
      seo,
      specifications,
      variable_product,
      variable_products = [],
      price,
      discount_active,
      discount_price,
      sku,
      categories,
      reviews,
    },
  }) => {
    const flat = (arr, key) =>
      arr.reduce((acc, cur) => {
        if (cur[key].document) return [...acc, cur[key].document.data]
        return acc
      }, [])

    const flatVariableProducts = (variableProducts, res = []) => {
      for (let i = 0; i < variableProducts.length; i++) {
        const currentProduct = variableProducts[i]
        res[currentProduct.product.document.uid] = flatProduct(
          currentProduct.product.document
        )
      }
      return res
    }

    const indexStrap = strapOptions.reduce((options, current, index) => {
      if (current.linkedVariableProducts.indexOf(uid) !== -1) {
        return [...options, index]
      }
      return options
    }, [])[0]
    const indexCase = caseOptions.reduce((options, current, index) => {
      if (current.linkedVariableProducts.indexOf(uid) !== -1) {
        return [...options, index]
      }
      return options
    }, [])[0]

    return {
      id,
      uid,
      lang,
      name,
      collection: collection.document ? collection.document.data : undefined,
      images,
      description,
      seo,
      specifications: flat(specifications, "specification"),
      variableProduct: variable_product,
      variableProducts: { ...flatVariableProducts(variable_products) },
      price,
      discountActive: discount_active,
      discountPrice: discount_price,
      options: {
        strap: strapOptions[indexStrap] || "",
        case: caseOptions[indexCase] || "",
      },
      sku,
      categories: flat(categories, "category"),
      reviews: flat(reviews, "review"),
    }
  }

  return { caseOptions, strapOptions, flatProduct: flatProduct(productPage) }
}
