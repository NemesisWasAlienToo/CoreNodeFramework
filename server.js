const express = require("express");
const path = require("path");

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
app.get("/*", (req, res) => {

    console.log("Requested url : " + req.originalUrl);
    res.sendFile(path.resolve(__dirname, "wwwroot", "index.html"));
});

app.listen(process.env.PORT || 80, () => console.log("Listenning for http requests on PORT 80.\nReady."));