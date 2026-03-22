import React from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "../../assets/icon-search.svg";
import { useData } from "../../context/DataContext.jsx";

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useData();

  return (
    <form
      className={styles.searchForm}
      role="search"
      aria-label="Movie search"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="movie-search" className="sr-only">
        Search movies or TV series
      </label>
      <button
        type="submit"
        className={styles.searchButton}
        aria-label="Submit search"
      >
        <img
          src={searchIcon}
          alt=""
          aria-hidden="true"
          className="search-icon"
        />
      </button>
      <input
        id="movie-search"
        name="q"
        type="search"
        className={styles.searchInput}
        placeholder="Search for movies or TV series"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}
