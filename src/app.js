import { createRouter } from "./router/router.js";

import {
  setupLinkInterception,
  setupPopState,
} from "./events/navigationEvents.js";

import { setLanguage, getLanguage } from "./utils/language.js";

const app = document.querySelector("#app");

const { router, navigateTo } = createRouter(app);

const navTranslations = {
  es: {
    characters: "Personajes",
    about: "Sobre Arcana",
  },

  en: {
    characters: "Characters",
    about: "About Arcana",
  },
};

function updateNavigation(language) {
  const translations = navTranslations[language];

  if (!translations) {
    return;
  }

  document.querySelectorAll("[data-nav-text]").forEach((element) => {
    const key = element.dataset.navText;

    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
}

function updateLanguageButtons(language) {
  const languageButtons = document.querySelectorAll(
    ".language-switcher__button",
  );

  languageButtons.forEach((button) => {
    button.classList.toggle(
      "language-switcher__button--active",
      button.dataset.language === language,
    );
  });
}

function setupLanguageSelector() {
  const languageButtons = document.querySelectorAll(
    ".language-switcher__button",
  );

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;

      setLanguage(language);
    });
  });

  updateLanguageButtons(getLanguage());
  updateNavigation(getLanguage());

  window.addEventListener("arcana-language-change", (event) => {
    const language = event.detail.language;

    updateLanguageButtons(language);
    updateNavigation(language);

    router();
  });
}

function initializeApp() {
  setupLinkInterception(navigateTo);

  setupPopState(router);

  setupLanguageSelector();

  router();
}

initializeApp();
