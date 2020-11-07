import React from "react"
import { useTranslation } from "react-i18next"
import Accordion from "../Accordion"
import Button from "../Button"
import Rating from "../Rating"
import TextField from "../TextField"
import "./reviewForm.scss"

const ReviewForm = ({ uid }) => {
  const { t } = useTranslation()
  const [rating, setRating] = React.useState(1)
  const onClickRating = rate => {
    setRating(rate)
  }
  const header = t("reviewForm.header")
  const information = t("reviewForm.information")
  const nameFieldLabel = t("reviewForm.nameFieldLabel")
  const emailFieldLabel = t("reviewForm.emailFieldLabel")
  const titleFieldLabel = t("reviewForm.titleFieldLabel")
  const messageFieldLabel = t("reviewForm.messageFieldLabel")
  const messageFieldPlaceholder = t("reviewForm.messageFieldPlaceholder")
  const buttonLabel = t("reviewForm.buttonLabel")
  return (
    <div className="review-form">
      <Accordion bold={true} head={header}>
        <p className="long-paragraph">{information}</p>
        <form
          className="review-form__form"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
          name={`review - ${uid}`}
        >
          <div className="review-form__rating">
            <span>Aantal sterren</span>
            <Rating
              onClick={onClickRating}
              readonly={false}
              showVotes={false}
              value={0}
              size="xl"
              fractions={1}
            />
          </div>
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value={`review - ${uid}`} />
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            readOnly={true}
            value={rating}
            style={{ display: "none", visibility: "hidden" }}
          />
          <TextField label={nameFieldLabel} name="name" type="text" />
          <TextField label={emailFieldLabel} name="email" type="email" />
          <TextField label={titleFieldLabel} name="title" type="text" />
          <TextField
            placeholder={messageFieldPlaceholder}
            label={messageFieldLabel}
            required={false}
            name="message"
            mode="textarea"
          />
          <div className="review-form__btn">
            <Button className="btn btn--secondary" type="submit" mode="button">
              {buttonLabel}
            </Button>
          </div>
        </form>
      </Accordion>
    </div>
  )
}

export default ReviewForm
