/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GraphCMS`,
        fieldName: `gcms`,
        url: `${process.env.GRAPH_CMS_URL}`,
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
  ],
}
