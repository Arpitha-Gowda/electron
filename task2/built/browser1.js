"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
document.getElementById("submit").addEventListener("click", () => {
    let Data = {
        message: document.getElementById("message").value,
        backgroundColor: "black",
        color: 'white'
    };
    electron_1.ipcRenderer.send('trigger-browser-two', Data);
}, false);
//# sourceMappingURL=browser1.js.map