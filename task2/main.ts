console.log("main process working")

import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron';
import * as path from 'path';
// const { app, BrowserWindow, ipcMain, Tray, Menu } = require ('electron');
// const path = require ('path');
import * as url from 'url';

const iconPath = path.join(__dirname, 'idrive.jpg')
let tray = null;
const store: string[] = [];
let browser1: any, browser2: any;

function createWindow () {

  tray = new Tray(iconPath)

  // Create the browser window one.
  browser1 = new BrowserWindow({
    title: 'Browser one',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Create the browser window two.
  browser2 = new BrowserWindow({
    title: 'Browser two',
    webPreferences: {
      nodeIntegration: true
    }
  })

ipcMain.on('trigger-browser-two', (event: any, arg: { message: any; }) => {
  store.push(arg.message)
  browser2.webContents.send('browser-two', store);
});
  // and load the index.html of the app.
  setTimeout(() => {
    browser1.loadURL(`file:///${__dirname}/browser1.html`);
    browser2.loadURL(`file:///${__dirname}/browser2.html`);
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

  const contextMenu = Menu.buildFromTemplate([
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
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Tray App')
  

  browser1.webContents.openDevTools();
  browser2.webContents.openDevTools();

  // Emitted when the window is closed.
  app.on('window-all-closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    browser1 = null;
    browser2 = null;
})
}

app.whenReady().then(createWindow)
