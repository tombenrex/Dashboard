export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
}

export async function fetchApiKeys() {
  const password = prompt("Enter your password to get API keys:").trim();
  if (!password) {
    alert("Please enter a password.");
    return null;
  }
  try {
    const response = await fetch(
      "https://the-dashboard-backend.onrender.com/api/authenticate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );
    const data = await response.json();
    if (data.success) {
      return data.apiKeys;
    }
    alert(data.error || "Authentication failed. Check your password.");
    return null;
  } catch (err) {
    console.error("API key fetch error:", err);
    alert("Error connecting to server. Check your connection.");
    return null;
  }
}
