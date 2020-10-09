import React from "react"
import "./blockquote.scss"

const Blockquote = ({ children, size }) => {
  return (
    <blockquote
      className={`blockquote ${size === "base" ? " blockquote--base" : ""}`}
    >
      {children}
    </blockquote>
  )
}

export default Blockquote
