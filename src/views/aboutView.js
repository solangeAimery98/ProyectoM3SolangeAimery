export function renderAbout(app) {
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
          ABOUT ARCANA
        </p>

        <h1>
          Sobre<br />
          Arcana
        </h1>

        <p class="selection-description">
          Arcana es una experiencia de conversación
          interactiva que permite hablar con personajes
          del mundo mágico.
        </p>

        <p class="selection-description">
          Cada personaje tiene su propia personalidad,
          historia y manera de responder. La aplicación
          combina una interfaz inspirada en el universo
          mágico con inteligencia artificial.
        </p>

        <div
          class="selection-ornament"
          aria-hidden="true"
        >
          <span></span>
          <span>◆</span>
          <span></span>
        </div>

        <p class="selection-description">
          Este proyecto forma parte del Proyecto
          Integrador M3 y está desarrollado utilizando
          HTML, CSS y JavaScript Vanilla, sin frameworks
          ni librerías externas.
        </p>

        <a
          class="site-nav__link"
          href="/"
          style="display: inline-flex; margin-top: 24px;"
        >
          ← Ver personajes
        </a>

      </div>

    </section>
  `;
}
