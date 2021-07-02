/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require("path")
const autoprefixer = require("autoprefixer")
const postcssPresetEnv = require(`postcss-preset-env`)

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
  flags: { PRESERVE_WEBPACK_CACHE: true },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: path.join(__dirname, `src`, `assets`, `img`),
      },
    },
    `gatsby-plugin-image`,
    `gatsby-background-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `Brunmontagne-CMS`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: post => `/${post.uid}`,
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
        implementation: require("node-sass"),
        additionalData: `
                  @import "${__dirname}/src/scss/abstracts/_variables.scss";
                  @import "${__dirname}/src/scss/abstracts/_mixins.scss";`,
        postCssPlugins: [autoprefixer, postcssPresetEnv({ stage: 0 })],
        sassOptions: {
          precision: 8,
          includePaths: [`${__dirname}src/scss/abstracts/`],
        },
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
        version: `${process.env.GATSBY_SNIPCART_VERSION}`,
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
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: [
          { domain: "https://app.snipcart.com", crossOrigin: "anonymous" },
          { domain: "https://www.google.nl", crossOrigin: "anonymous" },
          {
            domain: "https://www.google-analytics.com",
            crossOrigin: "anonymous",
          },
          {
            domain: "https://stats.g.doubleclick.net",
            crossOrigin: "anonymous",
          },
          {
            domain: "https://consent-brunmontagne.netlify.app",
            crossOrigin: "anonymous",
          },
          {
            domain: "https://tags-brunmontagne.netlify.app",
            crossOrigin: "anonymous",
          },
          {
            domain: "https://rec.smartlook.com",
            crossOrigin: "anonymous",
          },
          { domain: "https://fonts.googleapis.com", crossOrigin: "anonymous" },
          { domain: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
          {
            domain: `${process.env.GATSBY_TAG_CONTAINER_URL}`,
            crossOrigin: "anonymous",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": ["Referrer-Policy: no-referrer-when-downgrade"],
          "/public/**/*.html": [
            "cache-control: public",
            "cache-control: max-age=0",
            "cache-control: must-revalidate",
          ],
          "/sw.js": [
            "cache-control: public",
            "cache-control: max-age=0",
            "cache-control: must-revalidate",
          ],
          "/public/page-data/*": [
            "cache-control: public",
            "cache-control: max-age=0",
            "cache-control: must-revalidate",
          ],
        },
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: false, // boolean to turn off the default gatsby js headers
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Brunmontagne`,
        short_name: `Brunmontagne`,
        description: `E-commmerce app van Brunmontagne.`,
        lang: `nl`,
        display: `standalone`,
        icon: `src/assets/icon/icon.png`,
        start_url: `/nl/`,
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
        excludes: [
          `/404`,
          `/nl/404`,
          `/404.html`,
          `/nl/404.html`,
          `/en/404`,
          `/en/404.html`,
          `/offline-plugin-app-shell-fallback`,
          `/en/terms`,
          `/nl/terms`,
          `/en/privacy`,
          `/nl/privacy`,
          `/en/returns`,
          `/nl/returns`,
          `**/products/**/variants/*`,
        ],
      },
    },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-remove-serviceworker`,
  ],
}

module.exports = config
