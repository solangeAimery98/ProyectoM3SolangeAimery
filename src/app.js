import { renderMessage } from "./chat.js";

const messages = [
  {
    role: "snape",
    content: "¿Qué desea?",
  },
  {
    role: "user",
    content: "Quería hablar contigo, profesor.",
  },
  {
    role: "snape",
    content: "Entonces hable. No tengo toda la noche.",
  },
];

messages.forEach((message) => {
  renderMessage(message.role, message.content);
});
