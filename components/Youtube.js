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

    // Create container only once and insert it before the button
    if (!videoContainer) {
      videoContainer = document.createElement("div");
      videoContainer.id = "video-container";
      elements.videoContainer = videoContainer;

      // Insert it before the button
      elements.youtube.insertBefore(videoContainer, elements.techVideoBtn);
    }

    // Update the video content
    videoContainer.classList.remove("loaded");
    videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
    setTimeout(() => videoContainer.classList.add("loaded"), 10);

  } catch (err) {
    console.error("Failed to load video:", err);
    showAlert("Something went wrong. Check the console for details.");
  }
};