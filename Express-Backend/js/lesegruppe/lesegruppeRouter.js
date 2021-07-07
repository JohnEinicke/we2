const express = require("express");
const router = express.Router();
const service = require("./lesegruppeService");
const sessionService = require("../session/sessionService");
const ac = require("../../accessControl");

router.get("/", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).readAny("group");
    if(permission.granted){
        service.getAllGroups(req, res);
    }
    else{
        res.status(403).end();
    }
});

router.get("/myGroups", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).readAny("group");
    if(permission.granted){
        service.getMyGroups(req, res);
    }
    else{
        res.status(403).end();
    }
});

router.post("/create", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).createAny("group");
    if(permission.granted){
        service.createGroup(req);
    }
    else{
        res.status(403).end();
    }
});

router.post("/addMember", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).updateOwn("group");
    if(permission.granted){
        const group = await service.findGroup(req, res);
        if (group) {
            members = await service.addGroupMember(group, req, res);
            update = {member : members};
            service.updateGroup(group, update);
        }
        else {
            res.send("Gruppe existiert nicht.");
        }
    }
    else{
        res.status(403).end();
    }
});

router.post("/removeMember", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).updateOwn("group");
    if(permission.granted){
        const group = await service.findGroup(req, res);
        if (group) {
            members = await service.removeGroupMember(group, req, res);
        }
        else {
            res.send("Gruppe existiert nicht.");
        }
    }
    else{
        res.status(403).end();
    }
});

router.post("/createGroupMessage", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).createAny("groupMessage");
    if(permission.granted){
        const group = await service.findGroup(req, res);
        if (group) {
            user = await sessionService.getUser(req, res);
            username = user.username;
            service.sendGroupMessage(group, username, req, res);
        }
        else {
            res.send("Gruppe existiert nicht.");
        }
    }
    else{
        res.status(403).end();
    }
});

router.get("/readAllGroupMessages", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).readAny("groupMessage");
    if(permission.granted){
        service.getAllGroupMessages(req, res);
    }
    else{
        res.status(403).end();
    }
});

router.get("/readOwnGroupMessages", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).readOwn("groupMessage");
    if(permission.granted){
        service.getOwnGroupMessages(req, res);
    }
    else{
        res.status(403).end();
    }
});

router.get("/readPublicGroupMessages", async (req, res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).readOwn("groupMessage");
    if(permission.granted){
        service.getPublicGroupMessages(req, res);
    }
    else{
        res.status(403).end();
    }
});

router.post("/createPublicGroupMessage", async (req,res) => {
    role = await sessionService.getRole(req, res);
    const permission = ac.can(role).createAny("groupMessage");
    if(permission.granted){
        user = await sessionService.getUser(req, res);
        username = user.username;
        service.sendPublicGroupMessage(username, req, res);
        res.send({
            sucess : true
        })
    }
    else{
        res.status(403).end();
    }
});

module.exports = router;