require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteTitle: "Brunmontagne",
    siteUrl: process.env.GATSBY_SITE_URL,
    hrefLang: "nl",
    siteDescription: "Represents you.",
    siteImage: "/placeholder-image.jpg",
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-source-shopify-localized",
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
        translatedLangs: ["en"],
        defaultLanguage: "nl",
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `assets`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /vectors/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`nl`, `en`],
        defaultLanguage: `nl`,
        // if you are using Helmet, you must include siteUrl, and make sure you add http:https
        siteUrl: process.env.GATSBY_SITE_URL,
        // you can pass any i18next options
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          nsSeparator: false,
        },
        // To ignore pages, see: https://github.com/microapps/gatsby-plugin-react-i18next/blob/master/example/gatsby-config.js
        // pages: [
        //   {
        //     matchPath: "/ignored-page",
        //     languages: ["en"],
        //   },
        // ],
      },
    },
  ].filter(Boolean),
};
