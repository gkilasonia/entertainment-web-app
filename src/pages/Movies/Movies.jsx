import styles from "./Movies.module.css";
import { useData } from "../../context/DataContext.jsx";
import MediaGrid from "../../components/MediaGrid/MediaGrid.jsx";

export default function Movies() {
  const { data, toggleBookmark, searchQuery, searchResults } = useData();

  const normalizedQuery = (searchQuery || "").trim();
  const results = searchResults || [];
  const items = (data || []).filter((d) => {
    if (!d || !d.category) return false;
    const cat = String(d.category).toLowerCase();
    return cat === "movie" || cat === "movies" || cat.startsWith("movie");
  });

  if (normalizedQuery) {
    return (
      <section className={styles.movies} aria-label="Search results">
        <h3 className={styles.heading}>Search results</h3>
        <MediaGrid
          items={results}
          styles={styles}
          variant="regular"
          onToggleBookmark={toggleBookmark}
        />
      </section>
    );
  }

  return (
    <section className={styles.movies} aria-label="Movies">
      <h3 className={styles.heading}>Movies</h3>
      <MediaGrid
        items={items}
        styles={styles}
        variant="regular"
        onToggleBookmark={toggleBookmark}
      />
    </section>
  );
}
