// Global search context used by the navbar search input
// and any pages that want to filter by a shared query.

import React from 'react';

export const SearchContext = React.createContext({
  query: '',
  setQuery: () => {},
});

export function SearchProvider({ children }) {
  const [query, setQuery] = React.useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

