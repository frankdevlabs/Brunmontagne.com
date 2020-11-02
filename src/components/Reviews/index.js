import React, { useState, useEffect, useCallback } from "react"
import { useEmblaCarousel } from "embla-carousel/react"
import { useRecursiveTimeout } from "./useRecursiveTimeout"
import { DotButton, PrevButton, NextButton } from "./buttons"
import Rating from "../Rating"
import "./reviews.scss"
import moment from "moment"
import Quote from "./quote"

const Reviews = ({ reviews, lines }) => {
  const [viewportRef, embla] = useEmblaCarousel()
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const autoplay = useCallback(() => {
    if (!embla) return
    if (embla.canScrollNext()) {
      embla.scrollNext()
    } else {
      embla.scrollTo(0)
    }
  }, [embla])

  const { play, stop } = useRecursiveTimeout(autoplay, 4000)

  const scrollNext = useCallback(() => {
    if (!embla) return
    embla.scrollNext()
    stop()
  }, [embla, stop])

  const scrollPrev = useCallback(() => {
    if (!embla) return
    embla.scrollPrev()
    stop()
  }, [embla, stop])

  const scrollTo = useCallback(
    index => {
      if (!embla) return
      embla.scrollTo(index)
      stop()
    },
    [embla, stop]
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on("select", onSelect)
    embla.on("pointerDown", stop)
  }, [embla, setScrollSnaps, onSelect, stop])

  useEffect(() => {
    play()
  }, [play])

  return (
    <>
      <div className="reviews">
        <div className="reviews__viewport" ref={viewportRef}>
          <div className="reviews__container">
            {reviews.map(item => {
              if (item && item.review && item.review.document) {
                const data = item.review.document.data
                const monthYear = moment(data.date, "YYYY-MM-DD").format(
                  "MMMM YYYY"
                )

                return (
                  <div className="reviews__slide" key={data.name}>
                    <div className="reviews__slide__inner">
                      <article className="reviews__article columns is-mobile">
                        <div className="reviews__article-icon column is-one-quarter">
                          <svg className="reviews__icon">
                            <use xlinkHref="/svg/main.svg#quotation-mark"></use>
                          </svg>
                        </div>
                        <div className="reviews__article-text column">
                          <div className="reviews__article-text-inner">
                            <cite>
                              <h4 className="heading-5">
                                {data.headline.text}
                              </h4>
                              <div className="reviews__article-quote-wrapper">
                                <Quote
                                  lines={lines}
                                  stopCarousel={() => stop()}
                                >
                                  {data.message.text}
                                </Quote>
                              </div>
                            </cite>
                            <div className="reviews__article-meta">
                              <div className="reviews__article-meta-item">
                                {data.name}
                              </div>
                              <div className="reviews__article-meta-item">
                                <div>
                                  <Rating
                                    readonly={true}
                                    showVotes={false}
                                    value={data.rating}
                                  />
                                </div>
                              </div>
                              <div className="reviews__article-meta-item">
                                {monthYear}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                )
              }

              return null
            })}
          </div>
        </div>
      </div>
      {reviews.length > 1 ? (
        <div className="reviews__dots">
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      ) : null}
    </>
  )
}

export default Reviews
