/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require("path")
const autoprefixer = require("autoprefixer")

const termsText = {
  nl: `
    Als je de keuze voor de betaalmethode maakt, ga je akkoord met de op jouw bestelling van toepassing zijnde`,
  en: `
    At the moment you choose your payment method, you also agree to our
  `,
}

const termsAnchorText = {
  nl: "algemene voorwaarden",
  en: "terms and conditions",
}

const privacyText = {
  nl: "We gebruiken je gegevens alleen zoals beschreven in ons",
  en: "We only process your personal data as described in our",
}

const privacyAnchorText = {
  nl: "privacy beleid",
  en: "privacy policy",
}

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
    `gatsby-plugin-react-helmet`,
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
          home_page: require("./schemas/home_page.json"),
          inventory: require("./schemas/inventory.json"),
          page: require("./schemas/page.json"),
          product: require("./schemas/product.json"),
          review: require("./schemas/review.json"),
          specification: require("./schemas/specification.json"),
        },
      },
    },
    `gatsby-transformer-sharp`,
    `simple-react-lightbox`,
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
        version: "3.0.19",
        publicApiKey: `${process.env.GATSBY_SNIPCART_API_KEY}`,
        defaultLang: "nl",
        currency: "eur",
        openCartOnAdd: true,
        locales: {
          nl: {},
          en: {},
        },
        innerHTML: `
          <payment section="top">
            <div class="root">
               <span id="payment-nl">
                  ${termsText.nl} 
                  <a class="snipcart-featured-payment-methods__link" href="/terms" target="_blank" style="display: inline;">
                    ${termsAnchorText.nl}</a>. 
                  ${privacyText.nl}
                  <a class="snipcart-featured-payment-methods__link" href="/privacy" target="_blank" style="display: inline;">
                    ${privacyAnchorText.nl}
                  </a>.
               </span>
               <span id="payment-en">
                  ${termsText.en} 
                  <a class="snipcart-featured-payment-methods__link" href="/en/terms" target="_blank" style="display: inline;">
                    ${termsAnchorText.en}</a>. 
                  ${privacyText.en}
                  <a class="snipcart-featured-payment-methods__link" href="/en/privacy" target="_blank" style="display: inline;">
                    ${privacyAnchorText.en}
                  </a>.
               </span>
            </div>
          </payment>
        `,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: `${process.env.GTM_ID}`,

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: "gatsby", ecommerce: {} },

        // Name of the event that is triggered
        // on every Gatsby route change.
        // Defaults to gatsby-route-change
        routeChangeEventName: "route-change",
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": ["Referrer-Policy: no-referrer-when-downgrade"],
        },
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: false, // boolean to turn off the default gatsby js headers
      },
    },
    // `gatsby-plugin-netlify`,
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
        // cache_busting_mode: "none",
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
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [
          `/404`,
          `/404.html`,
          `/en/404`,
          `/en/404.html`,
          `/offline-plugin-app-shell-fallback`,
          `/en/terms`,
          `/terms`,
          `/en/privacy`,
          `/privacy`,
          `/en/returns`,
          `/returns`,
          `**/products/**/variants/*`,
        ],
      },
    },
    `gatsby-plugin-robots-txt`,
  ],
}

if (process.env.NODE_ENV === "production")
  config.plugins.push({
    resolve: `gatsby-plugin-postcss`,
    options: {
      postCssPlugins: [
        autoprefixer,
        require(`postcss-preset-env`)({ stage: 0 }),
      ],
    },
  })

module.exports = config
