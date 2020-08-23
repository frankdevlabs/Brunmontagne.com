import React from "react"
import { useTranslation } from "react-i18next"
import Card from "./card"

import { useStaticQuery, graphql } from "gatsby"

import "./cards.scss"

const Cards = () => {
  const {
    gcms: { product, assets },
  } = useStaticQuery(query)
  console.log(product, assets)

  return (
    <>
      <div className="cards columns is-centered is-multiline">
        <Card assets={assets} product={product} />
        <Card assets={assets} product={product} />
        <Card assets={assets} product={product} />
        <Card assets={assets} product={product} />
        <Card assets={assets} product={product} />
        <Card assets={assets} product={product} />
        <Card assets={assets} product={product} />
        <Card assets={assets} product={product} />
      </div>
    </>
  )
}

const query = graphql`
  query cardQuery(
    $id: ID! = "ckdqeflco0x550163hwr2b8ep"
    $locale: [GraphCMS_Locale!]! = nl
  ) {
    gcms {
      product(where: { id: $id }, locales: $locale) {
        id
        price
        salePrice
        sale
        name
        locale
        slug
        description {
          html
        }
      }
      assets: product(where: { id: $id }) {
        images {
          id
          alt
          url
          node {
            childImageSharp {
              fluid(maxWidth: 350) {
                base64
                aspectRatio
                originalImg
                originalName
                tracedSVG
                srcWebp
                srcSetWebp
                src
                srcSet
                sizes
                presentationHeight
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`

export default Cards
