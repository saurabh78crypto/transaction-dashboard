import React, { useState, useCallback } from "react";
import { debounce } from "../../utils/debounce";

const SearchTransaction = ({ onSearch, searchQuery }) => {
  const [query, setQuery] = useState(searchQuery || ""); 
  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query); // Trigger the search when debounced
    }, 500),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update the local query state
    debouncedSearch(value); // Trigger debounced search function
  };

  return (
    <input
      type="text"
      placeholder="Search transaction"
      value={query} 
      onChange={handleChange} 
    />
  );
};

export default SearchTransaction;
