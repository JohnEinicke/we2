const express = require("express");
const router = express.Router();
const sessionService = require("./sessionService");

router.get("/", function(req, res, next){
    res.render("index", {title: "Express"});
});

router.post("/login", function(req, res, next){
    var token = sessionService.createSessionToken(req, function (err, token){
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

module.exports = router;