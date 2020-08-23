// /* eslint-disable react/display-name */
import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { usePageContext } from "../../../pageContext"
import { DEFAULT_OPTIONS } from "../../../constants"
import "./link.scss"

const Link = React.forwardRef(({ to, children, ...rest }, ref) => {
  const { lang } = usePageContext()
  const { defaultLanguage } = DEFAULT_OPTIONS

  return (
    <GatsbyLink
      {...rest}
      ref={ref}
      to={lang !== defaultLanguage ? `/${lang}${to}` : to}
    >
      {children}
    </GatsbyLink>
  )
})

export default Link
