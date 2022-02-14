import React from "react"; // eslint-disable-line no-unused-vars
import FastDeliverTruck from "../assets/vectors/fast-delivery-truck.svg";
import { useTranslation } from "gatsby-plugin-react-i18next";

const ProductDeliveryTerms = ({ position = "default" }) => {
  const { t } = useTranslation();
  return (
    <div
      css={{
        display: "flex",
        fontSize: "1.2rem",
        lineHeight: "171%",
        ...(position !== "default" ? { justifyContent: position } : {}),
        "& > svg": {
          height: "3.6rem",
          width: "3.6rem",
        },
      }}
    >
      <div css={{ marginRight: "2.7rem" }}>
        <FastDeliverTruck />
      </div>
      <p css={{ display: "block" }}>{t("return-policy")}</p>
    </div>
  );
};

export default ProductDeliveryTerms;
