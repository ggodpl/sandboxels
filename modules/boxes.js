let activeDialog = null;
let dialogPromise = null;

function createDialog(title, message, options = {}) {
    if (activeDialog) {
        document.body.removeChild(activeDialog);
    }

    const dialogParent = document.createElement('div');
    dialogParent.className = 'menuParent';
    dialogParent.style.display = 'block';
    dialogParent.style.zIndex = 1001;
    dialogParent.style.padding = ".5em";

    const menuScreen = document.createElement("div");
    menuScreen.classname = "menuScreen";

    const xButton = document.createElement("button");
    xButton.innerText = "-";
    xButton.className = "XButton";

    xButton.onclick = () => {
        closeDialog(null);
    }

    const menuTitle = document.createElement("span");
    menuTitle.className = "menuTitle";
    menuTitle.innerText = title;
    
    const box = document.createElement("div")
    box.className = "menuText";
    box.style.paddingTop = "1em";
    box.style.overflowY = "auto";
    box.style.overflowX = "hidden";
    box.style.height = "calc(100% - 6em)";

    const content = document.createElement("div");
    content.innerText = message;

    box.appendChild(content);

    if (options.inputField) {
        const setting = document.createElement("span");
        setting.className = "setting-span";
        setting.style.marginTop = "1em";

        const input = document.createElement("input");
        input.type = "text";
        input.id = "dialogInput";
        input.value = options.defaultValue || "";
        input.placeholder = options.placeholder || "Input...";
        input.style.width = "100%";

        input.onkeydown = (ev) => {
            if (ev.key == "Enter") {
                closeDialog(value);
            }
        }

        input.onload = () => {
            input.focus();
        }
        
        setting.appendChild(input);

        box.appendChild(setting);
    }

    const buttonsBox = document.createElement("div");
    buttonsBox.style.marginTop = "2em";
    buttonsBox.style.textAlign = "center";

    if (options.buttons) buttonsBox.append(...options.buttons);
    else {
        const okButton = document.createElement("button");
        okButton.id = "dialogOkButton";
        okButton.class = "dialogButton";
        okButton.style.cursor = "pointer";
        okButton.innerText = "OK";
        buttonsBox.appendChild(okButton);
    }

    box.appendChild(buttonsBox);

    dialogParent.append(xButton, menuTitle, box);

    const overlay = document.createElement("div");
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    overlay.style.zIndex = 1000;

    document.body.append(overlay, dialogParent);
    activeDialog = dialogParent;
}

function closeDialog(value) {
    if (activeDialog) {
        document.body.removeChild(activeDialog);
        activeDialog = null;
        
        if (dialogPromise && dialogPromise.resolve) {
            dialogPromise.resolve(value);
            dialogPromise = null;
        }
    }
}

export async function alert(message, title = "Alert") {
    return new Promise(resolve => {
        dialogPromise = { resolve };
        
        createDialog(title, message);
        
        const okButton = document.getElementById('dialogOkButton');
        if (okButton) {
            okButton.onclick = () => {
                closeDialog();
            };
        }
    });
}

export async function confirm(message, title = "Confirm") {
    return new Promise(resolve => {
        dialogPromise = { resolve };

        const confirmButton = document.createElement("button");
        confirmButton.style.cursor = "pointer";
        confirmButton.innerText = "Yes";
        confirmButton.className = "promptOK";
        confirmButton.style.width = "50%";

        confirmButton.onclick = () => {
            closeDialog(true)
        };

        const cancelButton = document.createElement("button");
        cancelButton.style.cursor = "pointer";
        cancelButton.className = "promptOK";
        cancelButton.innerText = "No";
        cancelButton.style.width = "50%";
        cancelButton.style.left = "50%";

        cancelButton.style.borderLeft = "4px solid #9d9d9d";

        cancelButton.onclick = () => {
            closeDialog(false);
        };
        
        createDialog(title, message, {
            buttons: [cancelButton, confirmButton]
        });
    });
}

export async function prompt(message, defaultValue = "", title = "Prompt") {
    return new Promise(resolve => {
        dialogPromise = { resolve };

        const confirmButton = document.createElement("button");
        confirmButton.style.cursor = "pointer";
        confirmButton.style.innerText = "OK";
        confirmButton.className = "promptOK";

        confirmButton.onclick = () => {
            const input = document.getElementById('dialogInput');
            closeDialog(input ? input.value : null);
        };
        
        createDialog(title, message, {
            inputField: true,
            defaultValue: defaultValue,
            buttons: [confirmButton]
        });
    });
}

window.originalAlert = window.alert;
window.originalConfirm = window.confirm;
window.originalPrompt = window.prompt;

globalThis.alert2 = alert;
globalThis.confirm2 = confirm;
globalThis.prompt2 = prompt;