/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GraphCMS`,
        fieldName: `gcms`,
        url: `https://api-eu-central-1.graphcms.com/v2/ckdq3fyugeueh01xncuk8d32l/master`,
      },
    },
    `gatsby-transformer-sharp`,
  ],
}
