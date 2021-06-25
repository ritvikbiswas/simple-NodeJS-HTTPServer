/*const Person = require('./Person.js');
const person1 = new Person('John Doe', 30);

person1.greeting();
*/

/*
const Logger = require('./logger');
const logger = new Logger();

logger.on('message', (data) => console.log('Called Listener', data));

logger.log('Hello world');
*/


//import node modules that we need
const http = require('http');
const path = require('path');
const fs = require('fs');

//create server using HTTP module
const server = http.createServer((req, res) => {
    //console.log(req.url);
    // if(req.url === '/'){
    //     //then we know req is for index page
    //     //read index.html file
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if(err) console.log('Sorry there seems to be an error'); //error check
    //         else{
    //             res.writeHead(200, { 'Content-Type': 'text/html' }); //return status 200 and content type
    //             res.end(content); //load content
    //         }
    //     });
    // }
    // if(req.url === '/about'){
    //     //then we know req is for about page
    //     //read about.html file
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
    //         if(err) console.log('Sorry there seems to be an error'); //error check
    //         else{
    //             res.writeHead(200, { 'Content-Type': 'text/html' }); //return status 200 and content type
    //             res.end(content); //load content
    //         }
    //     });
    // }
    // if(req.url === '/api/users'){
    //     const users = [
    //         {name: 'Bob Smith', age: 40},
    //         {name: 'John Doe', age: 30}
    //     ];

    //     res.writeHead(200, { 'Content-Type': 'application/json' }); //return status 200 and content type
    //     res.end(JSON.stringify(users));
    // }


    //Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    //Build extension of filePath
    let extName = path.extname(filePath);
    //initial content type
    let contentType = 'text/html';
    //check ext and set content type
    switch(extName){
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if(err){
            if(err.code == 'ENOENT'){
                console.log('Sorry there seems to be an error with finding the page. File path is: ', filePath); //error check
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' }); //return status 200 and content type
                    res.end(content); //load content
                });
            }
            else{
                //some other server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else{
            res.writeHead(200, { 'Content-Type': `${contentType}` }); //return status 200 and content type
            res.end(content); //load content
        }
    });
});

//define PORT; use the first part for making sure we grab the right port on the dev server, otherwise use 5000
const PORT = process.env.PORT || 5000;

//start server to listen for connections
server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));