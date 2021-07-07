const mongoose = require("mongoose");
const readinggroup = require("../models/lesegruppeModel");
const groupMessage = require("../models/groupMessageModel");
const sessionService = require("../session/sessionService");
//Datenbank Verbinden
const database = require("../database");


function createGroup(req){

    const group = new readinggroup({
        groupname: req.body.groupname,
        member: req.body.member 
    });

    group.save().then(() => {  
        console.log('Einträge wurden erstellt.');
    });
}

function getAllGroups(req, res){
    readinggroup.find(function(err, readingGroup)
    {
        if(err)
        {
            res.send("Problem to retrieve group from database");
        }

        else
        {
            
            res.send(readingGroup);
        }
    });
}

function getMyGroups(req, res){
    readinggroup.find(async function(err, readingGroup)
    {
        if(err)
        {
            res.send("Problem to retrieve group from database");
        }

        else
        {
            groups = {
            groupname : []
            }

            for (let i = 0; i < readingGroup.length; i++) {
                members = readingGroup[i].member;
                user = await sessionService.getUser(req, res);
                username = user.username;
                const index = members.indexOf(username);
                if(index > -1){
                    groups.groupname.push(readingGroup[i].groupname);
                }
            }

            res.send(groups);
        }
    });
}

function findGroup(req, res){
    return new Promise((resolve, reject) => {
    readinggroup.find({groupname : req.body.groupname}).exec(function(err, readingGroup)
    {
        if(err)
        {
            reject(err);
        }

        else
        {
            resolve(readingGroup[0]);
        }
    });
});
}

function updateGroup(readingGroup, update){
    readingGroup.update(update);
    readingGroup.save().then(() => {  
        console.log('Einträge wurden erstellt.');
    });
}

function addGroupMember(readingGroup, req, res){
    return new Promise(async (resolve) => {
        var members = readingGroup.member;
        user = await sessionService.getUser(req, res);
        username = user.username;
        members.push(username);
        resolve(members);
    });
}

async function removeGroupMember(readingGroup, req, res){
    var members = readingGroup.member;
    user = await sessionService.getUser(req, res);
    username = user.username;
    const index = members.indexOf(username);
    if(index > -1){
        members.splice(index, 1);
        readingGroup.update({member : members});
        if(members.length != 0){
            readingGroup.save().then(() => {  
                console.log('Einträge wurden erstellt.');
            });
        }
        else{
            readingGroup.remove().then(() => {
                console.log("Gruppe ist leer und wurde entfernt");
            });
        }
    }
    else{
        console.log("Sie sind kein Mitglied dieser Gruppe.");
    }
}

function createGroupMessage(readingGroup, username, req){
    const message = new groupMessage({
        subject : req.body.subject,
        messageText : req.body.messageText,
        sender : username,
        group : readingGroup.groupname,
        empfang : readingGroup.member
    });

    return message;
}

function createPublicGroupMessage(username, req){
    const message = new groupMessage({
        subject : req.body.subject,
        messageText : req.body.messageText,
        sender : username,
        group : "public"
    });

    return message;
}

function sendGroupMessage(readingGroup, username, req, res){
    const empfang = readingGroup.member;
    const index = empfang.indexOf(username);
    if(index > -1){
        message = createGroupMessage(readingGroup, username, req);

        message.save().then(() => {  
            console.log('Einträge wurden erstellt.');
        });
    }
    else{
        res.send("Sender ist kein Mitglied der Gruppe");
    }
}

function sendPublicGroupMessage(readingGroup, username, req, res){
    message = createPublicGroupMessage(readingGroup, username, req);
    message.save().then(() => {  
            console.log('Einträge wurden erstellt.');
        });
}

function getAllGroupMessages(req, res){
    groupMessage.find(function(err, groupMessage)
    {
        if(err)
        {
            res.send(err);
        }

        else
        {
            res.send(groupMessage);
        }
    });
}

function getPublicGroupMessages(req, res){
    groupMessage.find({ group: "public" }, function(err, groupMessage)
    {
        if(err)
        {
            res.send(err);
        }

        else
        {
            res.send(groupMessage);
        }
    });
}

async function getOwnGroupMessages(req, res){
    const user = await sessionService.getUser(req, res);
    username = user.username;

    groupMessage.find(function(err, groupMessage)
    {
        if(err)
        {
            res.send(err);
        }

        else
        {
            const ownMessages = [];
            groupMessage.forEach(message => {
                if(message.empfang.includes(username)){
                    ownMessages.push(message);
                }
            });
            res.send(ownMessages);
        }
    });
};

module.exports = {
    createGroup,
    findGroup,
    updateGroup,
    addGroupMember,
    removeGroupMember,
    getAllGroups,
    sendGroupMessage,
    getAllGroupMessages,
    getOwnGroupMessages,
    getMyGroups,
    getPublicGroupMessages,
    sendPublicGroupMessage
};