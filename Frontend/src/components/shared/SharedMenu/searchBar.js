// SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);  // Trigger the search function passed as a prop
  };

  return (
    <form className="d-flex ms-auto">
      <input
        type="search"
        className="form-control me-2"
        placeholder="Search food items..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </form>
  );
}

export default SearchBar;
