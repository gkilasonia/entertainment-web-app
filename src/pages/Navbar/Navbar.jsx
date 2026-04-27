import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logoUrl from "../../assets/logo.svg?url";
import HomeIcon from "../../components/Icons/HomeIcon.jsx";
import MoviesIcon from "../../components/Icons/MovieIcon.jsx";
import TvIcon from "../../components/Icons/TvIcon.jsx";
import BookmarkIcon from "../../components/Icons/BookmarkIcon.jsx";
import avatar from "../../assets/image-avatar.png";

export default function Navbar() {
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
        <NavLink to="/login" className="login-link">
          <img src={avatar} alt="Avatar" className="avatar" />
        </NavLink>
      </div>
    </nav>
  );
}
