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
import Link from "../components/Link"
import Button from "../components/Button"
import { LiteYouTubeEmbed } from "react-lite-youtube-embed"

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
      seoDescription={t("siteMetadata.description")}
      headerMode="home"
    >
      <section className="section-collection">
        <div className="section-collection__container ">
          <h2 className="heading-2">{t("home.section-collection-title")}</h2>
          <ProductCards cards={Cards} list="Home Page" />
          <div className="section-collection__btn">
            <Button to="/collection/" className="btn btn--secondary">
              {t("home.section-collection-btn")}
            </Button>
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
                <LiteYouTubeEmbed
                  id="BOKKEjAn0Xc" // Default none, id of the video or playlist
                  adNetwork={false} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
                  playlist={false} // Use  true when your ID be from a playlist
                  poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
                  title="Tijdloze Passie" // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
                  noCookie={true} //Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
                />
              </div>
            </div>
          </div>
          <div className="section-story__btn">
            <Button to="/about-us/" className="btn btn--secondary">
              {t("home.section-story-btn")}
            </Button>
          </div>
        </div>
      </section>
      <section className="section-media">
        <div className="section-media__container">
          <div className="section-media__columns columns is-desktop">
            <div className="section-media__stores column">
              <h3 className="heading-3">
                {t("home.section-media-stores-title")}
              </h3>
              <div className="section-media__image-wrapper">
                <Img
                  fluid={data.popmaImage.childImageSharp.fluid}
                  alt={data.popmaImage.name}
                />
              </div>
              <div className="section-media__stores-text">
                <p className="long-paragraph">
                  <strong>{t("home.section-media-stores-exclusive")}</strong>{" "}
                  {t("home.section-media-stores-text")}
                  <ExtLink
                    to="https://goo.gl/maps/Kw55SPLgdsSRNN588"
                    mode="primary"
                    targetBlank={true}
                  >
                    {t("home.section-media-stores-directions")}
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
            <Button to="/lookbook/" className="btn btn--secondary">
              {t("home.section-lookbook-btn")}
            </Button>
          </div>
        </div>
      </section>
      <section className="section-contact-home">
        <div className="section-contact-home__container">
          <div className="section-contact-home__text">
            <h3 className="heading-3"> {t("home.section-contact-title")}</h3>
            <p className="long-paragraph">{t("home.section-contact-text")}</p>
            <ul className="section-contact-home__list">
              <li className="section-contact-home__item">
                <ExtLink
                  to="https://wa.me/31850074449"
                  targetBlank={true}
                  mode="primary"
                  id="whatsapp"
                >
                  WhatsApp
                </ExtLink>
              </li>
              <li className="section-contact-home__item">
                <ExtLink
                  to="mailto:info@brunmontagne.com"
                  targetBlank={true}
                  mode="primary"
                  id="email"
                >
                  Email (info@brunmontagne.com)
                </ExtLink>
              </li>
              <li className="section-contact-home__item">
                <Link
                  to="/contact"
                  className="link link__primary"
                  id="contact-form"
                >
                  {t("home.section-contact-btn")}
                </Link>
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
          ...ProductPageFields
          data {
            variable_products {
              product {
                document {
                  ... on PrismicProduct {
                    ...ProductPageFields
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
              fluid(maxWidth: 310) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          carouselImages {
            localFile {
              childImageSharp {
                fluid(maxWidth: 310) {
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

  fragment ProductPageFields on PrismicProduct {
    id
    uid
    lang
    data {
      title {
        text
      }
      subtitle {
        text
      }
      collection {
        document {
          ... on PrismicCollection {
            data {
              name
              description {
                html
              }
            }
          }
        }
      }
      images {
        alt
        node {
          id
          childImageSharp {
            fluid(maxWidth: 430) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            fixed(width: 74) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      name
      seo {
        text
      }
      description {
        html
      }
      specifications {
        specification {
          document {
            ... on PrismicSpecification {
              data {
                key
                value
              }
            }
          }
        }
      }
      variable_product
      price
      discount_price
      discount_active
      sku
      inventory_components {
        component {
          document {
            ... on PrismicInventory {
              id
              data {
                name
                public_name
                stock
                inventory_type
                color
                material
                images {
                  alt
                  node {
                    id
                    childImageSharp {
                      fixed(width: 74) {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      categories {
        category {
          document {
            ... on PrismicCategory {
              uid
              data {
                name
                description {
                  html
                }
              }
            }
          }
        }
      }
      reviews {
        review {
          document {
            ... on PrismicReview {
              first_publication_date
              data {
                name
                email
                headline {
                  text
                }
                message {
                  text
                }
                rating
              }
            }
          }
        }
      }
    }
  }
`
