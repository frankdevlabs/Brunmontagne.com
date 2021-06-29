import React from "react"

const ExternalLink = ({
  id,
  children,
  mode,
  border,
  to,
  targetBlank = true,
}) => {
  const linkMode =
    mode === "secondary" ? "ext-link__secondary" : "ext-link__primary"

  const borderClass = border ? " ext-link__border" : ""

  return (
    <a
      className={`ext-link ${linkMode}${borderClass}`}
      href={to}
      target={targetBlank ? "_blank" : "_self"}
      rel="noreferrer"
      id={id}
    >
      {children}
    </a>
  )
}

export default ExternalLink
