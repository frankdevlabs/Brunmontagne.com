import React from "react"; // eslint-disable-line no-unused-vars
import SectionTitle from "../../components/section-title";
import ProductListing from "../../components/product-listing";

const _collectionSection = (props) => {
  const { products, lang } = props;
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
        <ProductListing products={products} lang={lang} position="justifyEnd" />
      </div>
    </section>
  );
};

export default _collectionSection;
