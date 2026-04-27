import stylesLocal from "./MediaCard.module.css";
import bookmarkFull from "../../assets/icon-bookmark-full.svg?url";
import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg?url";
import iconMovie from "../../assets/icon-category-movie.svg?url";
import iconTv from "../../assets/icon-category-tv.svg?url";
import iconPlay from "../../assets/icon-play.svg?url";

export default function MediaCard({
  item,
  variant = "regular",
  styles = {},
  onToggleBookmark = () => {},
}) {
  const title = item.title || item.name || "";
  const year = item.year;
  const category = item.category;
  const rating = item.rating;
  const isBookmarked = !!item.isBookmarked;

  const imgPath =
    (item.thumbnail &&
      ((item.thumbnail[variant] && item.thumbnail[variant].small) ||
        (item.thumbnail.regular && item.thumbnail.regular.small))) ||
    null;

  const categoryIcon = category === "Movie" ? iconMovie : iconTv;

  const s = styles || {};
  // fallback to local module if caller doesn't provide styles
  const css = Object.keys(s).length ? s : stylesLocal;

  return (
    <article key={item.id || title} className={css.card} aria-label={title}>
      <div className={css.poster}>
        {imgPath ? (
          <img
            className={css.thumbnail}
            src={imgPath}
            alt={title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={css.thumbnailPlaceholder} aria-hidden="true" />
        )}

        <div className={css.hoverContainer}>
          <button
            type="button"
            className={css.playButton}
            aria-label={`Play ${title}`}
          >
            <img
              className={css.playIcon}
              src={iconPlay}
              alt=""
              aria-hidden="true"
            />
            <span className={css.playText}>Play</span>
          </button>
        </div>
      </div>

      <div className={css.info}>
        <div className={css.meta}>
          <span className={css.year}>{year}</span>
          {" · "}
          <div className={css.category}>
            <img
              className={css.categoryIcon}
              src={categoryIcon}
              alt=""
              aria-hidden="true"
            />
            <span>{category}</span>
          </div>
          {" · "}
          <span className={css.rating}>{rating}</span>
        </div>
        <h3 className={css.cardTitle}>{title}</h3>
      </div>

      <div className={css.bookmark}>
        <button
          className={css.btnBookmark}
          type="button"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          aria-pressed={isBookmarked}
          onClick={() => onToggleBookmark(item.id)}
        >
          <img
            src={isBookmarked ? bookmarkFull : bookmarkEmpty}
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
    </article>
  );
}
