import React from "react"
import BackgroundImage from "gatsby-background-image-es5"

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
    const { slides } = this.props

    return (
      <div className="header-home__slides">
        {slides.map((slide, index) => {
          return (
            <div
              className={`header-home__slide header-home__slide--${index + 1}`}
              key={index}
              ref={elem => (this.slides[index] = elem)}
            >
              <Background
                image={slide.node.childImageSharp.fluid}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

const Background = ({ style, image }) => {
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
      fluid={backgroundFluidImageStack}
      preserveStackingContext={true}
      style={{ position: "absolute", backgroundSize: "cover", ...style }}
    ></BackgroundImage>
  )
}

export default Slider
