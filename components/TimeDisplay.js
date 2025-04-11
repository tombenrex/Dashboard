import { formatTime } from "../utils/helpers.js";
import { elements } from "../utils/dom.js";

const updateTime = () => {
  const now = new Date();
  elements.time.textContent = formatTime(now);
  elements.date.textContent = now.toLocaleDateString("sv-SE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export function initTimeDisplay() {
  if (!elements.time || !elements.date) {
    console.error("Time or date element missing");
    return;
  }
  updateTime();
  setInterval(updateTime, 1000);
}
