const { createRemoteFileNode } = require("gatsby-source-filesystem")
const DEFAULT_OPTIONS = require("./constants").DEFAULT_OPTIONS

exports.createResolvers = async ({
  actions: { createNode },
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const imageFields = {
    node: {
      type: `File`,
      resolve: ({ image: { url } }, args, context, info) => {
        if (url !== "")
          return createRemoteFileNode({
            url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })

        return
      },
    },
  }

  const resolvers = {
    PrismicAboutPageParagraphsGroupType: {
      paragraphType: {
        type: `String`,
        resolve: (source, args, context, info) => {
          return source.content.raw[0].type
        },
      },
      alt: {
        type: `String`,
        resolve: (source, args, context, info) => {
          return source.content.raw[0].alt
        },
      },
      image: {
        type: `File`,
        resolve: (source, args, context, info) => {
          const url =
            source.content.raw[0].type === "image"
              ? source.content.raw[0].url
              : ""
          if (url !== "")
            return createRemoteFileNode({
              url,
              store,
              cache,
              createNode,
              createNodeId,
              reporter,
            })

          return
        },
      },
    },
    PrismicProductImagesGroupType: {
      ...imageFields,
    },
    PrismicInventoryImagesGroupType: {
      ...imageFields,
    },
  }

  await createResolvers(resolvers)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const productPages = await graphql(`
    {
      allPrismicProduct(filter: { data: { variable_product: { eq: false } } }) {
        edges {
          node {
            id
            uid
            lang
            data {
              variable_product
              variable_products {
                product {
                  document {
                    ... on PrismicProduct {
                      id
                      uid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const productPageTemplate = require.resolve(`./src/templates/productPage.js`)
  productPages.data.allPrismicProduct.edges.forEach(
    ({ node: { id, uid, lang, data } }) => {
      const sanitzedLang = lang === "en-gb" ? "en" : "nl"
      const baseURI = lang === "en-gb" ? `/en` : ""
      const basePath = `/products/${uid}`

      createPage({
        path: `${baseURI}${basePath}`,
        component: productPageTemplate,
        context: {
          id: id,
          uid: uid,
          variant: undefined,
          locale: lang,
          originalPath: `${basePath}`,
          lang: sanitzedLang,
        },
      })

      data.variable_products.forEach(({ product: { document } }) => {
        if (document)
          createPage({
            path: `${baseURI}${basePath}/variants/${document.uid}`,
            component: productPageTemplate,
            context: {
              id: id,
              uid: uid,
              variant: document.uid,
              locale: lang,
              originalPath: `${basePath}/variants/${document.uid}`,
              lang: sanitzedLang,
            },
          })
      })
    }
  )

  const page = await graphql(`
    {
      allPrismicPage {
        edges {
          node {
            id
            uid
            lang
          }
        }
      }
    }
  `)

  const pageTemplate = require.resolve(`./src/templates/page.js`)
  page.data.allPrismicPage.edges.forEach(({ node: { id, uid, lang } }) => {
    const sanitzedLang = lang === "en-gb" ? "en" : "nl"
    const baseURI = lang === "en-gb" ? `/en` : ""
    const basePath = `/${uid}`

    createPage({
      path: `${baseURI}${basePath}`,
      component: pageTemplate,
      context: {
        id: id,
        uid: uid,
        locale: lang,
        originalPath: `${basePath}`,
        lang: sanitzedLang,
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
    locales,
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
        locale: locales[defaultLanguage],
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
          locale: locales[lang],
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
