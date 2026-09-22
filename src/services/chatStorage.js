import { parseStorageJSON } from "../utils/utils.js";

const CHAT_STORAGE_KEY = "arcanaConversations";
const CHAT_STORAGE_DURATION = 24 * 60 * 60 * 1000;

function getStoredConversations() {
  return parseStorageJSON(localStorage.getItem(CHAT_STORAGE_KEY), {});
}

export function saveConversation(character, messages) {
  const conversations = getStoredConversations();

  conversations[character] = {
    messages,
    savedAt: Date.now(),
  };

  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(conversations));
}

export function loadConversation(character) {
  const conversations = getStoredConversations();
  const savedConversation = conversations[character];

  if (!savedConversation) {
    return null;
  }

  const isExpired =
    Date.now() - savedConversation.savedAt > CHAT_STORAGE_DURATION;

  if (isExpired) {
    delete conversations[character];

    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(conversations));

    return null;
  }

  return savedConversation.messages || [];
}
