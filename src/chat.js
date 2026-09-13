export function renderMessage(role, content) {
  const messagesContainer = document.querySelector("#chat-messages");

  if (!messagesContainer) {
    return;
  }

  const message = document.createElement("article");

  const bubble = document.createElement("div");

  message.classList.add(
    "message",
    role === "user" ? "message--user" : "message--snape",
  );

  bubble.classList.add("message-bubble");

  bubble.textContent = content;

  message.appendChild(bubble);

  messagesContainer.appendChild(message);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
