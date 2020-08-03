import { ipcRenderer } from 'electron';

document.getElementById("submit").addEventListener("click", () => {
    let Data = {
        message: (<HTMLInputElement>document.getElementById("message")).value,
        backgroundColor: "black",
        color: 'white'
    };
    ipcRenderer.send('trigger-browser-two', Data);
}, false);