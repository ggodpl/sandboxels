import { loadOnlineSave } from "./saves";

export function generateCard(thread, sdk) {
    const { author, link, timestamp, tags, name } = thread;

    const id = link.split("/")[link.split("/").length - 1];

    const parent = document.createElement("div");
    parent.className = "savesBrowserCard";
    parent.id = id;

    const infoBox = document.createElement("div");
    infoBox.style.padding = "0.5em";
    infoBox.style.height = "calc(100% - 1em)";
    infoBox.style.display = "flex";
    infoBox.style.flexDirection = "column";

    const wrapper = document.createElement("div");
    wrapper.className = "savesBrowserInfoBox"

    wrapper.append(infoBox);

    const title = document.createElement("span");
    title.innerText = name;
    title.className = "savesBrowserCardTitle"

    const info = document.createElement("span");
    info.innerText = `${author}, ${parseTime(timestamp)}`;
    info.className = "savesBrowserInfo"

    const tagsList = document.createElement("span");
    tagsList.innerText = tags?.length > 0 ? tags.join(", ") : "No tags";
    tagsList.className = "savesBrowserTags";

    const includedMods = document.createElement("div");
    includedMods.className = "savesBrowserIncludedMods";

    const modsTitle = document.createElement("span");
    modsTitle.innerText = "Included mods";
    modsTitle.className = "savesBrowserIncludedModsTitle";

    const noMods = document.createElement("span");
    noMods.innerText = "No mods included";
    noMods.className = "noMods";
    noMods.style.display = "none";

    const notLoaded = document.createElement("span");
    notLoaded.innerText = "Loading...";
    notLoaded.className = "savesBrowserLoading";

    const mods = document.createElement("ul");
    mods.style.display = "none";

    includedMods.append(modsTitle, noMods, notLoaded, mods);

    const loadButton = document.createElement("span");
    loadButton.innerText = "Load";
    loadButton.className = "savesBrowserButtons";

    loadButton.onclick = () => {
        loadOnlineSave(id);
        closeMenu();
    }

    const viewButton = document.createElement("span");
    viewButton.innerText = "View";
    viewButton.className = "savesBrowserButtons";

    viewButton.onclick = () => {
        sdk.commands.openExternalLink({
            url: link
        })
    }

    const image = document.createElement("img");
    image.className = "savesBrowserImage";
    
    const imageOverlay = document.createElement("div");
    imageOverlay.className = "savesBrowserImageOverlay";

    const imageBox = document.createElement("div");
    imageBox.style.position = "absolute";
    imageBox.style.height = "100%";
    imageBox.style.width = "100%";

    image.style.left = "25%";

    imageBox.append(image, imageOverlay);

    image.onload = () => {
        requestAnimationFrame(() => {
            const cardWidth = parent.offsetWidth;
            if (image.offsetWidth <= (cardWidth * 0.8)) {
                image.style.left = "auto";
                image.style.right = "0";
            } else {
                image.style.left = "25%";
                image.style.right = "auto";
            }
        })
    }

    const buttons = document.createElement("div");
    buttons.className = "savesBrowserButtonBox";
    buttons.append(loadButton, viewButton);

    infoBox.append(title, info, tagsList, includedMods, buttons);

    parent.append(imageBox, wrapper);

    append(parent);
}

function append(element) {
    document.getElementById("savesBrowserLoader").style.display = "none";

    document.getElementById("savesBrowser").appendChild(element);
}

const pluralize = (string, amount) => string + (amount <= 1 ? "" : "s");

function parseTime(timestamp) {
    const diff = Date.now() - timestamp;
    const diffMinutes = Math.floor(diff / 1000 / 60);
    
    const minutes = diffMinutes % 60;
    const hours = Math.floor(diffMinutes / 60) % 60;
    const days = Math.floor(diffMinutes / 60 / 24) % 30;
    
    if (days > 7) return new Date(timestamp).toLocaleString();

    if (days <= 1) {
        if (hours <= 1) return `${minutes} ${pluralize("minute", minutes)} ago`;
        return `${hours} ${pluralize("hour", hours)} ago`
    }
    
    return `${days} ${pluralize("day", days)} ago`;
}