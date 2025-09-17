import React from "react";
function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Buscar personaje..."
      onChange={e => setSearch(e.target.value)}
      style={{ width: "200px", marginBottom: "20px" }}
    />
  );
}
export default SearchBar;
