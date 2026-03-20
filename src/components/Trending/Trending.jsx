import React, { useRef } from "react";
import styles from "./Trending.module.css";
import { useData } from "../../context/DataContext.jsx";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import iconMovie from "../../assets/icon-category-movie.svg";
import iconTv from "../../assets/icon-category-tv.svg";
import iconPlay from "../../assets/icon-play.svg";

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/’/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Trending() {
  const listRef = useRef(null);
  const { data, toggleBookmark } = useData();

  const scroll = (dir) => {
    if (!listRef.current) return;
    const width = listRef.current.clientWidth;
    listRef.current.scrollBy({ left: dir * width * 0.8, behavior: "smooth" });
  };

  const items = data.filter((d) => d.isTrending === true).slice(0, 8);

  return (
    <section className={styles.trending} aria-label="Trending carousel">
      <h2 className={styles.heading} aria-label="trending-heading">
        Trending
      </h2>
      <div className={styles.track} ref={listRef} tabIndex={0}>
        {items.map((item, i) => {
          const name = slugify(item.title);
          // prefer trending.large if available in data, otherwise construct path
          let imgPath;
          try {
            imgPath = new URL(
              `../../assets/thumbnails/${name}/trending/small.jpg`,
              import.meta.url,
            ).href;
          } catch (e) {
            imgPath = "";
          }

          const categoryIcon = item.category === "Movie" ? iconMovie : iconTv;

          return (
            <article
              key={`${item.title}-${i}`}
              className={styles.card}
              aria-label={item.title}
            >
              <div className={styles.poster}>
                <img
                  className={styles.thumbnail}
                  src={imgPath}
                  alt={item.title}
                />

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

              <div className={styles.movieInfo}>
                <div className={styles.bookmark}>
                  <button
                    className={styles.btnBookmark}
                    type="button"
                    aria-label={
                      item.isBookmarked ? "Remove bookmark" : "Add bookmark"
                    }
                    onClick={() => toggleBookmark(item.title)}
                  >
                    <img
                      src={item.isBookmarked ? bookmarkFull : bookmarkEmpty}
                      alt={item.isBookmarked ? "Bookmarked" : "Not bookmarked"}
                    />
                  </button>
                </div>

                <div className={styles.info}>
                  <div className={styles.meta}>
                    <span className={styles.year}>{item.year}</span>·
                    <div className={styles.category}>
                      <img
                        className={styles.categoryIcon}
                        src={categoryIcon}
                        alt={item.category}
                      />
                      <span>{item.category}</span>
                    </div>
                    ·<span className={styles.rating}>{item.rating}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{item.title}</h2>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
