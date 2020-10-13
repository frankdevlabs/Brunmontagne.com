import React from "react"
import TextField from "../TextField"
import Button from "../Button"
import { useTranslation } from "react-i18next"
import "./reviewForm.scss"
import Accordion from "../Accordion"

const ReviewForm = ({ uid }) => {
  const { t } = useTranslation()

  const information = t("contactForm.information")
  const nameFieldLabel = t("contactForm.nameFieldLabel")
  const emailFieldLabel = t("contactForm.emailFieldLabel")
  const messageFieldLabel = t("contactForm.messageFieldLabel")
  const buttonLabel = t("contactForm.buttonLabel")
  return (
    <div className="review-form">
      <Accordion bold={true} head="Review delen">
        <p className="long-paragraph">{information}</p>
        <form
          className="review-form__form"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
          name={`review - ${uid}`}
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value={`review - ${uid}`} />
          <TextField label={nameFieldLabel} name="name" type="text" />
          <TextField label={emailFieldLabel} name="email" type="email" />
          <TextField label={messageFieldLabel} name="message" mode="textarea" />
          <div className="contact-form__btn">
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
