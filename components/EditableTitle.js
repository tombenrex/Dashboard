import { state } from "../utils/state.js";
import { elements } from "../utils/dom.js";

const setTitle = () => {
  elements.editable.textContent = state.get("headerContent", "Welcome User");
  elements.editable.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = elements.editable.textContent;
    elements.editable.textContent = "";
    elements.editable.appendChild(input);
    input.focus();
    input.addEventListener("blur", () => {
      const newValue = input.value.trim() || "Welcome User";
      elements.editable.textContent = newValue;
      document.title = newValue;
      state.set("headerContent", newValue);
      input.remove();
    });
  });
};

export function initEditableTitle() {
  if (!elements.editable) {
    console.error("Editable title element missing");
    return;
  }
  setTitle();
}
