import React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { LiteYouTubeEmbed } from "react-lite-youtube-embed"
import Img from "gatsby-image"
import Blockquote from "../components/Blockquote"
import Button from "../components/Button"
import ExtLink from "../components/ExternalLink"
import Layout from "../components/Layout"
import Link from "../components/Link"
import Lookbook from "../components/Lookbook"
import ProductCards from "../components/ProductCards"
import Reviews from "../components/Reviews"
import "./home.scss"

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
              <Blockquote author={t("home.section-story-pascal")}>
                {t("home.section-story-quote-1")}
                <br /> <br /> {t("home.section-story-quote-2")}
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
              <h3 className="heading-3">
                {t("home.section-media-horlogeforum-title")}
              </h3>
              <div className="section-media__horlogeforum-text">
                <Reviews lines={4} reviews={data.reviews.data.reviews} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-lookbook-home">
        <div className="section-lookbook-home__container">
          <Lookbook items={data.grams.edges} />
          <div className="section-lookbook-home__text">
            {/*<p className="long-paragraph">{t("home.section-lookbook-text")}</p>*/}
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
                  to="/contact/"
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
    reviews: prismicHomePage(lang: { eq: $locale }) {
      data {
        reviews {
          review {
            document {
              ... on PrismicReview {
                data {
                  name
                  date
                  headline {
                    text
                  }
                  message {
                    text
                  }
                  name_external_source
                  link_external_source
                }
              }
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
