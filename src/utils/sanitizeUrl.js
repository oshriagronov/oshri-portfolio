export const sanitizeUrl = (url) => {
  if (typeof url !== "string" || !url) return url;

  // Remove leading and trailing whitespaces and control characters
  const trimmedUrl = url.trim();

  // Try to parse the URL
  try {
    // We use a dummy base URL to handle relative URLs
    const parsedUrl = new URL(trimmedUrl, "http://dummy.com");
    // Check if the protocol is an allowed protocol
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return undefined;
    }
  } catch {
    // If it fails to parse, it might be heavily obfuscated or invalid. It's safer to block it.
    // E.g. `javascript:alert(1)` will parse successfully with `dummy.com` as base if `javascript:` was not recognized as protocol,
    // but the URL constructor correctly recognizes `javascript:` as a protocol, even relative.
    return undefined;
  }

  return trimmedUrl;
};
