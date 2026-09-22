export function renderNotFound(app) {
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
          La página que estás buscando no existe.
        </p>

        <a
          class="site-nav__link"
          href="/"
          style="display: inline-flex; margin-top: 24px;"
        >
          ← Volver a los personajes
        </a>

      </div>

    </section>
  `;
}
