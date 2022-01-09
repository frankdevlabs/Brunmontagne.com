import React from "react" // eslint-disable-line no-unused-vars
// import { SkipNavContent, SkipNavLink } from "./skip-nav"
// import { Header } from "./header"
// import { Footer } from "./footer"
import Seo from "./seo"

function Layout(props) {
  const { children } = props
  return (
    <div>
      <Seo {...props} />
      {/*<SkipNavLink />*/}
      {/*<Header />*/}
      {children}
      {/*<SkipNavContent>{children}</SkipNavContent>*/}
      {/*<Footer />*/}
    </div>
  )
}

export default Layout
