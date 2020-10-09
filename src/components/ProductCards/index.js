import React from "react"
import Card from "./card"
import "./cards.scss"

const Cards = ({ cards }) => {
  const filler = cards.length % 4 !== 0 ? 4 - (cards.length % 4) : 0
  const fillerCards = []
  for (let i = 0; i < filler; i++) {
    fillerCards.push(<div key={i} className="column"></div>)
  }
  return (
    <>
      <div className="cards columns is-centered is-multiline">
        {cards.map(card => (
          <Card key={card.id} data={card} />
        ))}
        {fillerCards}
      </div>
    </>
  )
}

export default Cards
