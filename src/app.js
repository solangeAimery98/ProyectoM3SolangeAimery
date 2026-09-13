import { renderMessage } from "./chat.js";

const app = document.querySelector("#app");

const routes = {
  "/": renderHome,
  "/home": renderHome,
  "/chat": renderChat,
  "/about": renderAbout,
};

const messages = [
  {
    role: "snape",
    content: "¿Qué desea?",
  },
  {
    role: "user",
    content: "Quería hablar contigo, profesor.",
  },
  {
    role: "snape",
    content: "Entonces hable. No tengo toda la noche.",
  },
];

function normalizePath(path) {
  if (!path) {
    return "/";
  }

  let normalizedPath = path.replace(/\/+$/, "");

  if (normalizedPath === "/src" || normalizedPath === "/src/index.html") {
    return "/";
  }

  return normalizedPath || "/";
}

function renderHome() {
  app.innerHTML = `
    <section class="character-selection">

      <div class="selection-heading">

        <div class="selection-ornament" aria-hidden="true">
          <span></span>
          <span>✦</span>
          <span></span>
        </div>

        <p class="selection-overline">
          THE WIZARDING WORLD
        </p>

        <h1>
          Chateá con tu<br />
          personaje favorito
        </h1>

        <p class="selection-description">
          Elegí una personalidad y comenzá una conversación.
          Cada personaje tiene su propia voz, historia y manera
          de responder.
        </p>

      </div>

      <div class="character-grid">

        <!-- =====================================
             SEVERUS SNAPE
             ===================================== -->

        <button
          class="character-card character-card--active"
          type="button"
          data-character="snape"
          aria-label="Chatear con Severus Snape"
        >

          <div class="character-card__portrait">

            <img
              src="/src/assets/img/snape-avatar.jpeg"
              alt="Severus Snape"
            />

            <div class="character-card__portrait-shine"></div>

          </div>

          <div class="character-card__content">

            <p class="character-card__label">
              AVAILABLE NOW
            </p>

            <h2>
              Severus Snape
            </h2>

            <p class="character-card__role">
              Professor of Potions
            </p>

            <div
              class="character-card__divider"
              aria-hidden="true"
            >
              <span></span>
              <span>◆</span>
              <span></span>
            </div>

            <p class="character-card__description">
              El maestro de Pociones te espera.
            </p>

            <span class="character-card__cta">
              Entrar a la conversación
              <span>↗</span>
            </span>

          </div>

          <span
            class="character-card__corner character-card__corner--tl"
          ></span>

          <span
            class="character-card__corner character-card__corner--tr"
          ></span>

          <span
            class="character-card__corner character-card__corner--bl"
          ></span>

          <span
            class="character-card__corner character-card__corner--br"
          ></span>

        </button>


        <!-- =====================================
             LORD VOLDEMORT
             ===================================== -->

        <button
          class="character-card character-card--active"
          type="button"
          data-character="voldemort"
          aria-label="Chatear con Lord Voldemort"
        >

          <div class="character-card__portrait">

            <img
              src="/src/assets/img/voldemort.jpeg"
              alt="Lord Voldemort"
            />

            <div class="character-card__portrait-shine"></div>

          </div>

          <div class="character-card__content">

            <p class="character-card__label">
              AVAILABLE NOW
            </p>

            <h2>
              Lord Voldemort
            </h2>

            <p class="character-card__role">
              The Dark Lord
            </p>

            <div
              class="character-card__divider"
              aria-hidden="true"
            >
              <span></span>
              <span>◆</span>
              <span></span>
            </div>

            <p class="character-card__description">
              El Señor Tenebroso está dispuesto a hablar.
            </p>

            <span class="character-card__cta">
              Entrar a la conversación
              <span>↗</span>
            </span>

          </div>

          <span
            class="character-card__corner character-card__corner--tl"
          ></span>

          <span
            class="character-card__corner character-card__corner--tr"
          ></span>

          <span
            class="character-card__corner character-card__corner--bl"
          ></span>

          <span
            class="character-card__corner character-card__corner--br"
          ></span>

        </button>


        <!-- =====================================
             ALBUS DUMBLEDORE
             ===================================== -->

        <button
          class="character-card character-card--active"
          type="button"
          data-character="dumbledore"
          aria-label="Chatear con Albus Dumbledore"
        >

          <div class="character-card__portrait">

            <img
              src="/src/assets/img/dumdledore.jpeg"
              alt="Albus Dumbledore"
            />

            <div class="character-card__portrait-shine"></div>

          </div>

          <div class="character-card__content">

            <p class="character-card__label">
              AVAILABLE NOW
            </p>

            <h2>
              Albus Dumbledore
            </h2>

            <p class="character-card__role">
              Headmaster of Hogwarts
            </p>

            <div
              class="character-card__divider"
              aria-hidden="true"
            >
              <span></span>
              <span>◆</span>
              <span></span>
            </div>

            <p class="character-card__description">
              El director de Hogwarts te aguarda.
            </p>

            <span class="character-card__cta">
              Entrar a la conversación
              <span>↗</span>
            </span>

          </div>

          <span
            class="character-card__corner character-card__corner--tl"
          ></span>

          <span
            class="character-card__corner character-card__corner--tr"
          ></span>

          <span
            class="character-card__corner character-card__corner--bl"
          ></span>

          <span
            class="character-card__corner character-card__corner--br"
          ></span>

        </button>

      </div>
    </section>
  `;

  setupCharacterCards();
}

