import React from "react"
import BackToTopButton from "../BackToTopButton"
import Footer from "../Footer"
import Header from "../Header"
import Navigation from "../Navigation"
import SEO from "../SEO"
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
        <BackToTopButton />
      </div>
    </>
  )
}

export default Layout
