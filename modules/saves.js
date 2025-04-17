export async function updateWithSaveData(id) {
    const modsList = await fetch(`/.proxy/api/mods/${id}`).then(d => d.json());
    const image = await fetch(`/.proxy/api/images/${id}`).then(d => d.blob());

    const mods = document.getElementById(id).querySelector(".savesBrowserIncludedMods");
    
    if (modsList.length > 0) {
        const list = mods.querySelector("ul");
        list.style.display = "block";

        for (const mod of modsList) {
            const li = document.createElement("li");
            li.innerText = mod.split("/")[1];
            list.appendChild(li);
        }
    } else {
        if (mods.querySelector(".noMods")) mods.querySelector(".noMods").style.display = "block"; 
    }
    
    if (mods.querySelector(".savesBrowserLoading")) mods.querySelector(".savesBrowserLoading").style.display = "none";

    const img = document.getElementById(id).querySelector(".savesBrowserImage");
    const reader = new FileReader();
    reader.onloadend = () => {
        const data = reader.result;
        if (img) img.src = data;
    }
    reader.readAsDataURL(image);
}

export async function loadOnlineSave(id) {
    const save = await fetch('/.proxy/api/save/' + id).then(d => d.json());

    if (!save) return false;
    
    loadSave(save);
    return true;
}