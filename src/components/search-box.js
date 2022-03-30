import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import { connectSearchBox } from "react-instantsearch-dom";
import Search from "../assets/vectors/search.svg";
import { useTheme } from "@emotion/react";

const SearchBox = ({ refine, currentRefinement, onFocus, hasFocus }) => {
  const theme = useTheme();

  const [animation, setAnimation] = useState("");

  useEffect(() => {
    setAnimation(hasFocus ? "focus" : "");
  }, [hasFocus]);

  return (
    <div
      className={[animation].join()}
      css={{
        "&.focus": {
          position: "fixed",
          width: "94%",
          marginLeft: "-47%",
          height: "10rem",
          top: "7%",
          left: "50%",
          marginTop: "-5rem",
          backgroundColor: theme.colors.PRIMARY_LIGHT,
          display: "flex",
          borderRadius: "2px",
          padding: "2%",
          zIndex: "9005",
        },
      }}
    >
      <form
        css={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          marginBottom: "0",
        }}
      >
        <input
          css={{
            outline: "none",
            fontSize: "1.6rem",
            transition: "100ms",
            borderRadius: "2px",
            height: "2.4rem",
            width: "0",
            background: "transparent",
            cursor: "pointer",
            marginLeft: "-2.4rem",
            paddingLeft: "2.4rem",
            border: "none",
            color: theme.colors.SECONDARY_LIGHT,
            "&::placeholder": {
              color: theme.colors.SECONDARY_LIGHT_60,
            },

            "&.focus": {
              animation: "focussing 500ms ease",
              width: "10em",
              cursor: "text",
              marginLeft: "-2.4rem",
              paddingLeft: "2.4rem",
              border: "auto",
              background: theme.colors.PRIMARY_LIGHT,
            },
          }}
          className={[animation].join()}
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => refine(e.target.value)}
          value={currentRefinement}
          onFocus={onFocus}
        />
        <div
          css={{
            width: "2.4rem",
            height: "2.4rem",
            pointerEvents: "none",
            "& > svg": {
              fill: theme.colors.SECONDARY_LIGHT,
            },
          }}
        >
          <Search />
        </div>
      </form>
    </div>
  );
};

export default connectSearchBox(SearchBox);
