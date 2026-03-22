import React, { useMemo } from "react";
import styles from "./Recommended.module.css";
import { useData } from "../../context/DataContext.jsx";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import iconMovie from "../../assets/icon-category-movie.svg";
import iconTv from "../../assets/icon-category-tv.svg";
import iconPlay from "../../assets/icon-play.svg";
import { slugify, resolveThumbnail } from "../../utils/media.js";

export default function Recommended() {
  const { data, toggleBookmark } = useData();

  // Only use items that have a `regular` thumbnail and are not trending
  const items = useMemo(
    () =>
      (data || [])
        .filter((d) => d && d.thumbnail && d.thumbnail.regular && !d.isTrending)
        .slice(0, 24),
    [data],
  );

  return (
    <section className={styles.recommended} aria-label="Recommended content">
      <h3 className={styles.heading}>Recommended for you</h3>
      <div className={styles.grid}>
        {items.map((item, i) => {
          const { title, year, category, rating, isBookmarked } = item;
          const name = item.name ? item.name : slugify(title);
          const imgPath = resolveThumbnail(name, "regular", "small");

          const categoryIcon = category === "Movie" ? iconMovie : iconTv;

          return (
            <article
              key={item.id || title}
              className={styles.card}
              aria-label={title}
            >
              <div className={styles.poster}>
                {imgPath ? (
                  <img className={styles.thumbnail} src={imgPath} alt={title} />
                ) : (
                  <div
                    className={styles.thumbnailPlaceholder}
                    aria-hidden="true"
                  />
                )}

                <div className={styles.hoverContainer}>
                  <button
                    type="button"
                    className={styles.playButton}
                    aria-label={`Play ${title}`}
                  >
                    <img
                      className={styles.playIcon}
                      src={iconPlay}
                      alt=""
                      aria-hidden="true"
                    />{" "}
                    <span className={styles.playText}>Play</span>
                  </button>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={styles.year}>{year}</span>
                  {" · "}
                  <div className={styles.category}>
                    <img
                      className={styles.categoryIcon}
                      src={categoryIcon}
                      alt=""
                      aria-hidden="true"
                    />
                    <span>{category}</span>
                  </div>
                  {" · "}
                  <span className={styles.rating}>{rating}</span>
                </div>
                <h2 className={styles.cardTitle}>{title}</h2>
              </div>

              <div className={styles.bookmark}>
                <button
                  className={styles.btnBookmark}
                  type="button"
                  aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                  aria-pressed={isBookmarked}
                  onClick={() => toggleBookmark(title)}
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
        })}
      </div>
    </section>
  );
}
