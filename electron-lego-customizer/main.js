const electron = require('electron');
const { app, BrowserWindow, ipcMain, Menu } = electron;
const path = require('path');
const url = require('url');

let mainWindow;
let addWindow;

//On start app
app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false
        }        
    });
    
    //add html
    mainWindow.loadFile('main-window.html')
    //add html by url
    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, 'main-window.html')
    // }))

    //Quit app when mainwindow is closed
    mainWindow.on('closed',function(){
        app.quit();
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
    
});

function createAddWindow(){
    addWindow = new BrowserWindow({
        width:300,
        height:200,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false
        }   
    });
    addWindow.loadFile('add-window.html')

    //garbage collection - clear memory when addWindow is closed
    addWindow.on('close', function(){
        addWindow = null;
    });
}

// create menu template
const mainMenuTemplate = [
    {
        'label':'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Quit',
                accelerator:process.platform === 'darwin'?'Command+Q':'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]

//If mac add emty object to menu templates - unless it shows electron an first menu
if(process.platform === 'darwin'){
    mainMenuTemplate.unshift({});
}
//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Toggle Devtools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                },
                accelerator:process.platform === 'darwin'?'Command+I':'Ctrl+I',
                
            },
            {
                role:'reload'
            }
        ]
    })
}