const express = require("express");
const router = express.Router();
const mailService = require("../mail/mailService");
const userService = require("../user/userService");

const db = require("../database");
const { Z_DATA_ERROR } = require("zlib");

router.post("/", function(req, res, next){
    require('crypto').randomBytes(48, function(err, buffer) {
        var token = buffer.toString('hex');
        var expiration = Date.now() + 24 * 3600 * 1000;

        userService.registerUser(req, res, token, expiration);

        var mail = {
            from: process.env.EMAIL_NAME,
            to: req.body.email,
            subject: "Aktivierungslink",
            text: "Hier ist der Aktivierungslink, der 24 Stunden gültig ist: https://localhost:8080/register/" + token
        };

        mailService.sendMail(mail);
        res.send({
            action : "Email abgesendet"
        })
      });
});

router.get("/:token", async function(req, res){
    token = req.params.token;
    user = await userService.getUserByToken(token, req);
    if(user.activationExpiration > Date.now()){
        update = {active : true};
        userService.updateUser(user.username, update, res);
    }
    else{
        res.send({
            error : "Token expired"
        });
    }
});

module.exports = router;