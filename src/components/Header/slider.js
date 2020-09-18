import React from "react"

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
    return (
      <>
        <div className="header-home__slide header-home__slide--1 active"></div>
        <div className="header-home__slide header-home__slide--2"></div>
        <div className="header-home__slide header-home__slide--3"></div>
      </>
    )
  }
}

export default Slider