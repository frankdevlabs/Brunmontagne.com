import React from "react"
import SEO from "../SEO"
import Navigation from "../Navigation"
import Header from "../Header"
import Footer from "../Footer"

const Layout = props => {
  const { seoTitle, seoPageTitle, seoDescription, headerMode } = props

  return (
    <>
      <SEO
        title={seoTitle}
        pageTitle={seoPageTitle}
        description={seoDescription}
      />
      <div className="container">
        <Navigation />
        <Header mode={headerMode} />
        <main className="main-container">{props.children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
