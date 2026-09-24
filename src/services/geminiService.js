import { getLanguage } from "../utils/language.js";

const mockResponses = {
  es: {
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
  },

  en: {
    snape: [
      "I cannot respond at the moment. Try again later.",
      "It appears the communication has been interrupted. How inconvenient.",
      "The connection has failed. You will have to try again.",
      "For now, you will have to settle for silence. Try again.",
    ],

    voldemort: [
      "The connection has been interrupted. Try again.",
      "It appears the forces controlling this communication have failed.",
      "I will not waste words while this connection remains unstable.",
      "The communication has been interrupted. Return when you can.",
    ],

    dumbledore: [
      "It seems the communication has been interrupted. Try again in a moment.",
      "Even magic can fail from time to time. Let us try again.",
      "The connection seems to have been lost. Do not worry, we can try again.",
      "Sometimes we must have a little patience. The communication has been interrupted.",
    ],
  },
};

export async function sendMessageToGemini(message, character, history) {
  const language = getLanguage();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("/api/functions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        character,
        history,
        language,
      }),
      signal: controller.signal,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "No se pudo obtener una respuesta.");
    }

    return data.reply;
  } finally {
    clearTimeout(timeout);
  }
}
``;
export function getMockResponse(character = "snape") {
  const language = getLanguage();

  const languageResponses = mockResponses[language] || mockResponses.es;

  const responses = languageResponses[character] || languageResponses.snape;

  const randomIndex = Math.floor(Math.random() * responses.length);

  return responses[randomIndex];
}
