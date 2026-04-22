import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const rootEl = document.getElementById("root");

if (!rootEl) {
  // eslint-disable-next-line no-console
  console.error("Root element not found: #root");
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <DataProvider>
            <App />
          </DataProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>,
  );
}
