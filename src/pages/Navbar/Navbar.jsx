import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logoUrl from "../../assets/logo.svg?url";
import HomeIcon from "../../components/Icons/HomeIcon.jsx";
import MoviesIcon from "../../components/Icons/MovieIcon.jsx";
import TvIcon from "../../components/Icons/TvIcon.jsx";
import BookmarkIcon from "../../components/Icons/BookmarkIcon.jsx";
import avatar from "../../assets/image-avatar.png";
import { isAuthenticated, clearAuthData } from "../../utils/auth.js";

export default function Navbar() {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  const handleLogout = () => {
    clearAuthData();
    setAuthenticated(false);
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  const handleAvatarClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="logo">
        <NavLink to="/" className="logo-link">
          <span className="sr-only">Entertainment Web App</span>
          <img src={logoUrl} alt="Entertainment logo" className="logo-img" />
        </NavLink>
      </div>

      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <HomeIcon className="nav-icon" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <MoviesIcon className="nav-icon" aria-hidden="true" />
            <span className="sr-only">Movies</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tv-series"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <TvIcon className="nav-icon" aria-hidden="true" />
            <span className="sr-only">TV Series</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <BookmarkIcon className="nav-icon" aria-hidden="true" />
            <span className="sr-only">Bookmarks</span>
          </NavLink>
        </li>
      </ul>

      <div className="nav-actions">
        {authenticated ? (
          <div
            style={{
              position: "relative",
            }}
          >
            <button
              onClick={handleAvatarClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.25rem",
              }}
              aria-label="User menu"
            >
              <img src={avatar} alt="Avatar" className="avatar" />
            </button>
            {isUserMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: "0",
                  backgroundColor: "#161d2f",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "4px",
                  marginTop: "0.5rem",
                  minWidth: "120px",
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: "0.95rem",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="login-link">
            <img src={avatar} alt="Avatar" className="avatar" />
          </NavLink>
        )}
      </div>
    </nav>
  );
}
