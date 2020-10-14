import React from "react"
import Button from "../Button"
import "./to-top-btn.scss"

const BackToTopButton = () => {
  const [showScroll, setShowScroll] = React.useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  window.addEventListener("scroll", checkScrollTop)

  return (
    <div className={`to-top-btn${showScroll ? "" : "to-top-btn--invisible"}`}>
      <Button
        mode="button"
        className="btn btn--primary btn--square"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        {" "}
        <svg className="to-top-btn__icon">
          <use xlinkHref="/svg/main.svg#arrow-up"></use>
        </svg>
      </Button>
    </div>
  )
}

export default BackToTopButton
