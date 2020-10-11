import React from "react"
import { useTranslation } from "react-i18next"
import Layout from "../components/Layout"
import ProductCards from "../components/ProductCards"
import Img from "gatsby-image"
import ExtLink from "../components/ExternalLink"
import "./home.scss"
import { graphql } from "gatsby"
import Blockquote from "../components/Blockquote"
import Lookbook from "../components/Lookbook"

const IndexPage = ({ data }) => {
  const { t } = useTranslation()
  const Cards = data.landingPage.edges.reduce(
    (acc, cur) => [
      ...acc,
      { id: cur.node.id, uid: cur.node.uid, ...cur.node.data },
    ],
    []
  )
  return (
    <Layout
      seoPageTitle={t("home.pageTitle")}
      seoDescription={t("home.description")}
      headerMode="home"
    >
      <section className="section-collection">
        <div className="section-collection__container ">
          <h2 className="heading-2">{t("home.section-collection-title")}</h2>
          <ProductCards cards={Cards} />
          <div className="section-collection__btn">
            <a href="/shop/" className="btn btn--secondary btn">
              {t("home.section-collection-btn")}
            </a>
          </div>
        </div>
      </section>
      <section className="section-story">
        <div className="section-story__container">
          <div className="section-story__columns columns">
            <div className="section-story__text column">
              <Blockquote>
                Opvallen, zonder hierin te overdrijven en geschikt voor iedere
                gelegenheid. <br /> <br /> Dat is de filosofie achter de
                horloges van Brunmontagne. Uniek, stijlvol en tijdloos.
                <span>Pascal Bruinenberg, oprichter Brunmontagne</span>
              </Blockquote>
            </div>
            <div className="section-story__video column">
              <div className="section-story__video-container">
                <iframe
                  title="Passie"
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/BOKKEjAn0Xc"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <div className="section-story__btn">
            <a href="/shop/" className="btn btn--secondary btn">
              {t("home.section-story-btn")}
            </a>
          </div>
        </div>
      </section>
      <section className="section-media">
        <div className="section-media__container">
          <div className="section-media__columns columns is-desktop">
            <div className="section-media__stores column">
              <h3 className="heading-3">Brunmontagne in de winkel</h3>
              <div className="section-media__image-wrapper">
                <Img
                  fluid={data.popmaImage.childImageSharp.fluid}
                  alt={data.popmaImage.name}
                />
              </div>
              <div className="section-media__stores-text">
                <p className="long-paragraph">
                  <strong>Exclusief</strong> bij Popma & Popma Juweliers in
                  Heerenveen, gevestigd aan de Dracht 37.{" "}
                  <ExtLink
                    to="https://goo.gl/maps/Kw55SPLgdsSRNN588"
                    mode="primary"
                  >
                    Hoe kom ik daar?
                  </ExtLink>
                </p>
              </div>
            </div>
            <div className="section-media__horlogeforum column">
              <h3 className="heading-3">Geliefd door horlogefanaten</h3>
              <div className="section-media__horlogeforum-text">
                <p className="long-paragraph">
                  Bekijk de opinie van echte liefhebbers op{" "}
                  <ExtLink
                    to="https://www.horlogeforum.nl/t/show-je-brunmontagne/224660"
                    mode="primary"
                  >
                    Horlogeforum.nl
                  </ExtLink>
                  . In het "Show je Brunmontagne" topic delen echte fans hun
                  ongezouten (veelal positieve!) mening.
                </p>
                <Blockquote size="base">
                  Het is idd een veelzijdig horloge, sportief, casual, zakelijk,
                  alles kan met de verschillende kleuren en banden.
                  <span>Valentijn</span>
                </Blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-lookbook-home">
        <div className="section-lookbook-home__container">
          <Lookbook items={data.grams.edges} />
          <div className="section-lookbook-home__text">
            <p className="long-paragraph">{t("home.section-lookbook-text")}</p>
            <a href="/lookbook/" className="btn btn--secondary btn">
              {t("home.section-lookbook-btn")}
            </a>
          </div>
        </div>
      </section>
      <section className="section-contact-home">
        <div className="section-contact-home__container">
          <div className="section-contact-home__text">
            <h3 className="heading-3">Contact?</h3>
            <p className="long-paragraph">
              Heb je een vraag, opmerking of ben je als retailer zakelijk
              benieuwd naar de collectie? Neem dan contact met ons op. We zijn
              bereikbaar via:
            </p>
            <ul className="section-contact-home__list">
              <li className="section-contact-home__item">
                <ExtLink
                  to="https://wa.me/31850074449"
                  targetBlank={false}
                  mode="primary"
                >
                  WhatsApp
                </ExtLink>
              </li>
              <li className="section-contact-home__item">
                <ExtLink
                  to="mailto:info@brunmontagne.com"
                  targetBlank={false}
                  mode="primary"
                >
                  Email (info@brunmontagne.com)
                </ExtLink>
              </li>
              <li className="section-contact-home__item">
                <a href="/lookbook/" className="btn btn--secondary btn">
                  {t("home.section-contact-btn")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query LandingPageProductCards($locale: String!) {
    landingPage: allPrismicProduct(
      limit: 4
      filter: {
        lang: { eq: $locale }
        data: {
          variable_product: { eq: false }
          categories: { elemMatch: { category: { uid: { eq: "watches" } } } }
        }
      }
    ) {
      edges {
        node {
          ...ProductFields
          data {
            variable_products {
              product {
                document {
                  ... on PrismicProduct {
                    ...ProductFields
                  }
                }
              }
            }
          }
        }
      }
    }
    popmaImage: file(relativePath: { eq: "Popma-en-Popma-juweliers.png" }) {
      name
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    grams: allInstaNode(sort: { fields: timestamp, order: DESC }, limit: 8) {
      edges {
        node {
          id
          username
          likes
          caption
          comments
          hashtags
          timestamp
          permalink
          localFile {
            childImageSharp {
              fluid(maxWidth: 520) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          carouselImages {
            localFile {
              childImageSharp {
                fluid(maxWidth: 520) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          linkedProducts(locale: $locale) {
            id
            uid
            data {
              name
            }
          }
        }
      }
    }
  }
`
