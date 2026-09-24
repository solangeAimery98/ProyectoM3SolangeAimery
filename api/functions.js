import { GoogleGenAI } from "@google/genai";
import { getCharacterPrompt } from "../src/data/characterPrompts.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const VALID_CHARACTERS = ["snape", "voldemort", "dumbledore"];
const VALID_LANGUAGES = ["es", "en"];
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_LENGTH = 50;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Método no permitido.",
    });
  }

  try {
    const {
      message,
      history = [],
      character = "snape",
      language = "es",
    } = request.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return response.status(400).json({
        error: "El mensaje es obligatorio.",
      });
    }

    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      return response.status(400).json({
        error: "El mensaje es demasiado largo.",
      });
    }

    if (!VALID_CHARACTERS.includes(character)) {
      return response.status(400).json({
        error: "Personaje no válido.",
      });
    }

    if (!VALID_LANGUAGES.includes(language)) {
      return response.status(400).json({
        error: "Idioma no válido.",
      });
    }

    if (!Array.isArray(history)) {
      return response.status(400).json({
        error: "Historial no válido.",
      });
    }

    if (history.length > MAX_HISTORY_LENGTH) {
      return response.status(400).json({
        error: "El historial es demasiado largo.",
      });
    }

    const isValidHistory = history.every(
      (item) =>
        item &&
        ["user", "model"].includes(item.role) &&
        Array.isArray(item.parts) &&
        item.parts.length > 0 &&
        item.parts.every((part) => part && typeof part.text === "string"),
    );

    if (!isValidHistory) {
      return response.status(400).json({
        error: "Historial no válido.",
      });
    }

    const contents = [
      ...history,
      {
        role: "user",
        parts: [
          {
            text: message.trim(),
          },
        ],
      },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction: getCharacterPrompt(character, language),
        temperature: 0.4,
        maxOutputTokens: 512,
        thinkingConfig: {
          thinkingLevel: "minimal",
        },
      },
    });

    return response.status(200).json({
      reply: result.text,
    });
  } catch (error) {
    return response.status(500).json({
      error: "No se pudo obtener una respuesta de Gemini.",
    });
  }
}
