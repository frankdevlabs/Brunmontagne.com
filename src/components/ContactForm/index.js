import React from "react"
import { useTranslation } from "react-i18next"
import Button from "../Button"
import TextField from "../TextField"
import * as styles from "../../scss/components/modules/contactForm.module.scss"

const ContactForm = () => {
  const { t } = useTranslation("translation")

  const information = t("contactForm.information")
  const nameFieldLabel = t("contactForm.nameFieldLabel")
  const emailFieldLabel = t("contactForm.emailFieldLabel")
  const phoneFieldLabel = t("contactForm.phoneFieldLabel")
  const messageFieldLabel = t("contactForm.messageFieldLabel")
  const buttonLabel = t("contactForm.buttonLabel")

  return (
    <div>
      <p className="long-paragraph">{information}</p>
      <form
        className={styles.contactForm__form}
        method="post"
        netlify-honeypot="bot-field"
        data-netlify="true"
        name="contact"
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="contact" />
        <TextField label={nameFieldLabel} name="name" type="text" />
        <TextField label={emailFieldLabel} name="email" type="email" />
        <TextField
          label={phoneFieldLabel}
          name="phone"
          type="text"
          required={false}
        />
        <TextField label={messageFieldLabel} name="message" mode="textarea" />
        <div className={styles.contactForm__btn}>
          <Button className="btn btn--secondary" type="submit" mode="button">
            {buttonLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
