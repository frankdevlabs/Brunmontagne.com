const indexName = `Pages`;
const pageQuery = `{
  allShopifyProduct {
		edges {
			node {
				objectID: id
        slug: handle
        title
        description
        productType
      }
    }
  }
}`;

function pageToAlgoliaRecord({ node }) {
  return {
    ...node,
  };
}
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) =>
      data.allShopifyProduct.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`description:20`] },
  },
];
module.exports = queries;
