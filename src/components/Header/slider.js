import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { BgImage } from "gbimage-bridge"

class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = { slideIndex: 0 }
    this.slides = []
  }

  componentDidMount() {
    if (this.slides.length > 0) {
      this.slides[this.state.slideIndex].className = this.getClass(
        this.state.slideIndex,
        true
      )
      this.timerID = setInterval(() => this.tick(), 4000)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.slides[this.state.slideIndex].className = this.getClass(
      this.state.slideIndex,
      false
    )

    if (this.state.slideIndex === this.slides.length - 1) {
      this.resetIndex()
    }

    this.increaseIndex()

    this.slides[this.state.slideIndex].className = this.getClass(
      this.state.slideIndex,
      true
    )
  }

  increaseIndex() {
    this.setState({ slideIndex: this.state.slideIndex + 1 })
  }

  resetIndex() {
    this.setState({ slideIndex: -1 })
  }

  getClass(index, active) {
    return `header-home__slide header-home__slide--${index + 1}${
      active ? " active" : ""
    }`
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            prismicHomePage(lang: { eq: "nl-nl" }) {
              data {
                images {
                  slide {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(
                          width: 1920
                          quality: 70
                          placeholder: BLURRED
                          webpOptions: { quality: 70 }
                        )
                      }
                    }
                  }
                }
              }
            }
          }
        `}
        render={({ prismicHomePage: { data } }) => {
          return (
            <div className="header-home__slides">
              {data.images.map(({ slide }, index) => {
                return (
                  <div
                    className={`header-home__slide header-home__slide--${
                      index + 1
                    }`}
                    key={index}
                    ref={elem => (this.slides[index] = elem)}
                  >
                    <Background image={slide.localFile} />
                  </div>
                )
              })}
            </div>
          )
        }}
      />
    )
  }
}

const Background = ({ image }) => {
  const pluginImage = getImage(image)
  const gradient = `linear-gradient(
                      to right bottom,
                      rgba(60, 60, 60, 0.3),
                      rgba(60, 60, 60, 0.3)
      )`

  const bgImage = [gradient, pluginImage]
  return (
    <BgImage image={bgImage} style={{ height: "80vh" }}>
      {""}
    </BgImage>
  )
}

export default Slider
