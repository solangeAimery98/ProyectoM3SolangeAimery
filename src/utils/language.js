const DEFAULT_LANGUAGE = "es";

const SUPPORTED_LANGUAGES = ["es", "en"];

let currentLanguage =
  localStorage.getItem("arcana-language") || DEFAULT_LANGUAGE;

if (!SUPPORTED_LANGUAGES.includes(currentLanguage)) {
  currentLanguage = DEFAULT_LANGUAGE;
}

export function getLanguage() {
  return currentLanguage;
}

export function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return;
  }

  currentLanguage = language;

  localStorage.setItem("arcana-language", language);

  window.dispatchEvent(
    new CustomEvent("arcana-language-change", {
      detail: {
        language,
      },
    }),
  );
}

export function getLocalizedValue(value) {
  if (!value) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value[currentLanguage] || value[DEFAULT_LANGUAGE] || "";
}
