import { useRef } from "react";
import styles from "./Trending.module.css";
import { useData } from "../../context/DataContext.jsx";
import MediaCard from "../MediaCard/MediaCard.jsx";

export default function Trending() {
  const listRef = useRef(null);
  const { data, toggleBookmark } = useData();

  const scroll = (dir) => {
    if (!listRef.current) return;
    const width = listRef.current.clientWidth;
    listRef.current.scrollBy({ left: dir * width * 0.8, behavior: "smooth" });
  };

  const items = (data || [])
    .filter((d) => d && d.isTrending === true)
    .slice(0, 8);

  return (
    <section
      className={styles.trending}
      aria-label="Trending carousel"
      aria-roledescription="carousel"
    >
      <h2 className={styles.heading}>Trending</h2>

      <div className={styles.controls}>
        <button
          type="button"
          aria-label="Previous items"
          onClick={() => scroll(-1)}
          className={styles.prevButton}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next items"
          onClick={() => scroll(1)}
          className={styles.nextButton}
        >
          ›
        </button>
      </div>

      <div
        id="trending-track"
        className={styles.track}
        ref={listRef}
        tabIndex={0}
        role="list"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") scroll(-1);
          if (e.key === "ArrowRight") scroll(1);
        }}
      >
        {items.map((item) => (
          <div key={item.id || item.title} role="listitem">
            <MediaCard
              item={item}
              styles={styles}
              variant="trending"
              onToggleBookmark={toggleBookmark}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
