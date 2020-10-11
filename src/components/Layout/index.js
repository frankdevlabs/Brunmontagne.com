import React from "react"
import SEO from "../SEO"
import Navigation from "../Navigation"
import Header from "../Header"
import Footer from "../Footer"
import useSticky from "../../hooks/useSticky"

const Layout = ({
  seoTitle,
  seoPageTitle,
  seoDescription,
  headerMode,
  children,
}) => {
  const { isSticky, element } = useSticky()
  return (
    <>
      <SEO
        title={seoTitle}
        pageTitle={seoPageTitle}
        description={seoDescription}
      />
      <div className="container">
        <Navigation sticky={isSticky} />
        <Header mode={headerMode} />
        <main
          ref={element}
          className={`main-container ${
            isSticky ? " main-container__sticky-nav" : ""
          }`}
        >
          {children}
        </main>
        <Footer stickyNav={isSticky} />
      </div>
    </>
  )
}

export default Layout
