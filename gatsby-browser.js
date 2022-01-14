import React from "react" // eslint-disable-line no-unused-vars

import App from "./src/app"

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>
}
