import React from "react"
import Img from "gatsby-image"
import "./paragraphs.scss"

const Parapgraphs = ({ data }) => {
  return (
    <div className="paragraphs">
      {data.map(element => {
        switch (element.paragraphType) {
          case "paragraph":
            return (
              <div className="paragraphs__text">
                <p className="long-paragraph">{element.content.text}</p>
              </div>
            )
          case "embed":
            return (
              <div className="paragraphs__embed">
                <div
                  dangerouslySetInnerHTML={{ __html: element.content.html }}
                />
              </div>
            )
          case "image":
            return (
              <div className="paragraphs__image">
                <div
                  className="paragraphs__image-inner"
                  style={{ maxWidth: "216px" }}
                >
                  <Img
                    fluid={element.image.childImageSharp.fluid}
                    imgStyle={{ objectFit: "contain" }}
                    alt={element.alt}
                  />
                </div>
                <caption className="paragraphs__image-caption">
                  {element.alt}
                </caption>
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
