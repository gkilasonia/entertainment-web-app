/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { slugify } from "../utils/media.js";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    const url = new URL("../data/data.json", import.meta.url);

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load data: ${res.status}`);
        const json = await res.json();
        // Ensure each item has a stable `id` and resolve thumbnail URLs
        const base = new URL("../data/data.json", import.meta.url);
        // root points to src/ so that ./assets/... in data.json resolves to src/assets/...
        const srcRoot = new URL("../", base);
        const withIds = (json || []).map((it, idx) => {
          const id = it.id || slugify(it.title) || `item-${idx}`;
          // Normalize thumbnail paths to absolute URLs so components can use them directly
          const thumbnail =
            it.thumbnail && typeof it.thumbnail === "object"
              ? Object.keys(it.thumbnail).reduce((acc, view) => {
                  acc[view] = Object.keys(it.thumbnail[view] || {}).reduce(
                    (sizes, sizeKey) => {
                      try {
                        sizes[sizeKey] = new URL(
                          it.thumbnail[view][sizeKey],
                          srcRoot,
                        ).href;
                      } catch {
                        sizes[sizeKey] = null;
                      }
                      return sizes;
                    },
                    {},
                  );
                  return acc;
                }, {})
              : it.thumbnail;

          return { ...it, id, thumbnail };
        });

        // If user has saved bookmarks in localStorage, apply them
        const stored = (() => {
          try {
            const raw = localStorage.getItem("bookmarkedIds");
            return raw ? JSON.parse(raw) : null;
          } catch {
            return null;
          }
        })();

        if (mounted) {
          if (Array.isArray(stored) && stored.length > 0) {
            const merged = withIds.map((it) => ({
              ...it,
              isBookmarked: stored.includes(it.id) ? true : !!it.isBookmarked,
            }));
            setData(merged);
          } else {
            setData(withIds);
          }
        }
      } catch (err) {
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  function toggleBookmark(idOrTitle) {
    setData((prev) => {
      const next = (prev || []).map((item) => {
        const match =
          item.id === idOrTitle ||
          item.title === idOrTitle ||
          String(item.id) === String(idOrTitle);
        return match ? { ...item, isBookmarked: !item.isBookmarked } : item;
      });

      // Persist bookmarked ids to localStorage
      try {
        const bookmarkedIds = next
          .filter((it) => it.isBookmarked)
          .map((it) => it.id);
        localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
      } catch {}

      return next;
    });
  }

  const location = useLocation();
  const normalizedQuery = (searchQuery || "").trim().toLowerCase();

  // First filter by current route (context-aware), then apply text match
  const path = (location && location.pathname) || "/";
  let routeFiltered = [];
  if (!data || data.length === 0) routeFiltered = [];
  else if (path === "/" || path === "") routeFiltered = data;
  else if (path.startsWith("/movies"))
    routeFiltered = data.filter((item) =>
      String(item.category).toLowerCase().includes("movie"),
    );
  else if (path.startsWith("/tv-series") || path.startsWith("/tv"))
    routeFiltered = data.filter((item) =>
      String(item.category).toLowerCase().includes("tv"),
    );
  else if (path.startsWith("/bookmarks") || path.startsWith("/bookmarked"))
    routeFiltered = data.filter((item) => item.isBookmarked === true);
  else routeFiltered = data;

  const searchResults = (() => {
    if (!normalizedQuery) return [];
    return (routeFiltered || []).filter((item) =>
      String(item.title || "")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  })();

  const value = {
    data,
    setData,
    loading,
    error,
    toggleBookmark,
    searchQuery,
    setSearchQuery,
    searchResults,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}
