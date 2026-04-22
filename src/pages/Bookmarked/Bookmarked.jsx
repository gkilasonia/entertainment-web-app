import styles from "./Bookmarked.module.css";
import { useData } from "../../context/DataContext.jsx";
import MediaGrid from "../../components/MediaGrid/MediaGrid.jsx";

export default function Bookmarked() {
  const { data, toggleBookmark, searchQuery, searchResults } = useData();

  const bookmarked = (data || []).filter((d) => d && d.isBookmarked === true);

  const bookmarkedMovies = bookmarked.filter((d) => {
    if (!d || !d.category) return false;
    const cat = String(d.category).toLowerCase();
    return cat === "movie" || cat === "movies" || cat.startsWith("movie");
  });

  const bookmarkedTvSeries = bookmarked.filter((d) => {
    if (!d || !d.category) return false;
    const cat = String(d.category).toLowerCase();
    return cat.includes("tv") || cat.includes("series");
  });

  const normalizedQuery = (searchQuery || "").trim();

  if (normalizedQuery) {
    return (
      <section className={styles.bookmarked} aria-label="Search results">
        <h3
          className={styles.heading}
        >{`Found ${searchResults.length} results for ‘${searchQuery}’`}</h3>
        <MediaGrid
          items={searchResults}
          styles={styles}
          variant="regular"
          onToggleBookmark={toggleBookmark}
        />
      </section>
    );
  }

  return (
    <div className={styles.bookmarkedContainer}>
      <section className={styles.bookmarked} aria-label="Bookmarked Movies">
        <h3 className={styles.heading}>Bookmarked Movies</h3>
        <MediaGrid
          items={bookmarkedMovies}
          styles={styles}
          variant="regular"
          onToggleBookmark={toggleBookmark}
        />
      </section>

      <section className={styles.bookmarked} aria-label="Bookmarked TV Series">
        <h3 className={styles.heading}>Bookmarked TV Series</h3>
        <MediaGrid
          items={bookmarkedTvSeries}
          styles={styles}
          variant="regular"
          onToggleBookmark={toggleBookmark}
        />
      </section>
    </div>
  );
}
