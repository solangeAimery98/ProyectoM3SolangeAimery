const characterNames = {
  snape: "SNAPE",
  voldemort: "VOLDEMORT",
  dumbledore: "DUMBLEDORE",
};

export function renderMessage(role, content) {
  const messagesContainer = document.querySelector("#chat-messages");

  if (!messagesContainer) {
    return;
  }

  const message = document.createElement("article");
  const bubble = document.createElement("div");

  const character = role === "user" ? null : role;

  message.classList.add(
    "message",
    role === "user" ? "message--user" : `message--${character}`,
  );

  if (character) {
    message.dataset.character = character;
  }

  bubble.classList.add("message-bubble");
  bubble.textContent = content;

  message.appendChild(bubble);
  messagesContainer.appendChild(message);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function renderConversation(messages, character = "snape") {
  messages.forEach((message) => {
    const role =
      message.role === "user"
        ? "user"
        : message.role === "model"
          ? character
          : getCharacterFromModelRole(message.role);

    const content = message.parts?.[0]?.text || message.content || "";

    if (content) {
      renderMessage(role, content);
    }
  });
}

function getCharacterFromModelRole(role) {
  return role in characterNames ? role : "snape";
}

export function showTypingIndicator(character = "snape") {
  const messagesContainer = document.querySelector("#chat-messages");

  if (!messagesContainer) {
    return;
  }

  hideTypingIndicator();

  const message = document.createElement("article");

  const bubble = document.createElement("div");

  const label = document.createElement("span");

  const dots = document.createElement("span");

  message.classList.add("message", "message--typing");

  message.dataset.typingCharacter = character;

  bubble.classList.add("message-bubble");

  label.classList.add("typing-label");

  label.textContent = `${characterNames[character] || "CHARACTER"} está escribiendo`;

  dots.classList.add("typing-dots");

  dots.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  bubble.appendChild(label);
  bubble.appendChild(dots);

  message.appendChild(bubble);

  messagesContainer.appendChild(message);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function hideTypingIndicator() {
  const typingIndicator = document.querySelector(".message--typing");

  if (typingIndicator) {
    typingIndicator.remove();
  }
}
