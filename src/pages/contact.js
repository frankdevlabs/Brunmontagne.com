import React from "react"
import { useTranslation } from "react-i18next"
import ContactForm from "../components/ContactForm"
import ExtLink from "../components/ExternalLink"
import Layout from "../components/Layout"
import "./contact.scss"

const ContactPage = () => {
  const { t } = useTranslation("translation")

  const general = t("contactForm.general")
  return (
    <Layout seoPageTitle="Contact">
      <section className="section-content">
        <div className="section-content__container contact-page">
          <h1 className="heading-2 center-text margin-bottom-large">Contact</h1>
          <div className="contact-page-sub-section__information">
            <p className="long-paragraph">{general}</p>
            <div className="contact-info">
              <h2 className="heading-4">Brunmontagne</h2>
              <address className="contact-info__address">
                Binnendijk 79 <br />
                8461LH Rottum <br />
              </address>
              <ExtLink
                to="mailto:info@brunmontagne.com"
                targetBlank={false}
                mode="secondary"
              >
                info@brunmontagne.com
              </ExtLink>
              <p className="contact-info__phone">085 0074449</p>
              <p className="long-paragraph">KVK-nummer 73441317</p>
            </div>
          </div>
          <div className="contact-page-sub-section__form">
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage
