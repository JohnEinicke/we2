const express = require("express");
const router = express.Router();
const service = require("./sessionService");

router.post("/", function(req, res, next){
    var token = service.signIn(req, res, function (err, token){
        if (token) {
            console.log("Token created: " + token);
            res.header("Authorization", "Bearer " + token);
            res.send("Could create token");
        }
        else {
            res.send("Could not create token");
        }
    });
});

router.post("/normal", function(req, res, next){
    var token = service.signInNormal(req, res, function (err, token, username, role){
        if (token) {
            console.log("Token created: " + token);
            res.header("Authorization", "Bearer " + token);
            res.send({
                username : username,
                role : role
            });
        }
        else {
            res.send("Could not create token");
        }
    });
});

module.exports = router;