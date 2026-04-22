import styles from "./TvSeries.module.css";
import { useData } from "../../context/DataContext.jsx";
import MediaGrid from "../../components/MediaGrid/MediaGrid.jsx";

export default function TvSeries() {
  const { data, toggleBookmark, searchQuery, searchResults } = useData();

  const normalizedQuery = (searchQuery || "").trim();

  if (normalizedQuery) {
    return (
      <section className={styles.tvseries} aria-label="Search results">
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

  const items = (data || []).filter((d) => {
    if (!d || !d.category) return false;
    const cat = String(d.category).toLowerCase();
    return cat.includes("tv") || cat.includes("series");
  });

  return (
    <section className={styles.tvseries} aria-label="TV Series">
      <h3 className={styles.heading}>TV Series</h3>
      <MediaGrid
        items={items}
        styles={styles}
        variant="regular"
        onToggleBookmark={toggleBookmark}
      />
    </section>
  );
}
