import React from "react";
import Rating from "react-rating";
import Star from "../assets/vectors/star.svg";
import { useTheme } from "@emotion/react";

const StarWithProps = ({ filled, size }) => {
  const theme = useTheme();
  const { YELLOW, OFF_SECONDARY } = theme.colors;
  return (
    <span
      css={{
        display: "inline-block",
        marginRight: "0.3rem",
        color: filled ? YELLOW : OFF_SECONDARY,
        ...(size === "sm"
          ? { "& > svg": { height: "12px", width: "12px" } }
          : {}),
      }}
    >
      <Star />
    </span>
  );
};

const CustomRating = ({
  readonly = true,
  showVotes = true,
  value = 4.7,
  votes = 99,
  onClick = function () {},
  fractions = 2,
  size = "lg",
}) => {
  return (
    <div
      css={{
        display: "flex",
        fontSize: "1.4rem",
      }}
    >
      <div
        css={{
          marginRight: "0.5rem",
          display: "flex",
          alignItems: "center",
          "& > span": { height: "19px" },
        }}
      >
        <Rating
          emptySymbol={<StarWithProps size={size} />}
          fullSymbol={<StarWithProps size={size} filled />}
          fractions={fractions}
          initialRating={value}
          readonly={readonly}
          onClick={onClick}
        />
      </div>
      {showVotes ? (
        <div>
          <span>{value}</span> <span>({votes})</span>
        </div>
      ) : null}
    </div>
  );
};

export default CustomRating;
