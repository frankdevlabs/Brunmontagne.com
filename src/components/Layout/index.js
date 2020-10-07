import React from "react"
import SEO from "../SEO"
import Navigation from "../Navigation"
import Header from "../Header"
import Footer from "../Footer"

const Layout = ({
  seoTitle,
  seoPageTitle,
  seoDescription,
  headerMode,
  children,
}) => {
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
        <main className="main-container">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
