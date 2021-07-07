const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const service = require("./userService")
const sessionService = require("../session/sessionService");
const ac = require("../../accessControl");

router.get("/", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).readOwn("user");
    if(permission.granted){
        user = await sessionService.getUser(req, res);
        username = user.username;
        service.getUser(username, res);
    }
    else{
        res.status(403).end();
    }
});

router.delete("/deleteOwn", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).deleteOwn("user");
    if(permission.granted){
        user = await sessionService.getUser(req, res);
        username = user.username;
        service.deleteUser(username);
    }
    else{
        res.status(403).end();
    }
});

router.post("/deleteAnyUser", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).deleteAny("user");
    if(permission.granted){
        service.deleteUser(req.body.username);  
    }
    else{
        res.status(403).end();
    }
});

router.post("/addUser", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).createAny("user");
    if(permission.granted){
        service.addUser(req, res);
    }
    else{
        res.status(403).end();
    }
});

router.post("/getAnyUser", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).readAny("user");
    if(permission.granted){
        service.getUser(req.body.username, res);
    }
    else{
        res.status(403).end();
    }
});

router.post("/updateAnyUser", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).updateAny("user");
    if(permission.granted){
        service.updateUser(req.body.username, req.body.update, res);
    }
    else{
        res.status(403).end();
    }
});

module.exports = router;