import React from "react";
import styles from "./Recommended.module.css";
import { useData } from "../../context/DataContext.jsx";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import iconMovie from "../../assets/icon-category-movie.svg";
import iconTv from "../../assets/icon-category-tv.svg";
import iconPlay from "../../assets/icon-play.svg";

export default function Recommended() {
  const { data, toggleBookmark } = useData();

  function slugify(title) {
    return title
      .toLowerCase()
      .replace(/’/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Only use items that have a `regular` thumbnail and are not trending
  const items = data
    .filter((d) => d.thumbnail && d.thumbnail.regular && !d.isTrending)
    .slice(0, 24);

  return (
    <section className={styles.recommended} aria-label="Recommended content">
      <h3 className={styles.heading}>Recommended for you</h3>
      <div className={styles.grid}>
        {items.map((item, i) => {
          const { title, year, category, rating, isBookmarked } = item;
          const name = item.name ? item.name : slugify(title);

          let imgPath = "";
          try {
            imgPath = new URL(
              `../../assets/thumbnails/${name}/regular/small.jpg`,
              import.meta.url,
            ).href;
          } catch (e) {
            imgPath = "";
          }

          const categoryIcon = category === "Movie" ? iconMovie : iconTv;

          return (
            <article
              key={`${title}-${i}`}
              className={styles.card}
              aria-label={title}
            >
              <div className={styles.poster}>
                <img className={styles.thumbnail} src={imgPath} alt={title} />

                <div className={styles.hoverContainer}>
                  <div className={styles.playButton}>
                    <img
                      className={styles.playIcon}
                      src={iconPlay}
                      alt="Play icon"
                    />{" "}
                    Play
                  </div>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={styles.year}>{year}</span>·
                  <div className={styles.category}>
                    <img
                      className={styles.categoryIcon}
                      src={categoryIcon}
                      alt={category}
                    />
                    <span>{category}</span>
                  </div>
                  ·<span className={styles.rating}>{rating}</span>
                </div>
                <h2 className={styles.cardTitle}>{title}</h2>
              </div>

              <div className={styles.bookmark}>
                <button
                  className={styles.btnBookmark}
                  type="button"
                  aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                  onClick={() => toggleBookmark(title)}
                >
                  <img
                    src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                    alt={isBookmarked ? "Bookmarked" : "Not bookmarked"}
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
