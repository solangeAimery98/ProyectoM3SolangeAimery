import { getNavigationLockState } from "../state/appState.js";

export function setupLinkInterception(navigateTo) {
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    const link = event.target.closest("a");

    if (!link) {
      return;
    }

    if (link.target === "_blank") {
      return;
    }

    if (link.hasAttribute("download")) {
      return;
    }

    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      return;
    }

    const url = new URL(href, window.location.href);

    if (url.origin !== window.location.origin) {
      return;
    }

    event.preventDefault();

    const { isLocked } = getNavigationLockState();

    if (isLocked) {
      return;
    }

    navigateTo(url.pathname);
  });
}

export function setupPopState(router) {
  window.addEventListener("popstate", () => {
    const { isLocked } = getNavigationLockState();

    if (isLocked) {
      return;
    }

    router();
  });
}
