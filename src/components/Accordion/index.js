import React from "react"
import * as styles from "../../scss/components/modules/accordion.module.scss"

const Accordion = ({ head, children, bold }) => {
  const [expanded, setExpanded] = React.useState(false)

  const onClickFn = () => setExpanded(!expanded)

  return (
    <div>
      <button
        onClick={onClickFn}
        className={`${styles.accordion__btn} ${
          bold ? styles.accordion__btnBold : ""
        }`}
        aria-expanded={expanded}
      >
        <span className={styles.accordion__title}>{head}</span>
        <span className={styles.accordion__iconWrapper}>
          <svg className={styles.accordion__icon}>
            <use
              xlinkHref={`/svg/main.svg#${
                expanded ? "minus-round" : "plus-round"
              }`}
            ></use>
          </svg>
        </span>
      </button>
      <div className={styles.accordion__content}>{children}</div>
    </div>
  )
}

export default Accordion
