exports.DEFAULT_OPTIONS = {
  // the locales that your gatsby app supports
  supportedLanguages: ["en", "nl"],

  // the default language for your gatsby app
  defaultLanguage: "nl",

  locales: {
    en: "en-gb",
    nl: "nl-nl",
  },

  // the (optional) path in which your web app redirects in case of a 404
  notFoundPage: "/404/",

  // a list of paths, whose pages should not be processed by this plugin (i.e. delegate to whatever
  // gatsby would do by default)
  excludedPages: [`/dev-404-page/`, `/offline-plugin-app-shell-fallback/`],

  // Whether to delete the original pages at the original URLs or keep them
  deleteOriginalPages: true,

  legacyRedirects: [
    {
      fromPath: "/product-categorie/horloges/",
      toPath: "/collection#watches/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product-category/watches/",
      toPath: "/en/collection#watches/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/shop/",
      toPath: "/collection/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/representor-staal-zwart/",
      toPath: "/products/representor-steel-black/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product-categorie/horlogebanden/",
      toPath: "/collection#watch-straps/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/representor-zwart-rood/",
      toPath: "/products/representor-black-red/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/over-ons/",
      toPath: "/about-us/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/representor-rose-goud-blauw/",
      toPath: "/products/representor-gold-blue/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/representor-staal-groen/",
      toPath: "/products/representor-steel-green/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/representor-staal-blauw/",
      toPath: "/products/representor-steel-blue/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/representor-staal-blauw/",
      toPath: "/products/representor-steel-blue/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/shop/",
      toPath: "/en/collection/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/representor-zwart-zwart/",
      toPath: "/products/representor-black-black/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/representor-rose-goud-groen/",
      toPath: "/products/representor-gold-green/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product/representor-steel-blue/",
      toPath: "/en/products/representor-steel-blue/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product/representor-steel-black/",
      toPath: "/en/products/representor-steel-black/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product/representor-rose-gold-blue/",
      toPath: "/en/products/representor-gold-blue/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product/representor-steel-green/",
      toPath: "/en/products/representor-steel-green/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product/representor-black-black/",
      toPath: "/en/products/representor-black-black/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product-category/watch-straps/",
      toPath: "/en/collection#watch-straps/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product/representor-black-red/",
      toPath: "/en/products/representor-black-red/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/stalen-band-voor-representor-zwart/",
      toPath: "/products/watch-strap-black-steel/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/stalen-band-voor-representor-rose-goud/",
      toPath: "/products/watch-strap-rosegold-steel/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product/representor-rose-gold-green/",
      toPath: "/en/products/representor-gold-green/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/rubberen-band-voor-representor/",
      toPath: "/products/watch-strap-black-rubber/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/stalen-band-voor-representor/",
      toPath: "/products/watch-strap-silver-steel/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/winkelmand/",
      toPath: "/404/",
      isPermanent: false,
      statusCode: 410,
    },
    {
      fromPath: "/en/product/steel-strap-for-representor-black/",
      toPath: "/en/products/watch-strap-black-steel/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/garantie/",
      toPath: "/returns/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/cart/",
      toPath: "/404/",
      isPermanent: false,
      statusCode: 410,
    },
    {
      fromPath: "/en/product/steel-band-for-representor-rose-gold/",
      toPath: "/en/products/watch-strap-rosegold-steel/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/product/steel-strap-for-representative/",
      toPath: "/en/products/watch-strap-silver-steel/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/product/brunmontagne-representor-groen-staal/",
      toPath: "/products/representor-steel-green/",
      isPermanent: false,
      statusCode: 301,
    },
    {
      fromPath: "/en/conditions/",
      toPath: "/en/terms//",
      isPermanent: false,
      statusCode: 301,
    },
  ],
}
