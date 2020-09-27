import React from "react"
import LookbookItem from "./item"
import "./lookbook.scss"

const Lookbook = ({ items }) => {
  return (
    <div className="lookbook__gallery">
      {items.map(({ node }) => {
        return <LookbookItem key={node.id} node={node} />
      })}
    </div>
  )
}

export default Lookbook
