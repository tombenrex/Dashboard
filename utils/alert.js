export function showAlert(message, type = "error") {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  alert.style.position = "fixed";
  alert.style.top = "10px";
  alert.style.right = "10px";
  alert.style.padding = "10px";
  alert.style.background = type === "success" ? "#4caf50" : "#f44336";
  alert.style.color = "#fff";
  alert.style.borderRadius = "5px";
  alert.style.zIndex = "1000";
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}
