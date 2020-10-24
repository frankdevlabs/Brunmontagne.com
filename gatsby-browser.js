import "typeface-lato/index.css"
import "typeface-montserrat/index.css"
import "./src/scss/main.scss"
import LogRocket from 'logrocket';

export { wrapPageElement, wrapRootElement } from "./gatsby-ssr"

export const onClientEntry = () => {
  if (process.env.GATSBY_LOGROCKET === "TRUE") {
    LogRocket.init('eqfjjs/brunmontagnecom');
  }
}