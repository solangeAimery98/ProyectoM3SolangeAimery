import { beforeEach, describe, expect, it, vi } from "vitest";

vi.hoisted(() => {
  const createStorageMock = () => {
    let store = {};

    return {
      getItem(key) {
        return store[key] ?? null;
      },

      setItem(key, value) {
        store[key] = String(value);
      },

      removeItem(key) {
        delete store[key];
      },

      clear() {
        store = {};
      },
    };
  };

  globalThis.sessionStorage = createStorageMock();
  globalThis.localStorage = createStorageMock();
});

import {
  getConversationHistory,
  registerModelMessage,
  registerUserMessage,
  resetConversationHistory,
} from "../src/state/chatState.js";

import { sendMessageToGemini } from "../src/services/geminiService.js";

describe("Historial de conversación", () => {
  beforeEach(() => {
    resetConversationHistory();

    sessionStorage.clear();
    localStorage.clear();

    vi.restoreAllMocks();
  });

  it("registra correctamente un mensaje del usuario", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        reply: "Respuesta de prueba",
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    registerUserMessage("Hola, Snape");

    await sendMessageToGemini("¿Cómo está?", "snape", getConversationHistory());

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
      json: async () => ({
        reply: "Una respuesta de prueba.",
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    registerModelMessage("Una respuesta de prueba.");

    await sendMessageToGemini("Gracias", "snape", getConversationHistory());

    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(requestBody.history).toEqual([
      {
        role: "model",
        parts: [{ text: "Una respuesta de prueba." }],
      },
    ]);
  });

  it("envía el historial completo sin recortarlo", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        reply: "Respuesta de prueba",
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    for (let i = 1; i <= 13; i += 1) {
      registerUserMessage(`Mensaje ${i}`);
    }

    await sendMessageToGemini(
      "Mensaje actual",
      "snape",
      getConversationHistory(),
    );

    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body);

    expect(requestBody.history).toHaveLength(13);

    expect(requestBody.history[0]).toEqual({
      role: "user",
      parts: [{ text: "Mensaje 1" }],
    });

    expect(requestBody.history[12]).toEqual({
      role: "user",
      parts: [{ text: "Mensaje 13" }],
    });
  });

  it("devuelve el historial completo de la conversación", () => {
    registerUserMessage("Hola");
    registerModelMessage("Hola, ¿en qué puedo ayudarte?");

    expect(getConversationHistory()).toEqual([
      {
        role: "user",
        parts: [{ text: "Hola" }],
      },
      {
        role: "model",
        parts: [{ text: "Hola, ¿en qué puedo ayudarte?" }],
      },
    ]);
  });

  it("reinicia correctamente el historial de conversación", () => {
    registerUserMessage("Mensaje de prueba");

    expect(getConversationHistory()).toHaveLength(1);

    resetConversationHistory();

    expect(getConversationHistory()).toEqual([]);
  });

  it("mantiene el orden de los mensajes de usuario y del personaje", () => {
    registerUserMessage("Primer mensaje");
    registerModelMessage("Primera respuesta");
    registerUserMessage("Segundo mensaje");
    registerModelMessage("Segunda respuesta");

    expect(getConversationHistory()).toEqual([
      {
        role: "user",
        parts: [{ text: "Primer mensaje" }],
      },
      {
        role: "model",
        parts: [{ text: "Primera respuesta" }],
      },
      {
        role: "user",
        parts: [{ text: "Segundo mensaje" }],
      },
      {
        role: "model",
        parts: [{ text: "Segunda respuesta" }],
      },
    ]);
  });

  it("hace la petición a la API y devuelve la respuesta recibida", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        reply: "Buenas noches.",
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const reply = await sendMessageToGemini(
      "Buenas noches",
      "dumbledore",
      getConversationHistory(),
    );

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
