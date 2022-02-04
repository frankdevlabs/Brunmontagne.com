import React, { useContext } from "react"; // eslint-disable-line no-unused-vars
import Button from "./button";
import { StoreContext } from "../context/store-context";
import { useTranslation } from "gatsby-plugin-react-i18next";

const AddToCart = ({ variantId, quantity, available, ...props }) => {
  const { t } = useTranslation();

  const { addVariantToCart, loading } = useContext(StoreContext);

  function addToCart(e) {
    e.preventDefault();
    addVariantToCart(variantId, quantity);
  }

  return (
    <Button
      type="submit"
      css={{}}
      onClick={addToCart}
      disabled={!available || loading}
      {...props}
    >
      {available ? t("buttons.add-to-cart") : t("buttons.out-of-stock")}
    </Button>
  );
};

export default AddToCart;
