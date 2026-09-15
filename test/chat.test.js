import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  registerModelMessage,
  registerUserMessage,
  resetConversationHistory,
  sendMessageToGemini,
} from "../src/chat.js";

describe("Historial de conversación", () => {
  beforeEach(() => {
    resetConversationHistory();
    vi.restoreAllMocks();
  });

  it("registra correctamente un mensaje del usuario", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "Respuesta de prueba" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    registerUserMessage("Hola, Snape");

    await sendMessageToGemini("¿Cómo está?", "snape");

    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(requestBody.history).toEqual([
      {
        role: "user",
        parts: [{ text: "Hola, Snape" }],
      },
    ]);
  });

  it("registra correctamente una respuesta del personaje", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "Una respuesta de prueba." }),
    });

    vi.stubGlobal("fetch", fetchMock);

    registerModelMessage("Una respuesta de prueba.");

    await sendMessageToGemini("Gracias", "snape");

    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(requestBody.history).toEqual([
      {
        role: "model",
        parts: [{ text: "Una respuesta de prueba." }],
      },
    ]);
  });

  it("envía solamente los últimos 12 mensajes del historial", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "Respuesta de prueba" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    for (let i = 1; i <= 13; i += 1) {
      registerUserMessage(`Mensaje ${i}`);
    }

    await sendMessageToGemini("Mensaje actual", "snape");

    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(requestBody.history).toHaveLength(12);
    expect(requestBody.history[0].parts[0].text).toBe("Mensaje 2");
    expect(requestBody.history[11].parts[0].text).toBe("Mensaje 13");
  });

  it("hace la petición a la API y devuelve la respuesta recibida", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "Buenas noches." }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const reply = await sendMessageToGemini("Buenas noches", "dumbledore");

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/functions",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    expect(reply).toBe("Buenas noches.");
  });
});
