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

export function renderChat(app) {
  const selectedCharacter = getSelectedCharacter();

  const character = characters[selectedCharacter] || characters.snape;

  app.innerHTML = `
    <section
      class="chat-panel"
      aria-label="${character.ariaLabel}"
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
            ${character.label}
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
          aria-label="${character.name} está disponible"
        >

          <span class="status-dot"></span>

          <span class="status-text">
            Disponible
          </span>

        </div>

      </header>

      <section
        class="chat-messages"
        id="chat-messages"
        aria-label="Conversación con ${character.name}"
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
              ${character.name}
            </h2>

            <p class="empty-title">
              ${character.role}
            </p>

            <div class="empty-quote">

              <span class="quote-mark">
                “
              </span>

              <p>
                ${character.quote}
              </p>

              <span
                class="quote-mark quote-mark--close"
              >
                ”
              </span>

            </div>

            <p class="empty-description">
              ${character.description}
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
          Escribe tu mensaje
        </label>

        <div class="input-wrapper">

          <input
            type="text"
            id="message-input"
            name="message"
            class="message-input"
            placeholder="${character.placeholder}"
            autocomplete="off"
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
      initialMessages[selectedCharacter] || initialMessages.snape,
      selectedCharacter,
    );
  }

  updateMessageLimitState(selectedCharacter);

  setupChatForm();
}
