const mongoose = require("mongoose");

const privateMessage = mongoose.model('privateMessage', 
{ 
    subject: String,
    messageText: String,
    sender: String,
    empfang: String 
});

module.exports = privateMessage;