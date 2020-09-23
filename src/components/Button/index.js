// /* eslint-disable react/display-name */
import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { usePageContext } from "../../../pageContext"
import { DEFAULT_OPTIONS } from "../../../constants"
import "./button.scss"

const Button = props => {
  if (props.mode === "button") {
    return <button {...props} />
  }
  return <GatsbyButton {...props} />
}

const GatsbyButton = React.forwardRef(({ to, children, ...rest }, ref) => {
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

export default Button
