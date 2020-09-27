import React from "react"
import "./externalLink.scss"

const ExternalLink = ({ children, mode, border, to, targetBlank = true }) => {
  const linkMode =
    mode === "secondary" ? "ext-link__secondary" : "ext-link__primary"

  const borderClass = border ? " ext-link__border" : ""

  return (
    <a
      className={`ext-link ${linkMode}${borderClass}`}
      href={to}
      target={targetBlank ? "_blank" : "_self"}
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

export default ExternalLink
