"use strict";
import { ipcRenderer } from 'electron';
ipcRenderer.on('browser-two', function (event, args) {
    console.log(args);
    var myNode = document.getElementById("myList");
    myNode.innerHTML = '';
    args.forEach(function (value) {
        var x = document.createElement("LI");
        var t = document.createTextNode(value);
        x.appendChild(t);
        document.getElementById("myList").appendChild(x);
    });
});
