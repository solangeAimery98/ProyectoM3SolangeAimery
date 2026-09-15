let conversationHistory = [];

/* =========================================
   MENSAJES DEL HISTORIAL
   ========================================= */

function createMessage(role, content) {
  return {
    role,
    parts: [
      {
        text: content,
      },
    ],
  };
}

function addUserMessage(content) {
  conversationHistory = [
    ...conversationHistory,
    createMessage("user", content),
  ];
}

function addModelMessage(content) {
  conversationHistory = [
    ...conversationHistory,
    createMessage("model", content),
  ];
}

function getRecentHistory() {
  return conversationHistory.slice(-12);
}

/* =========================================
   RESET DE CONVERSACIÓN
   ========================================= */

export function resetConversationHistory() {
  conversationHistory = [];
}

/* =========================================
   INDICADOR DE ESCRITURA
   ========================================= */

export function showTypingIndicator(character = "snape") {
  const messagesContainer = document.querySelector("#chat-messages");

  if (!messagesContainer) {
    return;
  }

  hideTypingIndicator();

  const characterNames = {
    snape: "SNAPE",
    voldemort: "VOLDEMORT",
    dumbledore: "DUMBLEDORE",
  };

  const message = document.createElement("article");
  const bubble = document.createElement("div");

  message.classList.add("message", "message--typing");
  message.dataset.typingCharacter = character;

  bubble.classList.add("message-bubble");

  const label = document.createElement("span");
  label.classList.add("typing-label");
  label.textContent = `${characterNames[character] || "CHARACTER"} está escribiendo`;

  const dots = document.createElement("span");
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

/* =========================================
   RENDER MENSAJE
   ========================================= */

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

/* =========================================
   ENVIAR MENSAJE A GEMINI
   ========================================= */

export async function sendMessageToGemini(message, character) {
  const response = await fetch("/api/functions", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      message,
      character,
      history: getRecentHistory(),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "No se pudo obtener una respuesta.");
  }

  return data.reply;
}

/* =========================================
   REGISTRAR MENSAJE DEL USUARIO
   ========================================= */

export function registerUserMessage(content) {
  addUserMessage(content);
}

/* =========================================
   REGISTRAR RESPUESTA DEL PERSONAJE
   ========================================= */

export function registerModelMessage(content) {
  addModelMessage(content);
}
