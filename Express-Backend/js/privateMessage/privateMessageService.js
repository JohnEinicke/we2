const mongoose = require("mongoose");
const database = require("../database");
const privateMessage = require("../models/privateMessageModel");

function getUserMessages(username, res) {
    return new Promise((resolve, reject) => {
        privateMessage.find({ empfang: username }, function (err, privateMessages) {
            if (err) {
                reject(err);
            }

            else {
                resolve(privateMessages);
            }
        });
    });
};

function getMessages(res) {
    return new Promise((resolve, reject) => {
        privateMessage.find(function (err, privateMessages) {
            if (err) {
                reject(err);
            }

            else {
                resolve(privateMessages);
            }
        });
    });
};

function createMessage(req, res, user){
    const message = new privateMessage({
        subject: req.body.subject,
        messageText: req.body.messageText,
        sender: user,
        empfang: req.body.empfang 
    });

    console.log(req.body);
    message.save().then(() => {  
        console.log('Einträge wurden erstellt.');
        res.send(message);
    });
}

function deleteAnyMessage(req, res){
    privateMessage.deleteOne({ _id: req.body.id }, function (err) {
        if (err) res.send(err);
        console.log("Message entfernt.");
    });
}

function deleteOwnMessage(req, res, username){
    privateMessage.find({ _id: req.body.id }, function (err, privateMessages) {
        if (err) {
            res.send(err);
        }

        else {
            message = privateMessages[0];
            if (message){
                empfang = message.empfang;
                if(empfang == username){
                    message.remove().then(() => {
                        res.send("Nachricht wurde entfernt");
                    });
                }
                else{
                    res.send("Sie besitzen keine Message mit dieser ID");
                }
            }
            else{
                res.send("Sie besitzen keine Message mit dieser ID");
            }
        }
    });
}

module.exports = {
    getUserMessages,
    createMessage,
    getMessages,
    deleteAnyMessage,
    deleteOwnMessage
};