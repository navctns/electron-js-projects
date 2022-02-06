
const fs = require("fs");
const http = require("http");
// const request = require('request');

fs.writeFileSync('hello.txt', 'Hello from Node js');
console.log('Hello from Node js');

const PORT = process.env.PORT || 8080;

// request.post('/quotes', function(){
//     // alert('abc');
//     console.log('abcd');
// });

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

    // req.post('/quotes', function(){
    //     // alert('abc');
    //     console.log('abcd');
    // });

    // res.end();
}).listen(PORT);