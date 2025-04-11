import { state } from "../utils/state.js";
import { elements } from "../utils/dom.js";

const loadNotepad = () => {
  elements.notepad.value = state.get("dashboard-notes", "");
  elements.notepad.addEventListener("input", () => {
    state.set("dashboard-notes", elements.notepad.value);
  });
};

export function initNotepad() {
  if (!elements.notepad) {
    console.error("Notepad element missing");
    return;
  }
  loadNotepad();
}
