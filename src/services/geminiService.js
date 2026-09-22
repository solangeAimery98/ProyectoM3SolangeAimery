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

export async function sendMessageToGemini(message, character, history) {
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
      history,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "No se pudo obtener una respuesta.");
  }

  return data.reply;
}

export function getMockResponse(character = "snape") {
  const responses = mockResponses[character] || mockResponses.snape;

  const randomIndex = Math.floor(Math.random() * responses.length);

  return responses[randomIndex];
}
