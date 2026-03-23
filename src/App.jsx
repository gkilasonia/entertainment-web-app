import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Movies from "./pages/Movies/Movies.jsx";
import TvSeries from "./pages/TvSeries/TvSeries.jsx";
import Bookmarked from "./pages/Bookmarked/Bookmarked.jsx";
import LoginSignup from "./pages/LoginSignup/LoginSignup.jsx";

function App() {
  // NOTE: Removed unconditional redirect on mount so direct navigation works.
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
