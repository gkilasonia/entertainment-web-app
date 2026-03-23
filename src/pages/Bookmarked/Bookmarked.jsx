import styles from "./Bookmarked.module.css";
import { useMemo } from "react";
import { useData } from "../../context/DataContext.jsx";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import iconMovie from "../../assets/icon-category-movie.svg";
import iconTv from "../../assets/icon-category-tv.svg";
import iconPlay from "../../assets/icon-play.svg";
import { slugify, resolveThumbnail } from "../../utils/media.js";

export default function Bookmarked() {
  const { data, toggleBookmark, searchQuery, searchResults } = useData();

  // first filter to only bookmarked items
  const bookmarked = useMemo(
    () => (data || []).filter((d) => d && d.isBookmarked === true),
    [data],
  );

  const bookmarkedMovies = useMemo(
    () =>
      bookmarked.filter((d) => {
        if (!d || !d.category) return false;
        const cat = String(d.category).toLowerCase();
        return cat === "movie" || cat === "movies" || cat.startsWith("movie");
      }),
    [bookmarked],
  );

  const bookmarkedTvSeries = useMemo(
    () =>
      bookmarked.filter((d) => {
        if (!d || !d.category) return false;
        const cat = String(d.category).toLowerCase();
        return cat.includes("tv") || cat.includes("series");
      }),
    [bookmarked],
  );

  const normalizedQuery = (searchQuery || "").trim();

  if (normalizedQuery) {
    return (
      <section className={styles.bookmarked} aria-label="Search results">
        <h3
          className={styles.heading}
        >{`Found ${searchResults.length} results for ‘${searchQuery}’`}</h3>
        <div className={styles.grid}>
          {searchResults.map((item) => {
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
                      <span className={styles.year}>{year}</span>·
                      <div className={styles.category}>
                        <img
                          className={styles.categoryIcon}
                          src={categoryIcon}
                          alt=""
                          aria-hidden="true"
                        />
                        <span>{category}</span>
                      </div>
                      ·<span className={styles.rating}>{rating}</span>
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

  return (
    <div className={styles.bookmarkedContainer}>
      <section className={styles.bookmarked} aria-label="Bookmarked Movies">
        <h3 className={styles.heading}>Bookmarked Movies</h3>
        <div className={styles.grid}>
          {bookmarkedMovies.map((item) => {
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
                      <span className={styles.year}>{year}</span>·
                      <div className={styles.category}>
                        <img
                          className={styles.categoryIcon}
                          src={categoryIcon}
                          alt=""
                          aria-hidden="true"
                        />
                        <span>{category}</span>
                      </div>
                      ·<span className={styles.rating}>{rating}</span>
                    </div>
                    <h2 className={styles.cardTitle}>{title}</h2>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.bookmarked} aria-label="Bookmarked TV Series">
        <h3 className={styles.heading}>Bookmarked TV Series</h3>
        <div className={styles.grid}>
          {bookmarkedTvSeries.map((item) => {
            const { title, name, year, category, rating, isBookmarked } = item;
            const slugName = name ? name : slugify(title);

            const imgPath = resolveThumbnail(slugName, "regular", "medium");

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
                      <span className={styles.year}>{year}</span>·
                      <div className={styles.category}>
                        <img
                          className={styles.categoryIcon}
                          src={categoryIcon}
                          alt=""
                          aria-hidden="true"
                        />
                        <span>{category}</span>
                      </div>
                      ·<span className={styles.rating}>{rating}</span>
                    </div>
                    <h2 className={styles.cardTitle}>{title}</h2>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
