let conversationHistory = [];

const userMessageCounts = JSON.parse(
  sessionStorage.getItem("userMessageCounts") || "null",
) || {
  snape: 0,
  voldemort: 0,
  dumbledore: 0,
};

const MAX_USER_MESSAGES = 20;

/* =========================================
   RESPUESTAS ALTERNATIVAS
   ========================================= */

const FORCE_ERROR = false;

const mockResponses = {
  snape: [
    "No puedo responder en este momento. Inténtelo nuevamente más tarde.",
    "Parece que la comunicación se ha interrumpido. Qué inconveniente.",
    "La conexión ha fallado. Tendrá que intentarlo nuevamente.",
    "Por ahora, deberá conformarse con el silencio. Inténtelo otra vez.",
  ],

  voldemort: [
    "La conexión se ha interrumpido. Inténtalo nuevamente.",
    "Parece que las fuerzas que controlan esta comunicación han fallado.",
    "No desperdiciaré palabras mientras esta conexión permanezca inestable.",
    "La comunicación ha sido interrumpida. Regresa cuando puedas.",
  ],

  dumbledore: [
    "Parece que la comunicación se ha interrumpido. Inténtalo nuevamente en un momento.",
    "Incluso la magia puede fallar de vez en cuando. Volvamos a intentarlo.",
    "La conexión parece haberse perdido. No te preocupes, podemos intentarlo nuevamente.",
    "A veces debemos tener un poco de paciencia. La comunicación se ha interrumpido.",
  ],
};

export function getMockResponse(character = "snape") {
  const responses = mockResponses[character] || mockResponses.snape;

  const randomIndex = Math.floor(Math.random() * responses.length);

  return responses[randomIndex];
}

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

function incrementUserMessageCount(character) {
  if (!(character in userMessageCounts)) {
    return;
  }

  userMessageCounts[character] += 1;

  sessionStorage.setItem(
    "userMessageCounts",
    JSON.stringify(userMessageCounts),
  );
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

export function getUserMessageCount(character) {
  return userMessageCounts[character] || 0;
}

export function hasReachedMessageLimit(character) {
  return getUserMessageCount(character) >= MAX_USER_MESSAGES;
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
  if (FORCE_ERROR) {
    throw new Error("Error forzado para pruebas");
  }

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

export function registerUserMessage(content, character) {
  addUserMessage(content);
  incrementUserMessageCount(character);
}

/* =========================================
   REGISTRAR RESPUESTA DEL PERSONAJE
   ========================================= */

export function registerModelMessage(content) {
  addModelMessage(content);
}
