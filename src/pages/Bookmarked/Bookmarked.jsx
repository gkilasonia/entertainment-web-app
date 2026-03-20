import styles from "./Bookmarked.module.css";
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

export default function Bookmarked() {
  const { data, toggleBookmark, searchQuery, searchResults } = useData();

  // first filter to only bookmarked items
  const bookmarked = (data || []).filter((d) => d && d.isBookmarked === true);

  const bookmarkedMovies = bookmarked.filter((d) => {
    if (!d || !d.category) return false;
    const cat = String(d.category).toLowerCase();
    return cat === "movie" || cat === "movies" || cat.startsWith("movie");
  });

  const bookmarkedTvSeries = bookmarked.filter((d) => {
    if (!d || !d.category) return false;
    const cat = String(d.category).toLowerCase();
    return cat.includes("tv") || cat.includes("series");
  });

  const normalizedQuery = (searchQuery || "").trim();

  if (normalizedQuery) {
    return (
      <section className={styles.bookmarked} aria-label="Search results">
        <h3
          className={styles.heading}
        >{`Found ${searchResults.length} results for ‘${searchQuery}’`}</h3>
        <div className={styles.grid}>
          {searchResults.map((item, i) => {
            const { title, name, year, category, rating, isBookmarked } = item;
            const slugName = name ? name : slugify(title);

            let imgPath = "";
            try {
              imgPath = new URL(
                `../../assets/thumbnails/${slugName}/regular/small.jpg`,
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

                <div className={styles.movieInfo}>
                  <div className={styles.bookmark}>
                    <button
                      className={styles.btnBookmark}
                      type="button"
                      aria-label={
                        isBookmarked ? "Remove bookmark" : "Add bookmark"
                      }
                      onClick={() => toggleBookmark(title)}
                    >
                      <img
                        src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                        alt={isBookmarked ? "Bookmarked" : "Not bookmarked"}
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
                          alt={category}
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
          {bookmarkedMovies.map((item, i) => {
            const { title, name, year, category, rating, isBookmarked } = item;
            const slugName = name ? name : slugify(title);

            let imgPath = "";
            try {
              imgPath = new URL(
                `../../assets/thumbnails/${slugName}/regular/small.jpg`,
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

                <div className={styles.movieInfo}>
                  <div className={styles.bookmark}>
                    <button
                      className={styles.btnBookmark}
                      type="button"
                      aria-label={
                        isBookmarked ? "Remove bookmark" : "Add bookmark"
                      }
                      onClick={() => toggleBookmark(title)}
                    >
                      <img
                        src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                        alt={isBookmarked ? "Bookmarked" : "Not bookmarked"}
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
                          alt={category}
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
          {bookmarkedTvSeries.map((item, i) => {
            const { title, name, year, category, rating, isBookmarked } = item;
            const slugName = name ? name : slugify(title);

            let imgPath = "";
            try {
              imgPath = new URL(
                `../../assets/thumbnails/${slugName}/regular/medium.jpg`,
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

                <div className={styles.movieInfo}>
                  <div className={styles.bookmark}>
                    <button
                      className={styles.btnBookmark}
                      type="button"
                      aria-label={
                        isBookmarked ? "Remove bookmark" : "Add bookmark"
                      }
                      onClick={() => toggleBookmark(title)}
                    >
                      <img
                        src={isBookmarked ? bookmarkFull : bookmarkEmpty}
                        alt={isBookmarked ? "Bookmarked" : "Not bookmarked"}
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
                          alt={category}
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
