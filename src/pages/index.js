import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useTranslation } from "react-i18next"

import Layout from "../components/Layout"
import ProductCards from "../components/ProductCards"
import StyledLink from "../components/Link"

import "./home.scss"

const pageQuery = graphql`
  {
    gcms {
      products {
        name
        slug
      }
    }
  }
`

const IndexPage = () => {
  const { t } = useTranslation()
  const {
    gcms: { products },
  } = useStaticQuery(pageQuery)
  return (
    <Layout seoTitle={t("home.title")}>
      {/*<p>{t("home.greeting")}</p>*/}
      {/*{products.map(({ slug, ...product }) => (*/}
      {/*  <StyledLink*/}
      {/*    className="link link-primary"*/}
      {/*    key={slug}*/}
      {/*    to={`/products/${slug}`}*/}
      {/*  >*/}
      {/*    {product.name}*/}
      {/*  </StyledLink>*/}
      {/*))}*/}
      <section className="section-collection">
        <div className="section-collection__container ">
          <h2 className="heading-2">{t("home.collection-section-title")}</h2>
          <p className="long-paragraph">
            {t("home.collection-section-description")}
          </p>
          <ProductCards />
          <div className="section-collection__btn">
            <a href="/shop/" className="btn btn--secondary btn">
              {t("home.collection-section-collection-btn")}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
