import React, { useContext } from "react"; // eslint-disable-line no-unused-vars
import Button from "./button";
import { StoreContext } from "../context/store-context";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { ADD_TO_CART_EVENT } from "../utils/gtm";
import useCookie from "../utils/use-cookie";
import { getOriginProductList } from "../utils/gtm";

const AddToCart = ({ product, variantId, quantity, available, ...props }) => {
  const { t } = useTranslation();

  const { addVariantToCart, loading } = useContext(StoreContext);
  const [productMetaList] = useCookie("productMetaList", {});
  const [pref] = useCookie("pref", "analytics=1|personalisation=0");
  const originList = getOriginProductList(
    product.productVariant.sku,
    productMetaList
  );

  function addToCart(e) {
    e.preventDefault();
    ADD_TO_CART_EVENT(product, originList, pref.includes("personalisation=1"));
    addVariantToCart(variantId, quantity);
  }

  return (
    <Button
      type="submit"
      onClick={addToCart}
      disabled={!available || loading}
      {...props}
    >
      {available ? t("buttons.add-to-cart") : t("buttons.out-of-stock")}
    </Button>
  );
};

export default AddToCart;
