export const sanitizeUrl = (url) => {
  if (typeof url !== "string") return "#";
  const trimmedUrl = url.trim();
  if (trimmedUrl === "") return "#";
  try {
    // URL relative paths can be supported by providing a base url
    const parsed = new URL(trimmedUrl, "https://example.com");
    if (["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol)) {
      return trimmedUrl;
    }
  } catch {
    return "#";
  }
  return "#";
};
