import { useMemo } from "react";
import styles from "./Movies.module.css";
import { useData } from "../../context/DataContext.jsx";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import iconMovie from "../../assets/icon-category-movie.svg";
import iconTv from "../../assets/icon-category-tv.svg";
import iconPlay from "../../assets/icon-play.svg";
import { slugify, resolveThumbnail } from "../../utils/media.js";

export default function Movies() {
  const { data, toggleBookmark, searchQuery, searchResults } = useData();

  const normalizedQuery = (searchQuery || "").trim();
  const results = useMemo(() => searchResults || [], [searchResults]);
  const items = useMemo(
    () =>
      (data || []).filter((d) => {
        if (!d || !d.category) return false;
        const cat = String(d.category).toLowerCase();
        return cat === "movie" || cat === "movies" || cat.startsWith("movie");
      }),
    [data],
  );
  // If searching, show searchResults; otherwise show movies list
  if (normalizedQuery) {
    return (
      <section className={styles.movies} aria-label="Search results">
        <h3 className={styles.heading}>Search results</h3>

        <div className={styles.grid}>
          {results.map((item) => {
            const { title, name, year, category, rating, isBookmarked } = item;
            const slugName = name ? name : slugify(title);

            const imgPath = resolveThumbnail(slugName, "regular", "small");

            const categoryIcon = category === "Movie" ? iconMovie : iconTv;

            return (
              <article
                key={item.id || title}
                className={styles.card}
                aria-label={title}
              >
                <div className={styles.poster}>
                  {imgPath ? (
                    <img
                      className={styles.thumbnail}
                      src={imgPath}
                      alt={title}
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
                      aria-label={`Play ${title}`}
                    >
                      <img
                        className={styles.playIcon}
                        src={iconPlay}
                        alt=""
                        aria-hidden="true"
                      />
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
                        isBookmarked ? "Remove bookmark" : "Add bookmark"
                      }
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
                </div>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  // normal Movies page

  return (
    <section className={styles.movies} aria-label="Movies">
      <h3 className={styles.heading}>Movies</h3>

      <div className={styles.grid}>
        {items.map((item) => {
          const { title, name, year, category, rating, isBookmarked } = item;
          const slugName = name ? name : slugify(title);

          const imgPath = resolveThumbnail(slugName, "regular", "small");

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
                    />
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
                      isBookmarked ? "Remove bookmark" : "Add bookmark"
                    }
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