function renderChat() {
  app.innerHTML = `
    <section
      class="chat-panel"
      aria-label="Chat con Severus Snape"
    >

      <!-- =====================================
           CHAT HEADER
           ===================================== -->

      <header class="chat-header">

        <div class="header-ornament" aria-hidden="true">
          <span></span>
          <span>✦</span>
          <span></span>
        </div>

        <div class="character-avatar">

          <img
            src="/src/assets/img/snape-avatar.jpeg"
            alt="Severus Snape"
          />

        </div>

        <div class="character-info">

          <p class="character-label">
            PROFESSOR OF POTIONS
          </p>

          <h2>
            Severus Snape
          </h2>

          <div
            class="character-line"
            aria-hidden="true"
          ></div>

        </div>

        <div
          class="character-status"
          aria-label="Severus Snape está disponible"
        >

          <span class="status-dot"></span>

          <span class="status-text">
            Disponible
          </span>

        </div>

      </header>


      <!-- =====================================
           MESSAGES
           ===================================== -->

      <section
        class="chat-messages"
        id="chat-messages"
        aria-label="Conversación con Severus Snape"
        aria-live="polite"
      >

        <div class="empty-state" aria-hidden="true">

          <div class="empty-card">

            <div
              class="card-corner card-corner--top-left"
            ></div>

            <div
              class="card-corner card-corner--top-right"
            ></div>

            <div
              class="card-corner card-corner--bottom-left"
            ></div>

            <div
              class="card-corner card-corner--bottom-right"
            ></div>

            <div class="empty-symbol">
              ✦
            </div>

            <p class="empty-overline">
              PRIVATE CORRESPONDENCE
            </p>

            <div
              class="empty-divider"
              aria-hidden="true"
            >
              <span></span>
              <span>◆</span>
              <span></span>
            </div>

            <h2>
              Severus Snape
            </h2>

            <p class="empty-title">
              Master of Potions
            </p>

            <div class="empty-quote">

              <span class="quote-mark">
                “
              </span>

              <p>
                What is it you want?
              </p>

              <span class="quote-mark quote-mark--close">
                ”
              </span>

            </div>

            <p class="empty-description">
              Inicie una conversación con el profesor de Pociones.
            </p>

            <div
              class="empty-symbol empty-symbol--bottom"
            >
              ✦
            </div>

          </div>

        </div>

      </section>


      <!-- =====================================
           COMPOSER
           ===================================== -->

      <form
        class="chat-composer"
        id="chat-form"
      >

        <div
          class="composer-ornament"
          aria-hidden="true"
        >
          <span></span>
          <span>✦</span>
          <span></span>
        </div>

        <label
          class="visually-hidden"
          for="message-input"
        >
          Escribe tu mensaje
        </label>

        <div class="input-wrapper">

          <input
            type="text"
            id="message-input"
            name="message"
            class="message-input"
            placeholder="Write to Severus Snape..."
            autocomplete="off"
            required
          />

        </div>

        <button
          type="submit"
          class="send-button"
          aria-label="Enviar mensaje"
        >
          <span
            class="send-icon"
            aria-hidden="true"
          >
            ↗
          </span>
        </button>

      </form>

    </section>
  `;

  messages.forEach((message) => {
    renderMessage(message.role, message.content);
  });
}

