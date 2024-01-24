import React, { createContext, useContext, useState } from "react";

interface SearchContextProps {
  search: string | "";
  setLoggedSearch: (search: string | "") => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState<string | "">("");

  const setLoggedSearch = (newSearch: string | "") => {
    setSearch(newSearch);
  };

  return (
    <SearchContext.Provider value={{ search, setLoggedSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
