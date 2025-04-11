import { state } from "../utils/state.js";
import { elements } from "../utils/dom.js";
import { fetchApiKeys } from "../utils/api.js";
import { showAlert } from "../utils/alert.js";
import { setWallpaper } from "./Wallpaper.js";
import { setWeather } from "./Weather.js";
import { getTechVideo } from "./Youtube.js";

const resetApp = () => {
  state.clear();
  document.body.style.background = "";
  elements.editable.textContent = "Welcome User";
  elements.notepad.value = "";
  elements.linkContainer.innerHTML = "";
  elements.weather.innerHTML = "<h2>Today Weather</h2>";
  if (elements.videoContainer) elements.videoContainer.innerHTML = "";
  showAlert("LocalStorage has been cleared.");
  location.reload();
};

const applyApiKeys = async () => {
  const keys = await fetchApiKeys();
  if (keys) {
    state.set("weatherApiKey", keys.key1);
    state.set("unsplashApiKey", keys.key2);
    state.set("youtubeApiKey", keys.key3);
    await Promise.all([
      setWallpaper(keys.key2),
      setWeather(keys.key1),
      getTechVideo(),
    ]);
    showAlert("API keys applied successfully.", "success");
  }
};

export function initControls() {
  if (!elements.resetBtn || !elements.applyApiKeysBtn) {
    console.error("Control buttons missing");
    return;
  }
  elements.resetBtn.addEventListener("click", resetApp);
  elements.applyApiKeysBtn.addEventListener("click", applyApiKeys);
}
