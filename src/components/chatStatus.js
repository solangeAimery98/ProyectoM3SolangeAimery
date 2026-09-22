import { getLanguage } from "../utils/language.js";

export function updateConnectionStatus(status) {
  const statusContainer = document.querySelector(".character-status");
  const statusText = document.querySelector(".status-text");

  if (!statusContainer || !statusText) {
    return;
  }

  const language = getLanguage();
  const isEnglish = language === "en";

  statusContainer.classList.remove(
    "character-status--connecting",
    "character-status--offline",
  );

  if (status === "connecting") {
    statusText.textContent = isEnglish ? "Connecting..." : "Conectando...";

    statusContainer.classList.add("character-status--connecting");

    return;
  }

  if (status === "offline") {
    statusText.textContent = isEnglish
      ? "Connection interrupted"
      : "Conexión interrumpida";

    statusContainer.classList.add("character-status--offline");

    return;
  }

  statusText.textContent = isEnglish ? "Available" : "Disponible";
}
