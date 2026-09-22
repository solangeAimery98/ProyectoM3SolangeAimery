import { getLanguage } from "../utils/language.js";

export function renderNotFound(app) {
  const language = getLanguage();

  app.innerHTML = `
    <section class="character-selection">

      <div class="selection-heading">

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
          ${
            language === "es"
              ? "La página que estás buscando no existe."
              : "The page you are looking for does not exist."
          }
        </p>

        <a
          class="site-nav__link"
          href="/"
          style="display: inline-flex; margin-top: 24px;"
        >
          ${
            language === "es"
              ? "← Volver a los personajes"
              : "← Back to characters"
          }
        </a>

      </div>

    </section>
  `;
}
