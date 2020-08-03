const { ipcRenderer } = require('electron');

ipcRenderer.on('browser-two', function (event, args) {
    console.log(store);
    let x = document.createElement("LI");
    let t = document.createTextNode(args.message);
    x.appendChild(t);
    document.getElementById("myList").appendChild(x);
});