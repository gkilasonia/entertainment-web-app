import styles from "./Recommended.module.css";
import { useData } from "../../context/DataContext.jsx";
import MediaGrid from "../MediaGrid/MediaGrid.jsx";

export default function Recommended() {
  const { data, toggleBookmark } = useData();

  const items = (data || [])
    .filter((d) => d && d.thumbnail && d.thumbnail.regular && !d.isTrending)
    .slice(0, 24);

  return (
    <section className={styles.recommended} aria-label="Recommended content">
      <h3 className={styles.heading}>Recommended for you</h3>
      <MediaGrid
        items={items}
        styles={styles}
        variant="regular"
        onToggleBookmark={toggleBookmark}
      />
    </section>
  );
}
