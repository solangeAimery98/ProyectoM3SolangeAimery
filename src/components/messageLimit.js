import {
  getUserMessageCount,
  hasReachedMessageLimit,
  MAX_USER_MESSAGES,
} from "../state/chatState.js";

export function updateMessageLimitState(character) {
  const input = document.querySelector("#message-input");

  const button = document.querySelector(".send-button");

  const fill = document.querySelector(".message-limit__fill");

  const countElement = document.querySelector(".message-limit__count");

  const track = document.querySelector(".message-limit__track");

  if (!input || !button) {
    return;
  }

  const count = getUserMessageCount(character);

  const limitReached = hasReachedMessageLimit(character);

  const progress = Math.min((count / MAX_USER_MESSAGES) * 100, 100);

  if (fill) {
    fill.style.width = `${progress}%`;
  }

  if (countElement) {
    countElement.textContent = `${count} / ${MAX_USER_MESSAGES}`;
  }

  if (track) {
    track.setAttribute("aria-valuenow", count);
  }

  input.disabled = limitReached;
  button.disabled = limitReached;

  button.classList.toggle("send-button--limit", limitReached);

  if (limitReached) {
    input.placeholder = `Límite de ${MAX_USER_MESSAGES} mensajes alcanzado`;
  }
}
