import React, { createContext, useCallback, useState } from 'react';

export const SearchContext = createContext({});

const SearchProvider = ({ children }) => {
  const [filteredList, setFilteredList] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleList = useCallback((array, search) => {
    array.map(item => ({ ...item, selected: false }))
    
    setFilteredList(array);
    array.length === 0 && search !== "" && search !== undefined ? setNotFound(true) : setNotFound(false);
  });


  return (
    <SearchContext.Provider value={{filteredList, notFound, handleList}}>
      {children} 
    </SearchContext.Provider> 
  );
}

export { SearchProvider };