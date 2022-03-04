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
        icon: `src/assets/images/icon.png`,
        start_url: `/`,
        background_color: `#f1f1f1`,
        theme_color: `#000`,
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
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [
          `/404/`,
          `/404.html`,
          `/en/404/`,
          `/en/404.html`,
          `/offline-plugin-app-shell-fallback/`,
          `/en/term/s`,
          `/terms/`,
          `/en/privacy/`,
          `/privacy/`,
          `/en/returns/`,
          `/returns/`,
        ],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  pageContext
                  path
                }
              }
            }
          }
        `,
        resolvePages: ({ allSitePage }) => {
          const pages = allSitePage.edges.map(({ node }) => {
            const { pageContext } = node;
            const { languages, originalPath, defaultLanguage } =
              pageContext.i18n;
            const path =
              originalPath.substr(-1) === "/"
                ? originalPath
                : originalPath + "/";
            const links = [
              { lang: defaultLanguage, url: path },
              { lang: "x-default", url: path },
            ];
            languages.forEach((lang) => {
              if (lang === defaultLanguage) return;
              links.push({ lang, url: `/${lang}${path}` });
            });
            return {
              path: path,
              changefreq: "daily",
              priority: path === "/" ? 1.0 : 0.7,
              links,
            };
          });
          return pages;
        },
        filterPages: (page, excludedRoute) => {
          return page.path === excludedRoute;
        },
        serialize: ({ path, changefreq, priority, links }) => {
          return {
            url: path,
            changefreq,
            priority,
            links,
          };
        },
      },
    },
    {
      resolve: "gatsby-source-google-spreadsheets",
      options: {
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        credentials: {
          type: "service_account",
          project_id: process.env.GOOGLE_PROJECT_ID,
          private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(
            /(\\r)|(\\n)/g,
            "\n"
          ),
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          client_id: process.env.GOOGLE_CLIENT_ID,
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_PROJECT_ID}.iam.gserviceaccount.com`,
        },
      },
    },
    {
      resolve: "gatsby-source-google-docs",
      options: {
        folder: "1-hK3bFdcBPOmGR4yyFiWwhAT0AMTb5Ac",
        createPages: true,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-netlify`,
  ].filter(Boolean),
};
