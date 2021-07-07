const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs");
const https = require("https");
const sessionService = require("./session/sessionService");
require("dotenv").config();
var http = require("http");
var formidable = require("formidable");
const cors = require("cors");

const app = express();
app.use(bodyparser.json());
app.use(function(req, res, next) {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors({
    exposedHeaders: ["Authorization"],
}));

const database = require("./database");

//Routen importieren
const privateMessage = require("./privateMessage/privateMessageRoute");
const session = require("./session/sessionRoute");
const user = require("./user/userRoute");
const lesegruppe = require("./lesegruppe/lesegruppeRouter");
const register = require("./register/registrationRouter");
const picture = require("./picture/pictureRoute");

//HTTPS implementieren
const key = fs.readFileSync("./certificates/key.pem");
const cert = fs.readFileSync("./certificates/cert.pem");
const server = https.createServer({key : key, cert : cert}, app);

app.use("/register", register);
app.use("/privateMessage", sessionService.isAuthenticated, privateMessage);
app.use("/login", session);
app.use("/user", sessionService.isAuthenticated, user);
app.use("/lesegruppe", sessionService.isAuthenticated, lesegruppe);
app.use("/picture", sessionService.isAuthenticated,  picture);

server.listen(8080);

http.createServer(function(req, res){
    if(req.url == "/fileupload"){
        var form = new formidable.IncomingForm();
        form.on("FileBegin", function(name, file){
            file.path = "c:/temp/uploads" + file.name;
        });
        form.parse(req, function(err, fields, files){
            var oldpath = files.filetoupload.path;
            var newpath = "C:/Users/johny/" + files.filetoupload.name;
            fs.rename(oldpath, newpath, function(err){
                if (err) throw err;  
                res.write("File uploaded");
                res.end();
            });
        });
    } else{
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.write("<form action='fileupload' method='post' enctype='multipart/form-data'>");
        res.write("<input type='file' name='filetoupload'><br>");
        res.write("<input type='submit'>");
        res.write("</form>");
        return res.end();
    }
}).listen(8081);