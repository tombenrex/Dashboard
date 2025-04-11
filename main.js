import { initTimeDisplay } from "./components/TimeDisplay.js";
import { initWallpaper } from "./components/Wallpaper.js";
import { initEditableTitle } from "./components/EditableTitle.js";
import { initNotepad } from "./components/Notepad.js";
import { initLinks } from "./components/Links.js";
import { initWeather } from "./components/Weather.js";
import { initYouTube } from "./components/Youtube.js";
import { initControls } from "./components/Controls.js";
import { showAlert } from "./utils/alert.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    initTimeDisplay();
    initEditableTitle();
    initNotepad();
    initLinks();
    await Promise.all([initWallpaper(), initWeather(), initYouTube()]);
    initControls();
  } catch (err) {
    console.error("Initialization failed:", err);
    showAlert("Failed to initialize dashboard. Please try again.");
  }
});
