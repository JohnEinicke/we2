const mongoose = require("mongoose");

const readinggroup = mongoose.model('readinggroup', 
{ 
    groupname: {type : String, unique : true, required : true, dropDups: true},
    member: [String]
});

module.exports = readinggroup;