export function updateConnectionStatus(status) {
  const statusContainer = document.querySelector(".character-status");

  const statusText = document.querySelector(".status-text");

  if (!statusContainer || !statusText) {
    return;
  }

  statusContainer.classList.remove(
    "character-status--connecting",
    "character-status--offline",
  );

  if (status === "connecting") {
    statusText.textContent = "Conectando...";

    statusContainer.classList.add("character-status--connecting");

    return;
  }

  if (status === "offline") {
    statusText.textContent = "Conexión interrumpida";

    statusContainer.classList.add("character-status--offline");

    return;
  }

  statusText.textContent = "Disponible";
}
