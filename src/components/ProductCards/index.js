import React from "react"
import Card from "./card"
import * as styles from "../../scss/components/modules/productCard/cards.module.scss"

const Cards = ({ cards, list }) => {
  const filler = cards.length % 4 !== 0 ? 4 - (cards.length % 4) : 0
  const fillerCards = []
  for (let i = 0; i < filler; i++) {
    fillerCards.push(
      <div key={i} className="column">
        {""}
      </div>
    )
  }
  return (
    <div
      data-product-list={list}
      className={`${styles.cards} columns is-centered is-multiline`}
    >
      {cards.map((card, index) => (
        <Card key={card.id} data={card} position={index} list={list} />
      ))}
      {fillerCards}
    </div>
  )
}

export default Cards
