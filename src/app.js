import { createRouter } from "./router/router.js";

import {
  setupLinkInterception,
  setupPopState,
} from "./events/navigationEvents.js";

const app = document.querySelector("#app");

const { router, navigateTo } = createRouter(app);

function initializeApp() {
  setupLinkInterception(navigateTo);

  setupPopState(router);

  router();
}

initializeApp();
