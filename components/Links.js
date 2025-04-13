import { state } from "../utils/state.js";
import { elements } from "../utils/dom.js";
import { showAlert } from "../utils/alert.js";

const updateLinkName = (url, newName) => {
  const links = state.get("links", []);
  const updated = links.map((link) =>
    link.url === url ? { ...link, name: newName } : link
  );
  state.set("links", updated);
};

const deleteLink = (url, element) => {
  element.remove();
  state.set(
    "links",
    state.get("links", []).filter((link) => link.url !== url)
  );
};

const createDeleteButton = (url, container) => {
  const btn = document.createElement("button");
  btn.className = "delete-btn";
  btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  btn.onclick = () => deleteLink(url, container);
  return btn;
};

const enableInlineEdit = (faviconImg, linkElement, originalName, url) => {
  faviconImg.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = linkElement.textContent;
    input.className = "edit-link-input";
    linkElement.replaceWith(input);
    input.focus();
    input.select();

    const saveName = () => {
      const newName = input.value.trim() || originalName;
      linkElement.textContent = newName;
      input.replaceWith(linkElement);
      updateLinkName(url, newName);
    };

    input.addEventListener("blur", saveName);
    input.addEventListener("keydown", (e) => e.key === "Enter" && input.blur());
  });
};

// --- MAIN FUNCTION ---
const createLinkElement = ({ name, url, favicon }) => {
  const container = document.createElement("div");
  container.className = "link-item";

  container.innerHTML = `
    <img src="${favicon}" alt="${name} favicon" class="favicon">
    <a href="${url}" target="_blank">${name}</a>
  `;

  const faviconImg = container.querySelector(".favicon");
  const linkAnchor = container.querySelector("a");

  enableInlineEdit(faviconImg, linkAnchor, name, url);
  container.appendChild(createDeleteButton(url, container));
  elements.linkContainer.appendChild(container);
};

const getNormalizedUrl = (input) => {
  let url = input.startsWith("http") ? input : `https://${input}`;
  if (!url.includes(".")) url += ".com";
  return url;
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const getLinkData = (url) => {
  const name = new URL(url).hostname.split(".")[0];
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const favicon = `https://www.google.com/s2/favicons?domain=${url}`;
  return { name: formattedName, url, favicon };
};

const addLink = () => {
  const inputVal = elements.linkInput.value.trim();
  if (!inputVal) return;

  const url = getNormalizedUrl(inputVal);
  if (!isValidUrl(url)) {
    showAlert("Please enter a valid URL.");
    return;
  }

  const link = getLinkData(url);
  createLinkElement(link);
  state.set("links", [...state.get("links", []), link]);
  elements.linkInput.value = "";
};

const loadLinks = () => {
  state.get("links", []).forEach(createLinkElement);
};

export function initLinks() {
  const { linkInput, linkContainer, addLinkBtn } = elements;
  if (![linkInput, linkContainer, addLinkBtn].every(Boolean)) return;

  loadLinks();
  addLinkBtn.addEventListener("click", addLink);
}
