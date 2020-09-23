import React from "react"
import "./externalLink.scss"

const ExternalLink = ({ children, mode, to, targetBlank = true }) => {
  const linkMode =
    mode === "secondary" ? "ext-link__secondary" : "ext-link__primary"

  return (
    <a
      className={`ext-link ${linkMode}`}
      href={to}
      target={targetBlank ? "_blank" : "_self"}
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

export default ExternalLink
