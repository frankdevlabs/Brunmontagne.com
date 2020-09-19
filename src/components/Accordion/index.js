import React from "react"
import "./accordion.scss"

const Accordion = ({ head, children }) => {
  const [expanded, setExpanded] = React.useState(false)

  const onClickFn = () => setExpanded(!expanded)

  return (
    <div className="accordion">
      <button
        onClick={onClickFn}
        className="accordion__btn"
        aria-expanded={expanded}
      >
        <span className="accordion__title">{head}</span>
        <span className="accordion__icon-wrapper">
          <svg className="accordion__icon">
            <use
              xlinkHref={`/svg/main.svg#${
                expanded ? "minus-round" : "plus-round"
              }`}
            ></use>
          </svg>
        </span>
      </button>
      <div className="accordion__content">{children}</div>
    </div>
  )
}

export default Accordion
