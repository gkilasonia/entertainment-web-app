import "./Home.css";
import Trending from "../../components/Trending/Trending.jsx";
import Recommended from "../../components/Recommended/Recommended.jsx";
import { useData } from "../../context/DataContext.jsx";
import MediaGrid from "../../components/MediaGrid/MediaGrid.jsx";
import styles from "../../components/Recommended/Recommended.module.css";

export default function Home() {
  const { searchQuery, searchResults, toggleBookmark } = useData();

  const normalizedQuery = (searchQuery || "").trim();

  if (!normalizedQuery) {
    return (
      <section className="home" aria-label="Home page">
        <Trending />
        <Recommended />
      </section>
    );
  }

  return (
    <section className="home" aria-label="Search results">
      <h2
        className={styles.heading}
      >{`Found ${searchResults.length} results for ‘${searchQuery}’`}</h2>
      <MediaGrid
        items={searchResults}
        styles={styles}
        variant="regular"
        onToggleBookmark={toggleBookmark}
      />
    </section>
  );
}
