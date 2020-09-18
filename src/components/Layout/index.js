import React from "react"
import SEO from "../SEO"
import Navigation from "../Navigation"
import Header from "../Header"

const Layout = props => {
  const { seoTitle, seoDescription, headerMode } = props

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} />
      <div className="container">
        <Navigation />
        <Header mode={headerMode} />
        <main className="main-container">{props.children}</main>
      </div>
    </>
  )
}

export default Layout