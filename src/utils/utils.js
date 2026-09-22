export function normalizePath(path) {
  if (!path) {
    return "/";
  }

  const normalizedPath = path.replace(/\/+$/, "");

  if (normalizedPath === "/src" || normalizedPath === "/src/index.html") {
    return "/";
  }

  return normalizedPath || "/";
}

export function parseStorageJSON(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
