import React from "react"
import Layout from "../components/Layout"
import "./collection.scss"

const CollectionPage = () => {
  return (
    <Layout>
      <section id="watches" className="section-watches">
        <div className="section-watches__container">watches section</div>
      </section>
      <section className="section-collection-media">
        {" "}
        <div className="section-collection-media__container">media</div>
      </section>
      <section id="watch-straps" className="section-watch-straps">
        {" "}
        <div className="section-watch-straps__container">watch straps</div>
      </section>
    </Layout>
  )
}

export default CollectionPage
