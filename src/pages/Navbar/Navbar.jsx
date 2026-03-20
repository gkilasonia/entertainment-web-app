import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import home from "../../assets/icon-nav-home.svg?raw";
import movies from "../../assets/icon-nav-movies.svg?raw";
import tvSeries from "../../assets/icon-nav-tv-series.svg?raw";
import bookmark from "../../assets/icon-nav-bookmark.svg?raw";
import avatar from "../../assets/image-avatar.png";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="logo" aria-hidden="false">
        <NavLink to="/" className="logo-link">
          <span className="visually-hidden">Entertainment Web App</span>
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
            <span
              aria-hidden="true"
              className="nav-icon"
              dangerouslySetInnerHTML={{ __html: home }}
            />
            <span className="visually-hidden">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <span
              aria-hidden="true"
              className="nav-icon"
              dangerouslySetInnerHTML={{ __html: movies }}
            />
            <span className="visually-hidden">Movies</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tv-series"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <span
              aria-hidden="true"
              className="nav-icon"
              dangerouslySetInnerHTML={{ __html: tvSeries }}
            />
            <span className="visually-hidden">TV Series</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <span
              aria-hidden="true"
              className="nav-icon"
              dangerouslySetInnerHTML={{ __html: bookmark }}
            />
            <span className="visually-hidden">Bookmarks</span>
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
