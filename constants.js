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
  excludedPages: [
    `/dev-404-page/`,
    `/404/`,
    `/404.html`,
    `/offline-plugin-app-shell-fallback/`,
  ],

  // Whether to delete the original pages at the original URLs or keep them
  deleteOriginalPages: true,
}
