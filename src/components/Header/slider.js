import React from "react"
import { StaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image-es5"

class Slider extends React.Component {
  componentDidMount() {
    this.slideShow()
  }

  slideShow() {
    const slides = document.getElementsByClassName("header-home__slide")
    let slideIndex = 0
    setTimeout(showSlide, 4000)

    function showSlide() {
      if (slides[slideIndex]) {
        slides[slideIndex].className = slides[slideIndex].className.replace(
          " active",
          ""
        )

        slideIndex++

        if (slideIndex === slides.length) {
          slideIndex = 0
        }

        slides[slideIndex].className += " active"

        setTimeout(showSlide, 5500)
      }
    }
  }

  render() {
    console.log(this.props.data)

    const { hero1, hero2, hero3 } = this.props.data
    return (
      <>
        <Background
          className={`header-home__slide header-home__slide--1 active`}
          image={hero1.childImageSharp.fluid}
        />
        <Background
          className={`header-home__slide header-home__slide--2`}
          image={hero2.childImageSharp.fluid}
        />
        <Background
          className={`header-home__slide header-home__slide--3`}
          image={hero3.childImageSharp.fluid}
        />
      </>
    )
  }
}

const Background = ({ className, image }) => {
  const backgroundFluidImageStack = [
    `linear-gradient(
                      to right bottom,
                      rgba(60, 60, 60, 0.3),
                      rgba(60, 60, 60, 0.3)
      )`,
    image,
  ]
  return (
    <BackgroundImage
      Tag="div"
      className={className}
      fluid={backgroundFluidImageStack}
      preserveStackingContext={true}
      style={{ position: "absolute", backgroundSize: "cover" }}
    ></BackgroundImage>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query BackgroundImagesQuery {
        hero1: file(
          relativePath: { eq: "hero-image-brunmontagne-1920-1.jpg" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        hero2: file(
          relativePath: { eq: "hero-image-brunmontagne-1920-2.jpg" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        hero3: file(
          relativePath: { eq: "hero-image-brunmontagne-1920-3.jpg" }
        ) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => <Slider data={data} {...props} />}
  />
)
