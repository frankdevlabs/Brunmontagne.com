import React from "react"; // eslint-disable-line no-unused-vars
import { graphql } from "gatsby";
import ProductListing from "../../../components/product-listing";
// import slugify from "@sindresorhus/slugify"

export default function ProductTypeIndex(props) {
  console.log(props);
  const {
    data: { products },
    pageContext: { productType },
  } = props;
  return (
    <div>
      <h1>{productType}</h1>
      <ProductListing products={products.nodes} />
    </div>
  );
}

export const query = graphql`
  query ($productType: String!) {
    products: allShopifyProduct(
      filter: { productType: { eq: $productType } }
      sort: { fields: publishedAt, order: ASC }
      limit: 24
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
