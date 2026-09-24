const sendAudio = new Audio("/src/assets/audio/send.mp3");
const receiveAudio = new Audio("/src/assets/audio/receive.mp3");
const ambientAudio = new Audio("/src/assets/audio/ambient.mp3");

const SEND_VOLUME = 0.35;
const RECEIVE_VOLUME = 0.4;
const AMBIENT_VOLUME = 0.15;

sendAudio.volume = SEND_VOLUME;
receiveAudio.volume = RECEIVE_VOLUME;
ambientAudio.volume = AMBIENT_VOLUME;

sendAudio.preload = "auto";
receiveAudio.preload = "auto";
ambientAudio.preload = "auto";

ambientAudio.loop = true;

export function playSendSound() {
  sendAudio.currentTime = 0;
  sendAudio.play().catch(() => {});
}

export function playReceiveSound() {
  receiveAudio.currentTime = 0;
  receiveAudio.play().catch(() => {});
}

export function playAmbientMusic() {
  ambientAudio.play().catch(() => {});
}

export function pauseAmbientMusic() {
  ambientAudio.pause();
}

export function isAmbientMusicPlaying() {
  return !ambientAudio.paused;
}
