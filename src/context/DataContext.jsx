import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";

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
        if (mounted) setData(json);
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

  const toggleBookmark = (title) => {
    setData((prev) =>
      prev.map((item) =>
        item.title === title
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item,
      ),
    );
  };

  const location = useLocation();

  const normalizedQuery = (searchQuery || "").trim().toLowerCase();

  // First filter by current route (context-aware), then apply text match
  const routeFiltered = useMemo(() => {
    const path = (location && location.pathname) || "/";
    if (!data || data.length === 0) return [];

    // HOME: return all
    if (path === "/" || path === "") return data;

    // MOVIES: paths like /movies
    if (path.startsWith("/movies")) {
      return data.filter(
        (item) => String(item.category).toLowerCase() === "movie",
      );
    }

    // TV SERIES: paths like /tv-series or /tv
    if (path.startsWith("/tv-series") || path.startsWith("/tv")) {
      return data.filter(
        (item) => String(item.category).toLowerCase() === "tv series",
      );
    }

    // BOOKMARKS: paths like /bookmarks or /bookmarked
    if (path.startsWith("/bookmarks") || path.startsWith("/bookmarked")) {
      return data.filter((item) => item.isBookmarked === true);
    }

    // default: return all
    return data;
  }, [data, location.pathname]);

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return (routeFiltered || []).filter((item) =>
      String(item.title || "")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [routeFiltered, normalizedQuery]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        loading,
        error,
        toggleBookmark,
        searchQuery,
        setSearchQuery,
        searchResults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}
