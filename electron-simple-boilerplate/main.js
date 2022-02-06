const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron

let mainWindow;

//On start app
app.on('ready', ()=>{
    mainWindow = new BrowserWindow({});
    
    mainWindow.loadFile('main-window.html')
});