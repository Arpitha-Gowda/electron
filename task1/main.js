console.log("main process working")

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url')

let browser1, browser2;

function createWindow () {
  // Create the browser window one.
  browser1 = new BrowserWindow({
    title: 'Browser one'
  })

  // Create the browser window two.
  browser2 = new BrowserWindow({
    title: 'Browser two'
  })

  // and load the index.html of the app.
  browser1.loadFile(url.format({
    // pathname: path.join(__dirname, 'browser1.html'),
    pathname: 'http://192.168.43.41:8080/iDrive/electron/task1/browser1.html',
    protocol: 'file:',
    slashes: true}))
  browser2.loadFile(url.format({
    // pathname: path.join(__dirname, 'browser2.html'),
    pathname: 'http://192.168.43.41:8080/iDrive/electron/task1/browser2.html',
    protocol: 'file:',
    slashes: true}))

    // browser1.loadFile('browser1.html')
    // browser2.loadFile('browser2.html')

  browser1.webContents.openDevTools();
  browser2.webContents.openDevTools();

  ipcMain.on('trigger-browser-two', (event, arg) => {
    browser2.webContents.send('browser-two', arg);
  });

  // Emitted when the window is closed.
  app.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    browser1 = null;
    browser2 = null;
})
}

app.whenReady().then(createWindow)
