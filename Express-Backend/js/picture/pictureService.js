const mongoose = require("mongoose");
const database = require("../database");
const picture = require("../models/pictureModel");
const fs = require("fs");

function addPictureToUser(username, path) {
    const pic = new picture({
        name: username,
        path: path
    });

    pic.save().then(() => {
        console.log('Einträge wurden erstellt.');
    });
}

function deleteOwnPicture(req, res, username) {
    picture.find({ path: req.body.path }, function (err, picture) {
        if (err) {
            res.send(err);
        }

        else {
            picture = picture[0];
            if (picture) {
                name = picture.name;
                if (name == username) {
                    picture.remove().then(() => {
                        res.send("Bild wurde entfernt");
                        fs.unlink(process.env.DIR + req.body.path, (err) => {
                            if (err) throw err;
                        });
                    });
                }
                else {
                    res.send("Sie besitzen keine Bild mit diesem Pfad");
                }
            }
            else {
                res.send("Sie besitzen keine Bild mit diesem Pfad");
            }
        }
    });
}

function deleteAnyPicture(req, res, username) {
    picture.find({ path: req.body.path }, function (err, picture) {
        if (err) {
            res.send(err);
        }
        else {
            picture = picture[0];
            if (picture) {
                name = picture.name;
                picture.remove().then(() => {
                    res.send("Bild wurde entfernt");
                    fs.unlink(process.env.DIR + req.body.path, (err) => {
                        if (err) throw err;
                    });
                });
            }
            else {
                res.send("Kein Bild mit diesem Pfad");
            }
        }
    });
}

module.exports = {
    addPictureToUser,
    deleteOwnPicture,
    deleteAnyPicture
}