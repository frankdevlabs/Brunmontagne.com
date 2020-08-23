const { createRemoteFileNode } = require("gatsby-source-filesystem")
const DEFAULT_OPTIONS = require("./constants").DEFAULT_OPTIONS

exports.createResolvers = ({
  actions: { createNode },
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const resolvers = {
    GraphCMS_Asset: {
      node: {
        type: `File`,
        resolve: ({ url }, args, context, info) => {
          return createRemoteFileNode({
            url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  }

  createResolvers(resolvers)
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: { gcms: locales },
  } = await graphql(`
    {
      gcms {
        nl: products(locales: nl) {
          id
          locale
          slug
        }
        en: products(locales: en) {
          id
          locale
          slug
        }
      }
    }
  `)

  const products = [...locales.nl, ...locales.en]

  products.forEach(({ id, slug, locale }) => {
    const baseURI = locale === "en" ? "/en" : ""
    createPage({
      path: `${baseURI}/products/${slug}`,
      component: require.resolve(`./src/templates/ProductPage.js`),
      context: {
        id,
        locale,
      },
    })
  })
}

/**
 * Makes sure to create localized paths for each file in the /pages folder.
 * For example, pages/404.js will be converted to /en/404.js and /el/404.js and
 * it will be accessible from https:// .../en/404/ and https:// .../el/404/
 */
exports.onCreatePage = async ({
  page,
  actions: { createPage, deletePage, createRedirect },
}) => {
  const {
    supportedLanguages,
    defaultLanguage,
    notFoundPage,
    excludedPages,
    deleteOriginalPages,
  } = DEFAULT_OPTIONS
  const originalPath = page.path
  const isEnvDevelopment = process.env.NODE_ENV === "development"
  const is404 = originalPath.includes(notFoundPage)

  // return early if page is excluded
  if (excludedPages.includes(originalPath)) {
    return
  }

  // Delete the original page (since we are gonna create localized versions of it) and add a
  // redirect header
  await deletePage(page)

  // If the user didn't want to delete the original pages, we re-create them with the proper context
  // (currently the only way to add new context to a page is to delete and re-create it
  // https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#pass-context-to-pages
  if (!deleteOriginalPages) {
    await createPage({
      ...page,
      context: {
        ...page.context,
        originalPath,
        lang: defaultLanguage,
      },
    })
  }

  await Promise.all(
    supportedLanguages.map(async lang => {
      const localizedPath =
        lang === defaultLanguage ? page.path : `${lang}${page.path}`

      // create a redirect based on the accept-language header
      createRedirect({
        fromPath: originalPath,
        toPath: localizedPath,
        Language: lang,
        isPermanent: false,
        redirectInBrowser: isEnvDevelopment,
        statusCode: is404 ? 404 : 301,
      })

      await createPage({
        ...page,
        path: localizedPath,
        context: {
          ...page.context,
          originalPath,
          lang,
        },
      })
    })
  )

  // Create a fallback redirect if the language is not supported or the
  // Accept-Language header is missing for some reason
  createRedirect({
    fromPath: originalPath,
    toPath: `${page.path}`,
    isPermanent: false,
    redirectInBrowser: isEnvDevelopment,
    statusCode: 301,
  })
}

exports.onPreBuild = async ({ actions: { createRedirect } }) => {
  const isEnvDevelopment = process.env.NODE_ENV === "development"
  const { notFoundPage } = DEFAULT_OPTIONS

  // we add a generic redirect to the "not found path" for every path that's not present in the app.
  // This rule needs to be the last one (so that it only kicks in if nothing else matched before),
  // thus it's added after all the page-related hooks have finished (hence "onPreBuild")

  if (notFoundPage) {
    await createRedirect({
      fromPath: "/*",
      toPath: notFoundPage,
      isPermanent: false,
      redirectInBrowser: isEnvDevelopment,
      statusCode: 302,
    })
  }
}
