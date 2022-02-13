import React from "react"; // eslint-disable-line no-unused-vars
import { useTranslation } from "gatsby-plugin-react-i18next";
import SectionTitle from "../../components/section-title";
import InputField from "../../components/input-field";
import Button from "../../components/button";
import mq from "../../theme/media-queries";

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <section css={{ paddingTop: "15rem", [mq("md")]: { paddingTop: "6rem" } }}>
      <div className="container">
        <div css={{ maxWidth: "57.7rem", marginLeft: "auto" }}>
          <SectionTitle>
            {t("contact.title-part-1")} {t("contact.title-part-2")}
          </SectionTitle>
        </div>
        <form
          css={{
            marginTop: "13.1rem",
            [mq("lg")]: {
              marginTop: "10rem",
            },
            [mq("md")]: {
              marginTop: "8rem",
            },
          }}
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
          name="contact"
        >
          <div
            css={{
              display: "flex",
              [mq("md")]: {
                flexWrap: "wrap",
              },
              "& > *": {
                flex: "0 1 50%",
                [mq("md")]: {
                  flex: "0 1 100%",
                },
              },
            }}
          >
            <div
              css={{
                "& > div:not(:first-of-type)": {
                  marginTop: "4.4rem",
                },
                "& > div:last-of-type": {
                  [mq("md")]: {
                    marginBottom: "4.4rem",
                  },
                },
                "& > div": {
                  marginLeft: "auto",
                  marginRight: "10rem",
                  [mq("xxl")]: {
                    marginLeft: "unset",
                    marginRight: "5rem",
                  },
                  [mq("md")]: {
                    maxWidth: "unset",
                    marginRight: "unset",
                  },
                },
              }}
            >
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="contact" />
              <InputField
                label={t("contact.name-input-label")}
                name="name"
                type="text"
              />
              <InputField
                label={t("contact.email-input-label")}
                name="email"
                type="email"
              />
              <InputField
                label={t("contact.phone-input-label")}
                name="phone"
                type="text"
                required={false}
              />
            </div>

            <div
              css={{
                "& > div": {
                  [mq("md")]: {
                    height: "20rem",
                  },
                },
              }}
            >
              <InputField
                label={t("contact.message-input-label")}
                name="message"
                mode="textarea"
              />
            </div>
          </div>
          <div
            css={{
              marginTop: "11rem",
              marginBottom: "11rem",
              display: "flex",
              justifyContent: "center",
              [mq("md")]: {
                marginTop: "4.4rem",
                marginBottom: "4.4rem",
              },
            }}
          >
            <Button type="submit" ui="arrow-btn">
              {t("contact.button-label")}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
