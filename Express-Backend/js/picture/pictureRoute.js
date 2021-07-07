const express = require("express");
const router = express.Router();
var formidable = require("formidable");
const fs = require("fs");
const sessionService = require("../session/sessionService");
service = require("./pictureService");
const ac = require("../../accessControl");

router.get("/", function (req, res){
    res.sendFile(process.env.DIR + "/fileUpload.html");
});

router.post("/", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).createOwn("picture");
    if (permission.granted) {
        var form = new formidable.IncomingForm();

        user = sessionService.getUser(req, res);
        username = user.username;
        form.parse(req);

        form.on("FileBegin", function (name, file) {
            file.path = "c:/temp/uploads" + file.name;
        });
        form.on("file", function (name, file) {
            var oldpath = file.path;

            dbPath = "/userImages/" + username + "/" + file.name;

            var newpath = process.env.DIR + "/userImages/" + username;

            if (!fs.existsSync(newpath)){
                fs.mkdirSync(newpath);
            }


            service.addPictureToUser(username, dbPath);

            newpath = newpath + "/" + file.name;

            console.log(newpath);
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write("File uploaded");
                res.end();
            });
        });
    }
    else {
        res.status(403).end();
    }
});

router.get("/delete", async function (req, res){
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).deleteOwn("picture");
    if (permission.granted) {
        user = await sessionService.getUser(req, res);
        username = user.username;
        service.deleteOwnPicture(req, res, username);
    }
    else {
        res.status(403).end();
    }
});

router.get("/deleteAny", async function (req, res){
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).deleteAny("picture");
    if (permission.granted) {
        user = await sessionService.getUser(req, res);
        username = user.username;
        service.deleteOwnPicture(req, res, username);
    }
    else {
        res.status(403).end();
    }
});

module.exports = router;