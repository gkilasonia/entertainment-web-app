import "./Home.css";
import Trending from "../../components/Trending/Trending.jsx";
import Recommended from "../../components/Recommended/Recommended.jsx";
import { useData } from "../../context/DataContext.jsx";
import bookmarkFull from "../../assets/icon-bookmark-full.svg";
import bookmarkEmpty from "../../assets/icon-bookmark-empty.svg";
import iconMovie from "../../assets/icon-category-movie.svg";
import iconTv from "../../assets/icon-category-tv.svg";
import styles from "../../components/Recommended/Recommended.module.css";

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/’/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
      <h2 className={styles.heading}>{`Found ${searchResults.length} results for ‘${searchQuery}’`}</h2>
      <div className={styles.grid}>
        {searchResults.map((item, i) => {
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
            <article key={`${title}-${i}`} className={styles.card} aria-label={title}>
              <div className={styles.poster}>
                <img className={styles.thumbnail} src={imgPath} alt={title} />
              </div>

              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={styles.year}>{year}</span>·
                  <div className={styles.category}>
                    <img className={styles.categoryIcon} src={categoryIcon} alt={category} />
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
                  <img src={isBookmarked ? bookmarkFull : bookmarkEmpty} alt={isBookmarked ? "Bookmarked" : "Not bookmarked"} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
