/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Brunmontagne`,
    siteUrl: `https://www.brunmontagne.com`,
    description: `Represents you`,
    supportedLanguages: ["nl", "en"],
  },
  plugins: [
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-source-graphql`,
    //   options: {
    //     typeName: `GraphCMS`,
    //     fieldName: `gcms`,
    //     url: `${process.env.GATSBY_CMS_URL}`,
    //   },
    // },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `Brunmontagne-CMS`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
          return true
        },
        schemas: {
          category: require("./schemas/category.json"),
          collection: require("./schemas/collection.json"),
          inventory: require("./schemas/inventory.json"),
          product: require("./schemas/product.json"),
          review: require("./schemas/review.json"),
          specification: require("./schemas/specification.json"),
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
        data: `@import "${__dirname}/src/scss/abstracts/_variables.scss";
        @import "${__dirname}/src/scss/abstracts/_mixins.scss";
        `,
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-snipcart-advanced`,
      options: {
        version: "3.0.15",
        publicApiKey: `${process.env.GATSBY_SNIPCART_API_KEY}`,
        defaultLang: "nl",
        currency: "eur",
        openCartOnAdd: true,
        locales: {
          nl: {
            actions: {
              checkout: "Valider le panier",
            },
          },
        },
      },
    },
  ],
}
