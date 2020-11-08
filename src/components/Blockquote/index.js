import React from "react"
import "./blockquote.scss"

const Blockquote = ({ children, author, size }) => {
  return (
    <blockquote
      className={`blockquote ${size === "base" ? " blockquote--base" : ""}`}
    >
      <span className="blockquote__text">{children}</span>
      <span className="blockquote__author">{author}</span>
    </blockquote>
  )
}

export default Blockquote
