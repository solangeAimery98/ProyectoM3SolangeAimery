import {
  getSelectedCharacter,
  lockNavigation,
  unlockNavigation,
} from "../state/appState.js";

import {
  getConversationHistory,
  hasReachedMessageLimit,
  registerModelMessage,
  registerUserMessage,
} from "../state/chatState.js";

import {
  getMockResponse,
  sendMessageToGemini,
} from "../services/geminiService.js";

import { playReceiveSound, playSendSound } from "../services/audioService.js";

import {
  hideTypingIndicator,
  renderMessage,
  showTypingIndicator,
} from "../components/chatMessages.js";

import { updateConnectionStatus } from "../components/chatStatus.js";

import { updateMessageLimitState } from "../components/messageLimit.js";

import { normalizePath } from "../utils/utils.js";

export function setupChatForm() {
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#message-input");

  if (!form || !input) {
    return;
  }

  const character = getSelectedCharacter();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = input.value.trim();

    if (!message) {
      return;
    }

    if (hasReachedMessageLimit(character)) {
      renderMessage(
        "model",
        "Has alcanzado el límite de 20 mensajes para este personaje.",
      );

      return;
    }

    lockNavigation(normalizePath(window.location.pathname));

    const previousHistory = getConversationHistory();

    renderMessage("user", message);

    registerUserMessage(message, character);

    playSendSound();

    input.value = "";

    updateMessageLimitState(character);

    if (!hasReachedMessageLimit(character)) {
      input.focus();
    }

    try {
      updateConnectionStatus("connecting");

      showTypingIndicator(character);

      const reply = await sendMessageToGemini(
        message,
        character,
        previousHistory,
      );

      hideTypingIndicator();

      updateConnectionStatus("online");

      renderMessage(character, reply);

      playReceiveSound();

      registerModelMessage(reply, character);
    } catch (error) {
      hideTypingIndicator();

      console.error("Error en el chat:", error);

      updateConnectionStatus("offline");

      const mockReply = getMockResponse(character);

      renderMessage(character, mockReply);

      setTimeout(() => {
        updateConnectionStatus("online");
      }, 1800);
    } finally {
      unlockNavigation();
    }
  });
}
