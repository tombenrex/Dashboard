import { state } from "../utils/state.js";
import { elements } from "../utils/dom.js";
import { showAlert } from "../utils/alert.js";

const createLinkElement = ({ name, url, favicon }) => {
  const div = document.createElement("div");
  div.className = "link-item";
  div.innerHTML = `
    <img src="${favicon}" alt="${name} favicon" class="favicon">
    <a href="${url}" target="_blank">${name}</a>
  `;

  const faviconImg = div.querySelector(".favicon");
  const linkElement = div.querySelector("a");

  faviconImg.addEventListener("click", () => {
    const input = document.createElement("input");
    input.value = linkElement.textContent;
    input.className = "edit-link-input";
    linkElement.replaceWith(input);
    input.focus();
    input.select();

    const saveName = () => {
      const newName = input.value.trim() || name;
      linkElement.textContent = newName;
      input.replaceWith(linkElement);
      const links = state
        .get("links", [])
        .map((link) => (link.url === url ? { ...link, name: newName } : link));
      state.set("links", links);
    };

    input.addEventListener("blur", saveName);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
    });
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  deleteBtn.onclick = () => {
    div.remove();
    state.set(
      "links",
      state.get("links", []).filter((l) => l.url !== url)
    );
  };

  div.appendChild(deleteBtn);
  elements.linkContainer.appendChild(div);
};

const addLink = () => {
  const input = elements.linkInput.value.trim();
  if (!input) return;

  let url = input.startsWith("http") ? input : `https://${input}`;
  if (!url.includes(".")) url += ".com";

  try {
    new URL(url);
  } catch {
    showAlert("Please enter a valid URL.");
    return;
  }

  const name = new URL(url).hostname.split(".")[0];
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  const favicon = `https://www.google.com/s2/favicons?domain=${url}`;

  const link = { name: formattedName, url, favicon };
  createLinkElement(link, true);
  state.set("links", [...state.get("links", []), link]);
  elements.linkInput.value = "";
};

const loadLinks = () => {
  state.get("links", []).forEach((link) => createLinkElement(link));
};

export function initLinks() {
  if (
    ![elements.linkInput, elements.linkContainer, elements.addLinkBtn].every(
      Boolean
    )
  )
    return;

  loadLinks();
  elements.addLinkBtn.addEventListener("click", addLink);
}
