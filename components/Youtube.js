import { fetchData } from "../utils/api.js";
import { state } from "../utils/state.js";
import { elements } from "../utils/dom.js";
import { getRandomNumber } from "../utils/helpers.js";
import { showAlert } from "../utils/alert.js";

export const getTechVideo = async () => {
  const apiKey = state.get("youtubeApiKey", "");
  if (!apiKey) return;

  try {
    const { items } = await fetchData(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=Javascript&maxResults=10&type=video&key=${apiKey}`
    );

    if (!items?.length) {
      showAlert("No videos found!");
      return;
    }

    const videoId = items[getRandomNumber(items.length)].id.videoId;
    let videoContainer = elements.videoContainer;

    if (!videoContainer) {
      videoContainer = document.createElement("div");
      videoContainer.id = "video-container";
      elements.videoContainer = videoContainer;

      elements.youtube.insertBefore(videoContainer, elements.techVideoBtn);
    }

    videoContainer.classList.remove("loaded");
    videoContainer.innerHTML = `
      <iframe 
        src="https://www.youtube.com/embed/${videoId}" 
        allowfullscreen 
        frameborder="0"
      ></iframe>
    `;
    setTimeout(() => videoContainer.classList.add("loaded"), 10);
  } catch (err) {
    console.error("Failed to load video:", err);
    showAlert("Something went wrong. Check the console for details.");
  }
};

export async function initYouTube() {
  if (!elements.youtube || !elements.techVideoBtn) {
    console.error("YouTube elements missing");
    return;
  }

  elements.techVideoBtn.addEventListener("click", getTechVideo);

  if (state.get("youtubeApiKey")) await getTechVideo();
}
