import React, { useRef } from "react";
import styles from "./Trending.module.css";
import { useData } from "../../context/DataContext.jsx";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import iconMovie from "../../assets/icon-category-movie.svg";
import iconTv from "../../assets/icon-category-tv.svg";
import iconPlay from "../../assets/icon-play.svg";
import { slugify, resolveThumbnail } from "../../utils/media.js";
import { useMemo } from "react";

export default function Trending() {
  const listRef = useRef(null);
  const { data, toggleBookmark } = useData();

  const scroll = (dir) => {
    if (!listRef.current) return;
    const width = listRef.current.clientWidth;
    listRef.current.scrollBy({ left: dir * width * 0.8, behavior: "smooth" });
  };

  const items = useMemo(
    () => (data || []).filter((d) => d && d.isTrending === true).slice(0, 8),
    [data],
  );

  return (
    <section
      className={styles.trending}
      aria-label="Trending carousel"
      aria-roledescription="carousel"
    >
      <h2 className={styles.heading} aria-label="trending-heading">
        Trending
      </h2>

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
        {items.map((item) => {
          const name = slugify(item.title);
          const imgPath = resolveThumbnail(name, "trending", "small");

          const categoryIcon = item.category === "Movie" ? iconMovie : iconTv;

          return (
            <article
              key={item.id || item.title}
              className={styles.card}
              aria-label={item.title}
              role="listitem"
            >
              <div className={styles.poster}>
                {imgPath ? (
                  <img
                    className={styles.thumbnail}
                    src={imgPath}
                    alt={item.title}
                  />
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
                    aria-label={`Play ${item.title}`}
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

              <div className={styles.movieInfo}>
                <div className={styles.bookmark}>
                  <button
                    className={styles.btnBookmark}
                    type="button"
                    aria-label={
                      item.isBookmarked ? "Remove bookmark" : "Add bookmark"
                    }
                    aria-pressed={item.isBookmarked}
                    onClick={() => toggleBookmark(item.title)}
                  >
                    <img
                      src={item.isBookmarked ? bookmarkFull : bookmarkEmpty}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div className={styles.info}>
                  <div className={styles.meta}>
                    <span className={styles.year}>{item.year}</span>
                    {" · "}
                    <div className={styles.category}>
                      <img
                        className={styles.categoryIcon}
                        src={categoryIcon}
                        alt=""
                        aria-hidden="true"
                      />
                      <span>{item.category}</span>
                    </div>
                    {" · "}
                    <span className={styles.rating}>{item.rating}</span>
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
