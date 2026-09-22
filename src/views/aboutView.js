import { getLanguage } from "../utils/language.js";

export function renderAbout(app) {
  const language = getLanguage();

  const isEnglish = language === "en";

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
          ${isEnglish ? "ABOUT ARCANA" : "SOBRE ARCANA"}
        </p>

        <h1>
          ${isEnglish ? "About<br />Arcana" : "Sobre<br />Arcana"}
        </h1>

        <p class="selection-description">
          ${
            isEnglish
              ? "Arcana is an interactive conversation experience that allows you to talk with characters from the magical world."
              : "Arcana es una experiencia de conversación interactiva que permite hablar con personajes del mundo mágico."
          }
        </p>

        <p class="selection-description">
          ${
            isEnglish
              ? "Each character has their own personality, history, and way of responding. The application combines an interface inspired by the magical universe with artificial intelligence."
              : "Cada personaje tiene su propia personalidad, historia y manera de responder. La aplicación combina una interfaz inspirada en el universo mágico con inteligencia artificial."
          }
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
          ${
            isEnglish
              ? "This project is part of the M3 Integrative Project and was developed using HTML, CSS, and Vanilla JavaScript, without frameworks or external libraries."
              : "Este proyecto forma parte del Proyecto Integrador M3 y está desarrollado utilizando HTML, CSS y JavaScript Vanilla, sin frameworks ni librerías externas."
          }
        </p>

        <div class="about-author">

          <div
            class="about-author__ornament"
            aria-hidden="true"
          >
            <span></span>
            <span>✦</span>
            <span></span>
          </div>

          <p class="about-author__text">
            ${isEnglish ? "Built with ♥ by" : "Hecho con ♥ por"}
          </p>

          <p class="about-author__signature">
            Solange Aimery
          </p>

          <p class="about-author__copyright">
            © 2026 Arcana ·
            ${
              isEnglish
                ? "All rights reserved."
                : "Todos los derechos reservados."
            }
          </p>

        </div>

        <a
          class="site-nav__link"
          href="/"
          style="display: inline-flex; margin-top: 24px;"
        >
          ${isEnglish ? "← View characters" : "← Ver personajes"}
        </a>

      </div>

    </section>
  `;
}
