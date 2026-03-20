import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar/Navbar.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import styles from "./MainLayout.module.css";
import { useData } from "../context/DataContext.jsx";

export default function MainLayout() {
  const { loading, error } = useData();

  return (
    <div className={styles.appRoot}>
      <header className={styles.header}>
        <Navbar />
      </header>

      <main className={styles.main}>
        <div className={styles.searchWrap}>
          <SearchBar />
        </div>

        <section className={styles.content} aria-live="polite">
          {loading ? (
            <div className={styles.loading}>Loading…</div>
          ) : error ? (
            <div className={styles.error}>Error: {error}</div>
          ) : (
            <Outlet />
          )}
        </section>
      </main>
    </div>
  );
}
