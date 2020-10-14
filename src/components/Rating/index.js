import React from "react"
import Rating from "react-rating"
import "./rating.scss"

const Icon = props => {
  return (
    <svg
      className={`rating__icon${
        props.size === "xl" ? " rating__icon--xl" : ""
      } rating__${props.icon}`}
      pointerEvents="none"
    >
      <use xlinkHref={`/svg/main.svg#${props.icon}`}></use>
    </svg>
  )
}

const CustomRating = ({
  readonly = true,
  showVotes = true,
  value = 4.7,
  votes = 99,
  onClick = function () {},
  size = "sm",
  fractions = 2,
}) => {
  return (
    <div className="rating">
      <div className="rating__stars">
        <Rating
          emptySymbol={<Icon icon="star-empty" size={size} />}
          fullSymbol={<Icon icon="star-full" size={size} />}
          fractions={fractions}
          initialRating={value}
          readonly={readonly}
          onClick={onClick}
        />
      </div>
      {showVotes ? (
        <div className="rating__text">
          <span className="rating__avg">{value}</span>{" "}
          <span className="rating__votes">({votes})</span>
        </div>
      ) : null}
    </div>
  )
}

export default CustomRating
