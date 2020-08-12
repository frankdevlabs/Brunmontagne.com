const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createResolvers = ({
  actions: { createNode },
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const resolvers = {
    GraphCMS_Asset: {
      node: {
        type: `File`,
        resolve: ({ url }, args, context, info) => {
          return createRemoteFileNode({
            url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  }

  createResolvers(resolvers)
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      gcms: { products },
    },
  } = await graphql(`
    {
      gcms {
        products {
          id
          slug
        }
      }
    }
  `)

  products.forEach(({ id, slug }) =>
    createPage({
      path: `/products/${slug}`,
      component: require.resolve(`./src/templates/ProductPage.js`),
      context: {
        id,
      },
    })
  )
}
