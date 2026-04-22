import MediaCard from "../MediaCard/MediaCard.jsx";

export default function MediaGrid({
  items = [],
  styles = {},
  variant = "regular",
  onToggleBookmark = () => {},
}) {
  return (
    <div className={styles.grid}>
      {items.map((it) => (
        <MediaCard
          key={it.id || it.title}
          item={it}
          styles={styles}
          variant={variant}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
}
