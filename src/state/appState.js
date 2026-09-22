const SELECTED_CHARACTER_KEY = "selectedCharacter";

let isNavigationLocked = false;
let lockedPath = null;

export function getSelectedCharacter() {
  return sessionStorage.getItem(SELECTED_CHARACTER_KEY) || "snape";
}

export function setSelectedCharacter(character) {
  sessionStorage.setItem(SELECTED_CHARACTER_KEY, character);
}

export function lockNavigation(path) {
  isNavigationLocked = true;
  lockedPath = path;
}

export function unlockNavigation() {
  isNavigationLocked = false;
  lockedPath = null;
}

export function getNavigationLockState() {
  return {
    isLocked: isNavigationLocked,
    lockedPath,
  };
}
