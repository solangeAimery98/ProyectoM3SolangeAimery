import { loadConversation, saveConversation } from "../services/chatStorage.js";

import { parseStorageJSON } from "../utils/utils.js";

const USER_MESSAGE_COUNTS_KEY = "userMessageCounts";

export const MAX_USER_MESSAGES = 20;

let conversationHistory = [];

const userMessageCounts = parseStorageJSON(
  sessionStorage.getItem(USER_MESSAGE_COUNTS_KEY),
  null,
) || {
  snape: 0,
  voldemort: 0,
  dumbledore: 0,
};

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

function incrementUserMessageCount(character) {
  if (!(character in userMessageCounts)) {
    return;
  }

  userMessageCounts[character] += 1;

  sessionStorage.setItem(
    USER_MESSAGE_COUNTS_KEY,
    JSON.stringify(userMessageCounts),
  );
}

export function initializeConversation(character) {
  const savedMessages = loadConversation(character);

  if (!savedMessages) {
    conversationHistory = [];
    return false;
  }

  conversationHistory = savedMessages;

  return conversationHistory.length > 0;
}

export function resetConversationHistory() {
  conversationHistory = [];
}

export function getConversationHistory() {
  return [...conversationHistory];
}

export function registerUserMessage(content, character) {
  addUserMessage(content);
  incrementUserMessageCount(character);
  saveConversation(character, conversationHistory);
}

export function registerModelMessage(content, character) {
  addModelMessage(content);
  saveConversation(character, conversationHistory);
}

export function getUserMessageCount(character) {
  return userMessageCounts[character] || 0;
}

export function hasReachedMessageLimit(character) {
  return getUserMessageCount(character) >= MAX_USER_MESSAGES;
}
