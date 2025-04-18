document.addEventListener("click", (ev) => {
    const target = ev.target.id;
    switch (target) {
        case "shiftButton":
            toggleShift();
            focusGame();
            break;
        case "pauseButton":
            togglePause();
            focusGame();
            break;
        case "frameButton":
            doFrame();
            focusGame();
            break;
        case "sizeDownButton":
            mouseSize -= shiftDown ? mouseSize - 1 : 2;
            checkMouseSize(true);
            centerMouse();
            focusGame();
            break;
        case "sizeUpButton":
            mouseSize += shiftDown ? 14 : 2;
            checkMouseSize(true);
            centerMouse();
            focusGame();
            break;
        case "resetButton":
            resetPrompt();
            break;
        case "replaceButton":
            if (mode == "replace") {
                mode = null;
                ev.target.setAttribute("on", "false");
            } else {
                mode = "replace";
                ev.target.setAttribute("on","true");
            };
            focusGame();
            break;
        case "elemSelectButton":
            chooseElementPrompt();
            break;
        case "tpsButton":
            tpsPrompt();
            break;
        case "infoButton":
        case "savesButton":
        case "modsButton":
        case "settingsButton":
        case "savesBrowserButton":
            const menu = target.replace("Button", "");
            const shown = showingMenu;
            closeMenu();
            if (shown != menu) {
                if (target == "infoButton") showInfo("");
                if (target == "savesButton") showSaves();
                if (target == "modsButton") showModManager();
                if (target == "settingsButton") showSettings();
                if (target == "savesBrowserButton") showSavesBrowser(); 
            }
            break;
        case "resetDiscovered":
            if (confirm('WARNING: This action will RESET ALL DISCOVERED ELEMENTS and refresh the page.')) {
                settings.unlocked = {};
                saveSettings();
                location.reload();
            }
            break;
        case "resetAll":
            if (confirm('WARNING: This action will RESET ALL YOUR DATA, not including save slots, and refresh the page.')) {
                localStorage.removeItem('settings');
                location.reload();
            }
            break;
        case "clearMods":
            if (confirm('WARNING: This action will remove all enabled mods and refresh the page.')) {
                localStorage.removeItem('enabledMods');
                location.reload();
            }
            break;
        case "clearSaves":
            if (confirm('WARNING: This action will PERMANENTLY ERASE all local save slots.')){
                for (var i = 1; i <= 12; i++) {
                    localStorage.removeItem('SandboxelsSaves/'+i);
                }
                closeMenu();
                showSaves();
            }
            break;
        default:
            break;
    }
    if (target == "infoBackButton") infoBack();
    if (target == "saveFile") saveToFile();
    if (target == "loadFile") loadFromFile();
    if (target == "saveConfirm") confirmSave();
    if (target == "promptOK") handlePrompt();
    if (target == "promptCancel") handlePrompt(false);
    if (target == "promptConfirm") handlePrompt(true);

    if (target.startsWith("settingLabel")) {
        const input = target.replace("settingLabel-", "");
        toggleInput(ev.target, input, false);
    }

    const classList = ev.target.classList;

    if (classList.contains("XButton")) {
        closeMenu();
    }
    if (classList.contains("removeModX")) {
        const sibling = ev.target.previousElementSibling; // the previous element is the link
        const mod = sibling.innerText;
        removeMod(mod.replaceAll('"','\\\"'));
    }
    if (classList.contains("toggleInput")) {
        toggleInput(ev.target, undefined, false);
    }
})