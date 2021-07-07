const mongoose = require("mongoose");

const picture = mongoose.model('picture', 
{ 
    name: String,
    path: String
});

module.exports = picture;