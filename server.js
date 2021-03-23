const express = require("express");
const path = require("path");
const https = require('https');
const fs = require('fs');

console.log(`
 ██████╗ ██████╗ ██████╗ ███████╗    ███╗   ██╗ ██████╗ ██████╗ ███████╗    ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝    ████╗  ██║██╔═══██╗██╔══██╗██╔════╝    ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝
██║     ██║   ██║██████╔╝█████╗      ██╔██╗ ██║██║   ██║██║  ██║█████╗      ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗  
██║     ██║   ██║██╔══██╗██╔══╝      ██║╚██╗██║██║   ██║██║  ██║██╔══╝      ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝  
╚██████╗╚██████╔╝██║  ██║███████╗    ██║ ╚████║╚██████╔╝██████╔╝███████╗    ███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗
 ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝
`);

console.log("Root directory is located at : " + __dirname);

const app = express();

console.log("Setting up static file routes");
app.use("/static", express.static(path.resolve(__dirname, "wwwroot", "static")));

console.log("Setting HTML routes");

app.get("/", (req, res) => {
    console.log("Requested url : " + req.originalUrl);
    res.sendFile(path.resolve(__dirname, "wwwroot", "index.html"));
});

app.get("/ServiceWorker.js", (req, res) => {

    console.log("Requested url : " + req.originalUrl);
    res.sendFile(path.resolve(__dirname, "wwwroot", "ServiceWorker.js"));
});

app.get("/manifest.json", (req, res) => {

    console.log("Requested url : " + req.originalUrl);
    res.sendFile(path.resolve(__dirname, "wwwroot", "manifest.json"));
});

app.get("/favicon.ico", (req, res) => {

    console.log("Requested url : " + req.originalUrl);
    res.sendFile(path.resolve(__dirname, "wwwroot", "favicon.ico"));
});

app.get("/*", (req, res) => {
    console.log("Requested url : " + req.originalUrl);
    res.sendFile(path.resolve(__dirname, "wwwroot", "index.html"));
});

/*
const options = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem')
};

var server = https.createServer(options, app);

server.listen(443, () => {
    console.log("Listenning for https requests on PORT 443.\nReady.");
});
*/

app.listen(process.env.PORT || 80, () => console.log("Listenning for http requests on PORT 80.\nReady."));