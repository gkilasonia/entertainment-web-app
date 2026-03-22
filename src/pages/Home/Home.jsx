import "./Home.css";
import Trending from "../../components/Trending/Trending.jsx";
import Recommended from "../../components/Recommended/Recommended.jsx";
import { useData } from "../../context/DataContext.jsx";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import iconMovie from "../../assets/icon-category-movie.svg";
import iconTv from "../../assets/icon-category-tv.svg";
import styles from "../../components/Recommended/Recommended.module.css";
import { slugify, resolveThumbnail } from "../../utils/media.js";

export default function Home() {
  const { searchQuery, searchResults, toggleBookmark } = useData();

  const normalizedQuery = (searchQuery || "").trim();

  if (!normalizedQuery) {
    return (
      <section className="home" aria-label="Home page">
        <Trending />
        <Recommended />
      </section>
    );
  }

  return (
    <section className="home" aria-label="Search results">
      <h2
        className={styles.heading}
      >{`Found ${searchResults.length} results for ‘${searchQuery}’`}</h2>
      <div className={styles.grid}>
        {searchResults.map((item) => {
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
