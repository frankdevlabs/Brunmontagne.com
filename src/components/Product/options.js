import React from "react"
import Select from "./select"
import ProductContext from "./context"
import "./options.scss"
import { useTranslation } from "react-i18next"

const Options = () => {
  const { t } = useTranslation("translation")

  const {
    options: { straps, cases },
    variableProductsUIDs,
    activeVariableProduct,
    product: { variableProducts },
    setActiveVariableProduct,
  } = React.useContext(ProductContext)

  const activeProduct = variableProducts[activeVariableProduct]
  const activeStrapOption = activeProduct.options.strap
  const activeCaseOption = activeProduct.options.case

  const StrapOptions = () => {
    return (
      <div className="options__item">
        <h5 className="heading-5">{t("product.watchStrap")}: </h5>
        <Select activeOption={activeStrapOption.public_name}>
          {straps.map(option => {
            const active = activeStrapOption.name === option.name
            let uid

            if (!active)
              uid = variableProductsUIDs.filter(e => {
                return (
                  e !== activeVariableProduct &&
                  variableProducts[e].options.case.name ===
                    activeCaseOption.name
                )
              })[0]

            return (
              <li key={option.name} className={`${!active ? "" : "disabled"}`}>
                <button
                  className="options__btn"
                  onClick={() => setActiveVariableProduct(uid)}
                  disabled={active}
                >
                  {option.public_name}
                </button>
              </li>
            )
          })}
        </Select>
      </div>
    )
  }

  const CaseOptions = () => {
    return (
      <div className="options__item">
        <h5 className="heading-5">{t("product.movement")}: </h5>
        <ul className="options__list">
          {cases.map(option => {
            const active = activeCaseOption.name === option.name
            let uid

            if (!active)
              uid = variableProductsUIDs.filter(e => {
                return (
                  e !== activeVariableProduct &&
                  variableProducts[e].options.strap.name ===
                    activeStrapOption.name
                )
              })[0]

            return (
              <li
                key={option.name}
                className={`options__item-uurwerk ${
                  active ? " options__item-uurwerk--active" : ""
                }`}
              >
                <button
                  className="options__btn"
                  onClick={() => setActiveVariableProduct(uid)}
                  disabled={active}
                >
                  {option.public_name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="options">
      <h3 className="heading-3">{t("product.options")}</h3>
      <CaseOptions />
      <StrapOptions />
    </div>
  )
}

export default Options
