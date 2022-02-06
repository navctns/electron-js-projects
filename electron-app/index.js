
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const http = require("http");

let mainWindow;

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true
        }
    });
    
    mainWindow.loadFile('renderer.html')
});

app.on('app:add-text-file', ()=>{
    console.log('[message received]', 'app:display-image');
    fs.writeFileSync('hello1.txt', 'Hello from Node js');
})



fs.writeFileSync('hello.txt', 'Hello from Node js');
console.log('Hello from Node js');

const PORT = process.env.PORT || 8080;



http.createServer((req,res)=>{
    // console.log('abc');
    // res.write('Welcome to Node js');
    if(req.url === '/'){
        fs.readFile('./index.html', function(err, data){
            if(err) throw err;
            res.writeHead(200, {'Content-Type':'text/html', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
    }else if(req.url === '/about'){
        fs.readFile('./about.html', function(err, data){
            if(err) throw err;
            res.writeHead(200, {'Content-Type':'text/html', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
    }

    // res.end();
}).listen(PORT);