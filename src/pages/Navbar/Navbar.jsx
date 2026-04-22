import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import home from "../../assets/icon-nav-home.svg";
import movies from "../../assets/icon-nav-movies.svg";
import tvSeries from "../../assets/icon-nav-tv-series.svg";
import bookmark from "../../assets/icon-nav-bookmark.svg";
import avatar from "../../assets/image-avatar.png";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="logo">
        <NavLink to="/" className="logo-link">
          <span className="sr-only">Entertainment Web App</span>
          <img src={logo} alt="Entertainment logo" className="logo-img" />
        </NavLink>
      </div>

      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <img src={home} className="nav-icon" aria-hidden="true" alt="" />
            <span className="sr-only">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <img src={movies} className="nav-icon" aria-hidden="true" alt="" />
            <span className="sr-only">Movies</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tv-series"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <img
              src={tvSeries}
              className="nav-icon"
              aria-hidden="true"
              alt=""
            />
            <span className="sr-only">TV Series</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <img
              src={bookmark}
              className="nav-icon"
              aria-hidden="true"
              alt=""
            />
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
