import React from "react"; // eslint-disable-line no-unused-vars
import ProductDescription from "../../../components/product-description";
import mq from "../../../theme/media-queries";
import ProductPrice from "../../../components/product-price";
import ProductDeliveryTerms from "../../../components/product-delivery-terms";
import { useTranslation } from "gatsby-plugin-react-i18next";

const MobileOnlyDescriptionSection = ({ description }) => {
  const { t } = useTranslation();
  return (
    <section
      css={{
        display: "none",
        visibility: "hidden",
        [mq("lg")]: {
          display: "block",
          visibility: "visible",
          flex: "0 1 50%",
        },
        [mq("md")]: {
          flex: "0 1 100%",
        },
      }}
    >
      <div>
        <h2>{t("titles.description-section")}</h2>
        <ProductDescription description={description} />
      </div>
      <div css={{ marginTop: "3.2rem" }}>
        <ProductDeliveryTerms />
      </div>
    </section>
  );
};

export default MobileOnlyDescriptionSection;
