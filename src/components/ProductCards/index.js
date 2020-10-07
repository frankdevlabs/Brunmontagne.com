import React from "react"
import Card from "./card"
import "./cards.scss"

const Cards = ({ cards }) => {
  return (
    <>
      <div className="cards columns is-centered is-multiline">
        {cards.map(card => (
          <Card key={card.id} data={card} />
        ))}
      </div>
    </>
  )
}

export default Cards
