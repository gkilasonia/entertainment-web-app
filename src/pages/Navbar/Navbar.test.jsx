import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar.jsx";

test("renders navbar links", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Movies")).toBeInTheDocument();
  expect(screen.getByText("TV Series")).toBeInTheDocument();
  expect(screen.getByText("Bookmarks")).toBeInTheDocument();
});
