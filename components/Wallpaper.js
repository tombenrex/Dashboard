import { fetchData } from "../utils/api.js";
import { state } from "../utils/state.js";
import { elements } from "../utils/dom.js";
import { showAlert } from "../utils/alert.js";

export const setWallpaper = async (
  apiKey = state.get("unsplashApiKey", "")
) => {
  if (!apiKey) {
    showAlert("No Unsplash API key found. Please apply API keys first.");
    return;
  }
  try {
    const {
      urls: { regular },
    } = await fetchData(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}&orientation=landscape`
    );
    document.body.style.transition = "background 0.7s ease";
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${regular}) no-repeat center/cover`;
    setTimeout(() => {
      document.body.style.transition = "";
    }, 700);
  } catch (err) {
    console.error("Failed to set wallpaper:", err);
    showAlert("Failed to load wallpaper. Check API key and connection.");
  }
};

export async function initWallpaper() {
  if (!elements.setWallpaperBtn) {
    console.error("Wallpaper button missing");
    return;
  }
  elements.setWallpaperBtn.addEventListener("click", () => setWallpaper());
  if (state.get("unsplashApiKey")) await setWallpaper();
}
