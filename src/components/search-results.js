import React from "react"; // eslint-disable-line no-unused-vars
import { Link } from "gatsby";
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom";
import { useTheme } from "@emotion/react";

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits;

  return hitCount > 0 ? (
    <div css={{ display: "flex", justifyContent: "flex-end" }}>
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null;
});

const PageHit = ({ hit }) => (
  <div>
    <Link to={hit.slug}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
);

const HitsInIndex = ({ index, color }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits
      css={{
        "& ul": {
          listStyle: "none",
          marginLeft: "0",
        },
        "& li.ais-Hits-item": {
          marginBottom: "1em",
          "& a": {
            color: color,
            "& h4": {
              marginBottom: "0.2em",
            },
          },
        },
      }}
      hitComponent={PageHit}
    />
  </Index>
);

const SearchResult = ({ indices, show }) => {
  const theme = useTheme();
  return (
    <div
      css={{
        display: show ? `block` : `none`,
        maxHeight: "80vh",
        overflow: "scroll",
        webkitOverflowScrolling: "touch",
        zIndex: "2",
        right: "0",
        marginTop: "0.5em",
        maxWidth: "30em",
        boxShadow: " 0 0 5px 0",
        padding: "1em",
        borderRadius: "2px",
        background: theme.colors.PRIMARY_LIGHT,
        position: "fixed",
        width: "50rem",
        top: "27%",
        left: "50%",
        marginLeft: "-25rem",

        "& .ais-PoweredBy": {
          display: "flex",
          justifyContent: "flex-end",
          fontSize: "80%",
          svg: {
            width: "70px",
          },
        },
      }}
    >
      {indices.map((index) => (
        <HitsInIndex
          index={index}
          key={index.name}
          color={theme.colors.SECONDARY_LIGHT}
        />
      ))}
      <PoweredBy />
    </div>
  );
};

export default SearchResult;
