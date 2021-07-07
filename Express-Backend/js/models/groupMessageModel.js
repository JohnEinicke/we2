const mongoose = require("mongoose");

const groupMessage = mongoose.model('groupMessage', 
{ 
    subject: String,
    messageText: String,
    sender : String,
    group: String,
    empfang: [String] 
});

module.exports = groupMessage;