import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({
      error: "Método no permitido.",
    });
  }

  try {
    const { message } = request.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return response.status(400).json({
        error: "El mensaje es obligatorio.",
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message.trim(),
    });

    return response.status(200).json({
      reply: result.text,
    });
  } catch (error) {
    console.error("Error al comunicarse con Gemini:", error);

    return response.status(500).json({
      error: "No se pudo obtener una respuesta de Gemini.",
    });
  }
}
