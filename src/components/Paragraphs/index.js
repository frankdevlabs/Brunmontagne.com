import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../../scss/components/modules/paragraphs.module.scss"

const Parapgraphs = ({ data }) => {
  return (
    <div className={styles.paragraphs}>
      {data.map(({ content }, index) => {
        switch (content.paragraphType) {
          case "paragraph":
            return (
              <div key={index}>
                <p className="long-paragraph">{content.text}</p>
              </div>
            )
          case "embed":
            return (
              <div key={index} className={styles.paragraphs__embed}>
                <div dangerouslySetInnerHTML={{ __html: content.html }} />
              </div>
            )
          case "image":
            return (
              <div key={index} className={styles.paragraphs__image}>
                <div
                  className={styles.paragraphs__imageInner}
                  style={{ maxWidth: "216px" }}
                >
                  <GatsbyImage
                    image={content.imageSrc.childImageSharp.gatsbyImageData}
                    imgStyle={{ objectFit: "contain" }}
                    alt={content.imageAlt}
                  />
                </div>
                <div className={styles.paragraphs__imageCaption}>
                  {content.imageAlt}
                </div>
              </div>
            )
          default:
            return <></>
        }
      })}
    </div>
  )
}

export default Parapgraphs
