/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require("path")
const autoprefixer = require("autoprefixer")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config = {
  /* Your site config here */
  siteMetadata: {
    title: `Brunmontagne`,
    siteUrl: `${process.env.SITE_URL}`,
    description: `Represents you`,
    supportedLanguages: ["nl", "en"],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: path.join(__dirname, `src`, `assets`, `img`),
      },
    },
    `gatsby-background-image-es5`,
    `gatsby-plugin-sharp`,
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
          about_page: require("./schemas/about_page.json"),
          category: require("./schemas/category.json"),
          collection: require("./schemas/collection.json"),
          inventory: require("./schemas/inventory.json"),
          page: require("./schemas/page.json"),
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
        data: `@import "${__dirname}/src/scss/abstracts/_variables.scss";
        @import "${__dirname}/src/scss/abstracts/_mixins.scss";
        `,
        precision: 8,
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        access_token: `${process.env.INSTA_ACCESS_TOKEN}`,
        instagram_id: `${process.env.INSTA_BUSINESS_ACC_ID}`,
        hashtags: {
          enabled: true,
          commentDepth: 10,
        },
      },
    },
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
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Brunmontagne`,
        short_name: `Brunmontagne`,
        description: `E-commmerce app van Brunmontagne.`,
        lang: `nl`,
        display: `standalone`,
        icon: `src/assets/icon/icon.png`,
        start_url: `/`,
        background_color: `#f1f1f1`,
        theme_color: `#130f40`,
        legacy: true,
        cache_busting_mode: "none",
        localize: [
          {
            start_url: `/en/`,
            lang: `en`,
            name: `Brunmontagne`,
            short_name: `Brunmontagne`,
            description: `E-commmerce app of Brunmontagne.`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
  ],
}

if (process.env.NODE_ENV === "production")
  config.plugins.push({
    resolve: `gatsby-plugin-postcss`,
    options: {
      postCssPlugins: [autoprefixer],
    },
  })

module.exports = config
