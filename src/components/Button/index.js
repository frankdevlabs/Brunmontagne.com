// /* eslint-disable react/display-name */
import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { usePageContext } from "../../../pageContext"

const Button = props => {
  if (props.mode === "button") {
    return <button {...props} />
  }
  return <GatsbyButton {...props} />
}

const GatsbyButton = React.forwardRef(({ to, children, ...rest }, ref) => {
  const { lang } = usePageContext()

  return (
    <GatsbyLink {...rest} ref={ref} to={`/${lang}${to}`}>
      {children}
    </GatsbyLink>
  )
})

export default Button
