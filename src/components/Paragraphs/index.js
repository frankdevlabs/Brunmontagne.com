import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import * as styles from "../../scss/components/modules/paragraphs.module.scss"

const Parapgraphs = ({ data }) => {
  return (
    <div className={styles.paragraphs}>
      {data.map((element, index) => {
        switch (element.paragraphType) {
          case "paragraph":
            return (
              <div key={index}>
                <p className="long-paragraph">{element.content.text}</p>
              </div>
            )
          case "embed":
            return (
              <div key={index} className={styles.paragraphs__embed}>
                <div
                  dangerouslySetInnerHTML={{ __html: element.content.html }}
                />
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
                    image={element.image.childImageSharp.gatsbyImageData}
                    imgStyle={{ objectFit: "contain" }}
                    alt={element.alt} />
                </div>
                <div className={styles.paragraphs__imageCaption}>
                  {element.alt}
                </div>
              </div>
            );
          default:
            return <></>
        }
      })}
    </div>
  );
}

export default Parapgraphs
