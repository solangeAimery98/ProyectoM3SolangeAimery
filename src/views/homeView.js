import { characters } from "../data/characters.js";

import { setupCharacterCards } from "../components/characterCards.js";

import { getLanguage, getLocalizedValue } from "../utils/language.js";

function renderCharacterCard(characterKey, character) {
  const language = getLanguage();

  return `
    <button
      class="character-card character-card--active"
      type="button"
      data-character="${characterKey}"
      aria-label="${getLocalizedValue(character.ariaLabel)}"
    >

      <div class="character-card__portrait">

        <img
          src="${character.image}"
          alt="${character.name}"
        />

        <div
          class="character-card__portrait-shine"
        ></div>

      </div>

      <div class="character-card__content">

        <p class="character-card__label">
          ${language === "es" ? "DISPONIBLE AHORA" : "AVAILABLE NOW"}
        </p>

        <h2>
          ${character.name}
        </h2>

        <p class="character-card__role">
          ${getLocalizedValue(character.role)}
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
          ${getLocalizedValue(character.cardDescription)}
        </p>

        <span class="character-card__cta">
          ${
            language === "es"
              ? "Entrar a la conversación"
              : "Enter the conversation"
          }
          <span>&#x2197;&#xFE0E;</span>
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
  `;
}

export function renderHome(app, onCharacterSelected) {
  const language = getLanguage();

  const cards = Object.entries(characters)
    .map(([key, character]) => renderCharacterCard(key, character))
    .join("");

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
          THE WIZARDING WORLD
        </p>

        <h1>
          ${
            language === "es"
              ? "Chateá con tu<br />personaje favorito"
              : "Chat with your<br />favorite character"
          }
        </h1>

        <p class="selection-description">
          ${
            language === "es"
              ? "Elegí una personalidad y comenzá una conversación. Cada personaje tiene su propia voz, historia y manera de responder."
              : "Choose a personality and start a conversation. Each character has their own voice, history, and way of responding."
          }
        </p>

      </div>

      <div class="character-grid">
        ${cards}
      </div>

    </section>
  `;

  setupCharacterCards(onCharacterSelected);
}
