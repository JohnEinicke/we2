const jwt = require("jsonwebtoken");
const auth = require("../user/authenticateBasic");
const fs = require("fs");
const userService = require("../user/userService");
const jwtKey = fs.readFileSync("./certificates/jwtRS256.key");

const signIn = async function (req, res, next) {
    //Basic Teil
    if (!req.headers.authorization || req.headers.authorization.indexOf("Basic") === -1) {
        res.statusCode = 401;
        res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
        return res.json({ message: "Missing Authorization Header Gib die daten" });
    }

    //JWT
    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");
    const user = await userService.authenticate(username, password);
    if (!user) {
        return res.status(401).json({ message: "Invalid Authentication Credentials" });
    }


    // TTL
    const jwtExpirySeconds = 300;

    const token = jwt.sign({ username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds
    })

    //Prüfen ob User aktiv
    const active = await userService.getUserForSession(username);
    console.log(active);
    if(!active.active){
        return res.status(401).json({ message: "User ist nicht aktiviert" });
    }


    next(null, token);
};

const signInNormal = async function (req, res, next) {
    username = req.body.username;
    password = req.body.password;
    const user = await userService.authenticate(username, password);
    if (!user) {
        return res.status(401).json({ message: "Invalid Authentication Credentials" });
    }


    // TTL
    const jwtExpirySeconds = 300;

    const token = jwt.sign({ username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds
    })

    //Prüfen ob User aktiv
    const active = await userService.getUserForSession(username);
    const role = active.role;
    if(!active.active){
        return res.status(401).json({ message: "User ist nicht aktiviert" });
    }


    next(null, token, username, role);
};

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        var payload = jwt.verify(token, jwtKey, { algorithm: "HS256" }, (err, user) => {
            if (err) {
                res.status(500).json({ error: "Not Authorized" });
                return;
            }
            next();
        });
    } else {
        res.status(500).json({ error: "Not Authorized" });
        return;
    }
}

function getUser(req, res, next) {
    return new Promise((resolve, reject) => {
        let token = req.headers.authorization.split(" ")[1];
        var payload = jwt.verify(token, jwtKey, { algorithm: "HS256" }, (err, user) => {
            resolve(user);
        });
    });
}

function getRole(req, res, next) {
    return new Promise((resolve, reject) => {
        let token = req.headers.authorization.split(" ")[1];
        var payload = jwt.verify(token, jwtKey, { algorithm: "HS256" }, (err, user) => {
            username = user.username;
            role = userService.getRole(username);
            resolve(role);
        });
    });
}


module.exports = {
    signIn,
    isAuthenticated,
    getUser,
    getRole,
    signInNormal
}