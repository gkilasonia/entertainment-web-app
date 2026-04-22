import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MediaCard from "./MediaCard.jsx";

const sample = {
  id: "1",
  title: "Test Movie",
  year: 2020,
  category: "Movie",
  rating: "PG",
  isBookmarked: false,
  thumbnail: {
    regular: { small: "/test-small.jpg" },
  },
};

test("renders MediaCard and responds to bookmark", async () => {
  const onToggle = vi.fn();
  render(<MediaCard item={sample} onToggleBookmark={onToggle} />);

  expect(screen.getByText("Test Movie")).toBeInTheDocument();
  const btn = screen.getByRole("button", { name: /Add bookmark/i });
  fireEvent.click(btn);
  expect(onToggle).toHaveBeenCalledWith("1");
});
