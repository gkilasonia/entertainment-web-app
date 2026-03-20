import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Movies from "./pages/Movies/Movies.jsx";
import TvSeries from "./pages/TvSeries/TvSeries.jsx";
import Bookmarked from "./pages/Bookmarked/Bookmarked.jsx";
import LoginSignup from "./pages/LoginSignup/LoginSignup.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ensure app opens at the main layout on first load.
  // This runs only once when the App mounts and redirects to `/` if the
  // user landed on another route (e.g. dev server opened `/login`).
  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Routes>
      {/* Login sits outside the main layout so it replaces the whole UI */}
      <Route path="/login" element={<LoginSignup />} />

      {/* Main layout contains Navbar + SearchBar and renders pages via Outlet */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tv-series" element={<TvSeries />} />
        <Route path="bookmarks" element={<Bookmarked />} />
      </Route>
    </Routes>
  );
}

export default App;
