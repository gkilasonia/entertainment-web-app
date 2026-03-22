export function slugify(title) {
  if (!title) return "";
  return String(title)
    .toLowerCase()
    .replace(/’/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function resolveThumbnail(name, folder = "regular", size = "small") {
  if (!name) return null;
  try {
    // utils is in src/utils; assets are in src/assets — use one-level up
    return new URL(
      `../assets/thumbnails/${name}/${folder}/${size}.jpg`,
      import.meta.url,
    ).href;
  } catch (e) {
    return null;
  }
}