function renderAbout() {
  app.innerHTML = `
    <section class="about-page">

      <div class="about-content">

        <div
          class="selection-ornament"
          aria-hidden="true"
        >
          <span></span>
          <span>✦</span>
          <span></span>
        </div>

        <p class="selection-overline">
          ABOUT ARCANA
        </p>

        <h1>
          El mundo mágico<br />
          cobra vida
        </h1>

        <p class="selection-description">
          Arcana es una experiencia de conversación
          interactiva que te permite hablar con personajes
          del mundo mágico.
        </p>

        <p class="selection-description">
          Cada personaje posee una personalidad,
          una historia y una forma particular de responder.
          La experiencia combina una interfaz inspirada
          en el universo mágico con inteligencia artificial.
        </p>

        <div class="about-divider" aria-hidden="true">
          <span></span>
          <span>◆</span>
          <span></span>
        </div>

        <h2>
          Proyecto Integrador M3
        </h2>

        <p class="selection-description">
          Esta aplicación fue desarrollada utilizando
          HTML, CSS y JavaScript Vanilla, sin frameworks
          ni librerías externas.
        </p>

        <a
          class="character-card__cta about-chat-link"
          href="/"
        >
          Conocer los personajes
          <span>↗</span>
        </a>

      </div>

    </section>
  `;
}

function renderNotFound() {
  app.innerHTML = `
    <section class="about-page">

      <div class="about-content">

        <div
          class="selection-ornament"
          aria-hidden="true"
        >
          <span></span>
          <span>✦</span>
          <span></span>
        </div>

        <p class="selection-overline">
          ARCANA
        </p>

        <h1>
          404
        </h1>

        <p class="selection-description">
          La página que estás buscando no existe.
        </p>

        <a
          class="character-card__cta"
          href="/"
        >
          Volver a los personajes
          <span>↗</span>
        </a>

      </div>

    </section>
  `;
}

function router() {
  const path = normalizePath(window.location.pathname);

  const render = routes[path] || renderNotFound;

  render();

  updateActiveNavigation(path);
}

function navigateTo(path) {
  const normalizedPath = normalizePath(path);
  const currentPath = normalizePath(window.location.pathname);

  if (normalizedPath === currentPath) {
    return;
  }

  window.history.pushState({}, "", normalizedPath);

  router();
}

function handleLinkClick(event) {
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

  navigateTo(url.pathname);
}

function setupLinkInterception() {
  document.addEventListener("click", handleLinkClick);
}

function setupPopState() {
  window.addEventListener("popstate", router);
}

function setupCharacterCards() {
  const characterCards = document.querySelectorAll("[data-character]");

  characterCards.forEach((card) => {
    card.addEventListener("click", () => {
      navigateTo("/chat");
    });
  });
}

function updateActiveNavigation(path) {
  const currentPath = normalizePath(path);

  const navigationLinks = document.querySelectorAll(".site-nav__link");

  navigationLinks.forEach((link) => {
    const href = link.getAttribute("href");

    const linkPath = normalizePath(
      new URL(href, window.location.href).pathname,
    );

    const isHome =
      (currentPath === "/" || currentPath === "/home") &&
      (linkPath === "/" || linkPath === "/home");

    const isCurrent = isHome || linkPath === currentPath;

    link.classList.toggle("site-nav__link--active", isCurrent);
  });
}

function initializeRouter() {
  setupLinkInterception();
  setupPopState();
  router();
}

initializeRouter();
