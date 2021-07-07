const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const service = require("./privateMessageService");
const sessionService = require("../session/sessionService");
const ac = require("../../accessControl");

//Datenbank Verbinden
const database = require("../database");

router.get("/", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).readOwn("message");
    if(permission.granted){
        user = await sessionService.getUser(req, res);
        username = user.username;
        messages = await service.getUserMessages(username, res);
        res.send(messages);  
    }
    else{
        res.status(403).end();
    }
});

router.get("/getAllMessages", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).readAny("message");
    if(permission.granted){
        messages = await service.getMessages(res);
        res.send(messages);  
    }
    else{
        res.status(403).end();
    }
});

router.post("/createMessage", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).createOwn("message");
    if(permission.granted){
        user = await sessionService.getUser(req, res);
        username = user.username;
        service.createMessage(req, res, username);
    }
    else{
        res.status(403).end();
    }
});

router.post("/deleteAnyMessage", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).deleteAny("message");
    if(permission.granted){
        service.deleteAnyMessage(req, res);
    }
    else{
        res.status(403).end();
    }
});

router.post("/deleteMessage", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).deleteOwn("message");
    if(permission.granted){
        user = await sessionService.getUser(req, res);
        username = user.username;
        service.deleteOwnMessage(req, res, username);
    }
    else{
        res.status(403).end();
    }
});




module.exports = router;