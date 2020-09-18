import React from "react"
import Card from "./card"
import "./cards.scss"

const Cards = ({ cards }) => {
  const options = [
    ...new Set(
      cards.reduce((acc, cur) => {
        const newOptions = cur.variable_products.reduce((acc, cur) => {
          const product = cur.product.document.data
          const components = product.inventory_components.reduce((acc, cur) => {
            return [
              ...acc,
              {
                id: cur.component.document.id,
                ...cur.component.document.data,
              },
            ]
          }, [])
          return [...acc, ...components]
        }, [])
        return [...acc, ...newOptions]
      }, [])
    ),
  ]

  const card = cards[0]
  return (
    <>
      <div className="cards columns is-centered is-multiline">
        <Card data={card} options={options} />
        <Card data={card} options={options} />
        <Card data={card} options={options} />
        <Card data={card} options={options} />
      </div>
    </>
  )
}

// const query = graphql`
//   query cardQuery(
//     $id: ID! = "ckdqeflco0x550163hwr2b8ep"
//     $locale: [GraphCMS_Locale!]! = nl
//   ) {
//     gcms {
//       product(where: { id: $id }, locales: $locale) {
//         id
//         price
//         salePrice
//         sale
//         name
//         locale
//         slug
//         description {
//           html
//         }
//       }
//       assets: product(where: { id: $id }) {
//         images {
//           id
//           alt
//           url
//           node {
//             childImageSharp {
//               fluid(maxWidth: 350) {
//                 base64
//                 aspectRatio
//                 originalImg
//                 originalName
//                 tracedSVG
//                 srcWebp
//                 srcSetWebp
//                 src
//                 srcSet
//                 sizes
//                 presentationHeight
//                 presentationWidth
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

export default Cards
