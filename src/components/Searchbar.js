//Styles
import "./Searchbar.css";

import React from "react";
import { useHistory } from "react-router-dom";
import useSearch from "../hooks/useSearch";

export default function Searchbar() {
  const { term, setTerm } = useSearch();
  const history = useHistory();

  let handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?q=${term}`);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          required
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
      </form>
    </div>
  );
}
