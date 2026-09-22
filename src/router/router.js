import { renderHome } from "../views/homeView.js";

import { renderChat } from "../views/chatView.js";

import { renderAbout } from "../views/aboutView.js";

import { renderNotFound } from "../views/notFoundView.js";

import { normalizePath } from "../utils/utils.js";

import { getNavigationLockState } from "../state/appState.js";

import { handleCharacterSelection } from "../events/characterEvents.js";

export function createRouter(app) {
  function handleCharacterSelected(character) {
    handleCharacterSelection(character, navigateTo);
  }

  const routes = {
    "/": () => renderHome(app, handleCharacterSelected),

    "/home": () => renderHome(app, handleCharacterSelected),

    "/chat": () => renderChat(app),

    "/about": () => renderAbout(app),
  };

  function updateActiveNavigation(path) {
    const currentPath = normalizePath(path);

    const links = document.querySelectorAll(".site-nav__link");

    links.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      const linkPath = normalizePath(
        new URL(href, window.location.href).pathname,
      );

      const isHome =
        (currentPath === "/" || currentPath === "/home") &&
        (linkPath === "/" || linkPath === "/home");

      link.classList.toggle(
        "site-nav__link--active",
        isHome || linkPath === currentPath,
      );
    });
  }

  function router() {
    const path = normalizePath(window.location.pathname);

    const { isLocked } = getNavigationLockState();

    if (isLocked) {
      return;
    }

    const render = routes[path];

    if (render) {
      render();
    } else {
      renderNotFound(app);
    }

    updateActiveNavigation(path);
  }

  function navigateTo(path) {
    const normalizedPath = normalizePath(path);

    const currentPath = normalizePath(window.location.pathname);

    const { isLocked } = getNavigationLockState();

    if (isLocked) {
      return;
    }

    if (normalizedPath === currentPath) {
      return;
    }

    window.history.pushState({}, "", normalizedPath);

    router();
  }

  return {
    router,
    navigateTo,
  };
}
