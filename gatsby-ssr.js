import React, { createElement } from "react"
import i18next from "i18next"
import merge from "lodash.merge"
import { PageContext } from "./pageContext"
import { ProductProvider } from "./src/components/Product/context"
import { DEFAULT_OPTIONS } from "./constants"
import i18n from "./i18next"
import { I18nextProvider } from "react-i18next"
import { preProcessProductData } from "./src/components/Product/preProcessProductsData"
import SimpleReactLightbox from "simple-react-lightbox"
/**
 * Wrap all pages with a Translation provider and set the language on SSR time
 */
export const wrapRootElement = ({ element }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <SimpleReactLightbox>{element}</SimpleReactLightbox>
    </I18nextProvider>
  )
}

const gtmLoadScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      '${process.env.GATSBY_TAG_CONTAINER_URL}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${process.env.GATSBY_GTM_ID}');`

export const onRenderBody = ({ setPreBodyComponents, setHeadComponents }) => {
  const gtmHeadScript = createElement("script", {
    key: "gtm-head",
    dangerouslySetInnerHTML: {
      __html: gtmLoadScript,
    },
  })
  const gtmBodyScript = (
    <noscript key="gtm-body">
      <iframe
        title="gtm"
        src={`${process.env.GATSBY_TAG_CONTAINER_URL}/ns.html?id=${process.env.GATSBY_GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      >
        {""}
      </iframe>
    </noscript>
  )

  if (process.env.NODE_ENV !== "development") {
    setHeadComponents([gtmHeadScript])
    setPreBodyComponents([gtmBodyScript])
  }
}

/**
 * Wrap all pages with a Translation provider and set the language on SSR time
 */
export const wrapPageElement = ({ element, props }) => {
  const { supportedLanguages, excludedPages, defaultLanguage, siteUrl } =
    DEFAULT_OPTIONS

  // if page should be excluded do nothing
  if (excludedPages.includes(props.location.pathname)) {
    return element
  }
  const contextValue = merge({}, props.pageContext, {
    supportedLanguages,
    defaultLanguage,
    siteUrl,
  })

  // Can't wrap this in a React effect, since it won't work correctly. This changes
  // the context value (which causes React to re-render the page component).
  // Endless re-rendering from this circular dependency is prevented by the fact that Gatsby
  // doesn't call `wrapPageElement` more than once. If we didn't use Gatsby, `react-i18next` has
  // a helpful `useSSR` hook which uses an `isInitialized` boolean check to avoid calling the
  // `i18n.changeLanguage` more than once (i.e. not causing an endless circular dependency). See
  // more here:
  // https://github.com/i18next/react-i18next/blob/master/src/useSSR.js
  // -----
  // We know that this props will exist here because of @3nvi/gatsby-plugin-intl. Again, the
  // fallback has to do with the handling of non-localized pages (i.e. the original ones),
  // which exist only if `deleteOriginalPages` is `false`
  i18next.changeLanguage(props.pageContext.lang || defaultLanguage)
  // *******************

  const ProductStore = ({ props, element }) => {
    const { caseOptions, strapOptions, flatProduct } =
      props.data && props.data.productPage
        ? preProcessProductData(props.data)
        : {
            caseOptions: undefined,
            trapOptions: undefined,
            flatProduct: undefined,
          }

    return (
      <ProductProvider
        product={flatProduct}
        caseOptions={caseOptions}
        strapOptions={strapOptions}
        variant={props.pageContext.variant}
      >
        {element}
      </ProductProvider>
    )
  }

  return (
    <PageContext.Provider value={contextValue}>
      <ProductStore props={props} element={element} />
    </PageContext.Provider>
  )
}
