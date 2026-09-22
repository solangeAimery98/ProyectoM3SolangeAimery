import { setSelectedCharacter } from "../state/appState.js";

import { resetConversationHistory } from "../state/chatState.js";

export function handleCharacterSelection(character, navigateTo) {
  setSelectedCharacter(character);

  resetConversationHistory();

  navigateTo("/chat");
}
