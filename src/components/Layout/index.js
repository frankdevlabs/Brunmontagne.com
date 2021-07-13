import React from "react"
import BackToTopButton from "../BackToTopButton"
import Footer from "../Footer"
import Header from "../Header"
import Navigation from "../Navigation"
import Seo from "../SEO"
// import Discount from "../Discount"
import useSticky from "../../hooks/useSticky"

const Layout = ({
  seoTitle,
  seoPageTitle,
  seoDescription,
  headerMode,
  children,
  noIndex,
  slides,
}) => {
  const { isSticky, element } = useSticky()
  return (
    <>
      <Seo
        title={seoTitle}
        pageTitle={seoPageTitle}
        description={seoDescription}
        noIndex={noIndex}
      />
      <div className="container">
        {/*<Discount />*/}
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
