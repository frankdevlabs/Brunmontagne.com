import React from "react"; // eslint-disable-line no-unused-vars
import Link from "./link";
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

const PageHit = ({ hit }) => {
  const snippetLength = hit._snippetResult.description.value.split(" ").length;
  return (
    <div>
      <Link
        to={`/products/${hit.productType.toLowerCase()}/${hit.slug}/`}
        ui="simple"
      >
        <h4>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
      </Link>
      {hit._snippetResult.description.matchLevel === "full" ? (
        <>
          <Snippet attribute="description" hit={hit} tagName="mark" />
          {snippetLength === 20 || snippetLength === 19 ? "..." : ""}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const HitsInIndex = ({ index, color }) => (
  <Index indexName={index.name} attributesToSnippet={["description:3"]}>
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
        overflow: "scroll",
        webkitOverflowScrolling: "touch",
        right: "0",
        boxShadow: " 0 0 5px 0",
        padding: "1em",
        borderRadius: "2px",
        background: theme.colors.PRIMARY_LIGHT,
        position: "fixed",
        width: "94%",
        marginLeft: "-47%",
        top: "18%",
        left: "50%",
        marginTop: "-5rem",
        zIndex: "9006",

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
