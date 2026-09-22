import { characters } from "../data/characters.js";
import { initialMessages } from "../data/initialMessages.js";

import { getSelectedCharacter } from "../state/appState.js";

import {
  initializeConversation,
  getConversationHistory,
} from "../state/chatState.js";

import { renderConversation } from "../components/chatMessages.js";

import { setupChatForm } from "../events/chatEvents.js";

import { updateMessageLimitState } from "../components/messageLimit.js";

import { getLanguage, getLocalizedValue } from "../utils/language.js";

export function renderChat(app) {
  const selectedCharacter = getSelectedCharacter();

  const character = characters[selectedCharacter] || characters.snape;

  const language = getLanguage();

  app.innerHTML = `
    <section
      class="chat-panel"
      aria-label="${getLocalizedValue(character.ariaLabel)}"
    >

      <header class="chat-header">

        <div
          class="header-ornament"
          aria-hidden="true"
        >
          <span></span>
          <span>✦</span>
          <span></span>
        </div>

        <div class="character-avatar">

          <img
            src="${character.image}"
            alt="${character.name}"
          />

        </div>

        <div class="character-info">

          <p class="character-label">
            ${getLocalizedValue(character.label)}
          </p>

          <h2>
            ${character.name}
          </h2>

          <div
            class="character-line"
            aria-hidden="true"
          ></div>

        </div>

        <div
          class="character-status"
          aria-label="${
            language === "es"
              ? `${character.name} está disponible`
              : `${character.name} is available`
          }"
        >

          <span class="status-dot"></span>

          <span class="status-text">
            ${language === "es" ? "Disponible" : "Available"}
          </span>

        </div>

      </header>

      <section
        class="chat-messages"
        id="chat-messages"
        aria-label="${
          language === "es"
            ? `Conversación con ${character.name}`
            : `Conversation with ${character.name}`
        }"
        aria-live="polite"
      >

        <div
          class="empty-state"
          aria-hidden="true"
        >

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
              ${
                language === "es"
                  ? "CORRESPONDENCIA PRIVADA"
                  : "PRIVATE CORRESPONDENCE"
              }
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
              ${character.name}
            </h2>

            <p class="empty-title">
              ${getLocalizedValue(character.role)}
            </p>

            <div class="empty-quote">

              <span class="quote-mark">
                “
              </span>

              <p>
                ${getLocalizedValue(character.quote)}
              </p>

              <span
                class="quote-mark quote-mark--close"
              >
                ”
              </span>

            </div>

            <p class="empty-description">
              ${getLocalizedValue(character.description)}
            </p>

            <div
              class="empty-symbol empty-symbol--bottom"
            >
              ✦
            </div>

          </div>

        </div>

      </section>

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

        <div
          class="message-limit"
          aria-live="polite"
        >

          <div class="message-limit__meta">

            <span class="message-limit__label">
              ARCANA · CORRESPONDENCE
            </span>

            <span class="message-limit__count">
              0 / 20
            </span>

          </div>

          <div
            class="message-limit__track"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="20"
            aria-valuenow="0"
          >

            <span
              class="message-limit__fill"
            ></span>

          </div>

        </div>

        <label
          class="visually-hidden"
          for="message-input"
        >
          ${language === "es" ? "Escribe tu mensaje" : "Write your message"}
        </label>

        <div class="input-wrapper">

          <input
            type="text"
            id="message-input"
            name="message"
            class="message-input"
            placeholder="${getLocalizedValue(character.placeholder)}"
            autocomplete="off"
          />

        </div>

        <button
          type="submit"
          class="send-button"
          aria-label="${language === "es" ? "Enviar mensaje" : "Send message"}"
        >

          <span
            class="send-icon"
            aria-hidden="true"
          >
            &#x2197;&#xFE0E;
          </span>

        </button>

      </form>

    </section>
  `;

  const hasSavedConversation = initializeConversation(selectedCharacter);

  if (hasSavedConversation) {
    renderConversation(getConversationHistory(), selectedCharacter);
  } else {
    renderConversation(
      initialMessages[language][selectedCharacter] ||
        initialMessages[language].snape,
      selectedCharacter,
    );
  }

  updateMessageLimitState(selectedCharacter);

  setupChatForm();
}
