
const http = require('http');
const https = require('https');
const url  = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const handlers = require('./lib/handlers')

// var _data = require('./lib/data');

// _data.delete('test','newFile',function(err){
//     console.log("There was an error ",err );
// });


//HTTP server instance
const httpServer = http.createServer((req,res)=>{
    unifiedServer(req,res);
});
//Starting up HTTP server
httpServer.listen(config.http,()=>{
    console.log("App listerning on port "+ config.http +"  "+ config.envName);
});

var httpsServerOptions = {
    key : fs.readFileSync('./https/server.key'),
    cert : fs.readFileSync('./https/server.cert')
};
//HTTPS server instance
const httpsServer = https.createServer(httpsServerOptions,(req, res)=>{
    unifiedServer(req,res);
});
//Starting up HTTPS server
httpsServer.listen(config.https,()=>{
    console.log("App listerning on port "+ config.https +"  "+ config.envName);
});

//Unified server
const unifiedServer = (req,res)=>{

    const parsedUrl = url.parse(req.url, true);

    const path = parsedUrl.pathname;

    const trimmedPath = path.replace(/^\/+|\/+$/g,'');

    //Get method
    const method = req.method.toLocaleLowerCase();
    //Get query
    const queryStringObject = parsedUrl.query;
    //Get headers
    const headers = req.headers;
    //Get payload
    const decoder = new StringDecoder('utf-8');
    let buffer='';
    req.on('data',function(data){
       buffer += decoder.write(data);
    });
    req.on('end',function(){
        buffer += decoder.end();

        var choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        var data = {
            'trimmedPath' : trimmedPath,
            'queryString' : queryStringObject,
            'headers' : headers,
            'payload' : buffer,
            'methodType': method
        };

        choosenHandler(data, function(statusCode,payload){

            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            payload = typeof(payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log("This the response",statusCode, payloadString);
        });
    //Send a response after the buffer loading is over
    

    
    });

};

var router = {
    'auth': handlers.auth,
    'user': handlers.user,
    'feed' : handlers.feed,
    'event': handlers.events,
    'push' : handlers.notifications
};