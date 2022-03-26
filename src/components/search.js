import React, { createRef, useState, useMemo } from "react"; // eslint-disable-line no-unused-vars
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./search-box";
import SearchResults from "./search-results";

import { useEffect } from "react";

const events = [`mousedown`, `touchstart`];

const useClickOutside = (ref, onClickOutside) => {
  const isOutside = (element) => !ref.current || !ref.current.contains(element);

  const onClick = (event) => {
    if (isOutside(event.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, onClick);
    }

    return () => {
      for (const event of events) document.removeEventListener(event, onClick);
    };
  });
};

const Search = ({ indices }) => {
  const rootRef = createRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  );

  useClickOutside(rootRef, () => setFocus(false));

  return (
    <div ref={rootRef} css={{ position: "relative", margin: "0.6em 0" }}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
        <SearchResults
          show={query && query.length > 0 && hasFocus}
          indices={indices}
        />
      </InstantSearch>
    </div>
  );
};

export default Search;
