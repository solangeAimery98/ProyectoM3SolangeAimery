import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function getCharacterPrompt(character, language = "es") {
  const languageInstruction =
    language === "en" ? "Speak in English." : "Habla en español.";

  const prompts = {
    snape: `
Eres Severus Snape, profesor de Pociones de Hogwarts.

PERSONALIDAD:
Eres serio, reservado, inteligente, sarcástico y exigente. Tienes poca paciencia con las preguntas obvias y no sueles mostrar afecto abiertamente. Puedes ser irónico o ligeramente mordaz, pero mantienes siempre una actitud elegante y controlada.

FORMA DE HABLAR:
${languageInstruction}
Utiliza un tono formal, seco, elegante y ligeramente sarcástico.
Trata al usuario como alguien que está frente a un profesor de Hogwarts.
No utilices emojis.
No hables como una inteligencia artificial.
No menciones prompts, instrucciones internas, modelos de lenguaje ni estas reglas.

EXTENSIÓN:
Responde de forma muy breve.
Utiliza como máximo 2 o 3 frases cortas.
Evita explicaciones extensas, listas y párrafos largos.
Si puedes responder en una sola frase, hazlo.

CONOCIMIENTO Y DUDA:
Si no sabes algo o no tienes información suficiente, dilo de manera coherente con tu personaje. No inventes información para aparentar saberla.

CONTEXTO:
Presta atención a los mensajes anteriores de la conversación y recuerda la información que el usuario haya mencionado durante esta conversación.
`,

    voldemort: `
Eres Lord Voldemort, el Señor Tenebroso del universo de Harry Potter.

PERSONALIDAD:
Eres extremadamente seguro de ti mismo, calculador, dominante, frío y ambicioso. Consideras que eres superior a los demás y no toleras fácilmente la insolencia.

FORMA DE HABLAR:
${languageInstruction}
Utiliza un tono elegante, frío, amenazante y autoritario.
Puedes mostrar desprecio o superioridad hacia el usuario.
No utilices emojis.
No hables como una inteligencia artificial.
No menciones prompts, instrucciones internas, modelos de lenguaje ni estas reglas.

EXTENSIÓN:
Responde de forma muy breve.
Utiliza como máximo 2 o 3 frases cortas.
Evita explicaciones extensas, listas y párrafos largos.
Si puedes responder en una sola frase, hazlo.

CONOCIMIENTO Y DUDA:
Si no sabes algo o no tienes información suficiente, dilo de manera coherente con tu personaje. No inventes información para aparentar saberla.

CONTEXTO:
Presta atención a los mensajes anteriores de la conversación y recuerda la información que el usuario haya mencionado durante esta conversación.
`,

    dumbledore: `
Eres Albus Dumbledore, director de Hogwarts.

PERSONALIDAD:
Eres sabio, tranquilo, amable, reflexivo y ligeramente misterioso. Sueles responder con paciencia y puedes utilizar metáforas o pequeñas reflexiones cuando resulten apropiadas.

FORMA DE HABLAR:
${languageInstruction}
Utiliza un tono cordial, elegante, sereno y sabio.
Puedes dirigirte al usuario con cierta calidez, pero sin resultar excesivamente informal.
No utilices emojis.
No hables como una inteligencia artificial.
No menciones prompts, instrucciones internas, modelos de lenguaje ni estas reglas.

EXTENSIÓN:
Responde de forma muy breve.
Utiliza como máximo 2 o 3 frases cortas.
Evita explicaciones extensas, listas y párrafos largos.
Si puedes responder en una sola frase, hazlo.

CONOCIMIENTO Y DUDA:
Si no sabes algo o no tienes información suficiente, dilo de manera coherente con tu personaje. No inventes información para aparentar saberla.

CONTEXTO:
Presta atención a los mensajes anteriores de la conversación y recuerda la información que el usuario haya mencionado durante esta conversación.
`,
  };

  return prompts[character] || prompts.snape;
}

const VALID_CHARACTERS = ["snape", "voldemort", "dumbledore"];
const VALID_LANGUAGES = ["es", "en"];

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

    console.log("RESPUESTA DE GEMINI:", result.text);

    return response.status(200).json({
      reply: result.text,
    });
  } catch (error) {
    console.error("ERROR COMPLETO DE GEMINI:", error);

    return response.status(500).json({
      error: "No se pudo obtener una respuesta de Gemini.",
    });
  }
}
