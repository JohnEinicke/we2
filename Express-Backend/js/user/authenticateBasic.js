const userService = require("./userService");

async function authenticateBasic(req,res, next){
    if(!req.headers.authorization || req.headers.authorization.indexOf("Basic") === -1){
        res.statusCode = 401;
        res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
        return res.json({message: "Missing Authorization Header Gib die daten"});
    }

    const base64Credentials = req.headers.authorization.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");
    const user = await userService.authenticate(username, password);
    if(!user){
        return res.status(401).json({message: "Invalid Authentication Credentials"});
    }
    else{
        next();
    }
};


module.exports = {
    authenticateBasic
};