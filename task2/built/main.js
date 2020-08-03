"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("main process working");
const electron_1 = require("electron");
const path = require("path");
const iconPath = path.join(__dirname, '../idrive.jpg');
let tray = null;
const store = [];
let browser1, browser2;
function createWindow() {
    tray = new electron_1.Tray(iconPath);
    // Create the browser window one.
    browser1 = new electron_1.BrowserWindow({
        title: 'Browser one',
        webPreferences: {
            nodeIntegration: true
        }
    });
    // Create the browser window two.
    browser2 = new electron_1.BrowserWindow({
        title: 'Browser two',
        webPreferences: {
            nodeIntegration: true
        }
    });
    electron_1.ipcMain.on('trigger-browser-two', (event, arg) => {
        store.push(arg.message);
        browser2.webContents.send('browser-two', store);
    });
    // and load the index.html of the app.
    setTimeout(() => {
        browser1.loadURL(`file:///${__dirname}/../browser1.html`);
        browser2.loadURL(`file:///${__dirname}/../browser2.html`);
    }, 2000);
    // browser1.loadFile(url.format({
    //   pathname: path.join(__dirname, 'browser1.html'),
    //   // pathname: 'http://192.168.43.41:8080/iDrive/electron/task1/browser1.html',
    //   protocol: 'file:',
    //   slashes: true}))
    // browser2.loadFile(url.format({
    //   pathname: path.join(__dirname, 'browser2.html'),
    //   // pathname: 'http://192.168.43.41:8080/iDrive/electron/task1/browser2.html',
    //   protocol: 'file:',
    //   slashes: true}))
    // browser1.loadFile('browser1.html')
    // browser2.loadFile('browser2.html')
    const contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Reverse',
            type: 'radio',
            click() {
                store.reverse();
                browser2.webContents.send('browser-two', store);
            }
        },
        {
            label: 'Sort',
            type: 'radio',
            click() {
                store.sort();
                browser2.webContents.send('browser-two', store);
            }
        }
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Tray App');
    browser1.webContents.openDevTools();
    browser2.webContents.openDevTools();
    // Emitted when the window is closed.
    electron_1.app.on('window-all-closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        browser1 = null;
        browser2 = null;
    });
}
electron_1.app.whenReady().then(createWindow);
//# sourceMappingURL=main.js.map