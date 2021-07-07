const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const database = require("../database");
const userModel = require("../models/userModel");

function getUsernameFromHeader(req) {
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const username = credentials.split(":")[0];
    return username;
}

function getRole(username) {
    return new Promise((resolve, reject) => {
        userModel.find({ username: username }, function (err, user) {
            if (err) {
                reject(err);
            }

            else {
                resolve(user[0].role);
            }
        });
    });
}

function getUser(username, res) {
    userModel.find({ username: username }, function (err, user) {
        if (err) {
            res.send("Problem to retrieve messages from database");
        }

        else {
            res.send(user);
        }
    });
}

function getUserForSession(username) {
    return new Promise((resolve, reject) => {
        userModel.find({ username: username }, function (err, user) {
            if (err) {
                reject(err);
            }

            else {
                resolve(user[0]);
            }
        });
    });
}

function getUserByToken(token, res) {
    return new Promise((resolve, reject) => {
        userModel.find({ activationToken: token }, function (err, user) {
            if (err) {
                reject(err);
            }

            else {
                resolve(user[0]);
            }
        });
    });
}

function addUser(req, res) {
    const user = new userModel({
        active: true,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    });

    user.save().then(() => {
        console.log('Einträge wurden erstellt.');
    });
}

function registerUser(req, res, token, expiration) {
    const user = new userModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        activationToken: token,
        activationExpiration: expiration
    });

    user.save().then(() => {
        console.log('Einträge wurden erstellt.');
    });
}

function authenticate(username, password) {
    return new Promise((resolve, reject) => {
        userModel.find({ username: username }, function (err, user) {
            if (err) {
                reject(err);
            }

            else if (user[0]) {
                user[0].comparePassword(password, function (err, isMatch) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(isMatch);
                    }
                });
            }
            else {
                resolve(false);
            }
        });
    });
};

function deleteUser(username) {
    userModel.deleteOne({ username: username }).then(() => {
        console.log("User entfernt.");
    });;
};

function updateUser(username, update, res) {
    userModel.find({ username: username }, function (err, user) {
        if (err) {
            res.send("Problem to retrieve messages from database");
        }

        else {
            user = user[0];
            user.updateOne(update).then(() => {
                console.log("User bearbeitet.");
            });
        }
    });
};

module.exports = {
    authenticate,
    getUser,
    addUser,
    getUsernameFromHeader,
    deleteUser,
    updateUser,
    getRole,
    registerUser,
    getUserByToken,
    getUserForSession
};