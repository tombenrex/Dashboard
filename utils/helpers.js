export function formatTime(date) {
  return date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
