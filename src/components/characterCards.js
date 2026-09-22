export function setupCharacterCards(onCharacterSelected) {
  const cards = document.querySelectorAll(".character-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const character = card.dataset.character || "snape";

      onCharacterSelected(character);
    });
  });
}
