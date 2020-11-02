import React, { useState } from "react"
import Truncate from "react-truncate"
import Link from "../Link"
import { useTranslation } from "react-i18next"

const Quote = ({ children, stopCarousel, lines }) => {
  const [truncated, setTruncated] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const maxLines = lines || 8

  const { t } = useTranslation()

  const handleTruncate = () => {
    if (!truncated) {
      setTruncated(truncated)
    }
  }

  const toggleLines = event => {
    event.preventDefault()
    stopCarousel()
    setExpanded(!expanded)
  }
  return (
    <div>
      <Truncate
        trimWhitespace
        lines={!expanded && maxLines}
        ellipsis={
          <span>
            ...{" "}
            <Link
              className="link link__btn link__primary"
              mode="button"
              onClick={toggleLines}
            >
              {t("product.readMore")}
            </Link>
          </span>
        }
        onTruncate={handleTruncate}
      >
        <blockquote className="reviews__article-blockquote">
          {children}
        </blockquote>
      </Truncate>
      {!truncated && expanded && (
        <span>
          {" "}
          <Link
            className="link link__btn link__primary"
            mode="button"
            onClick={toggleLines}
          >
            {t("product.readLess")}
          </Link>
        </span>
      )}
    </div>
  )
}

export default Quote
