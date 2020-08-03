const { ipcRenderer } = require('electron');

document.getElementById("submit").addEventListener("click", () => {
    let Data = {
        message: document.getElementById("message").value,
        backgroundColor: "black",
        color: 'white'
    };
    ipcRenderer.send('trigger-browser-two', Data);
}, false);