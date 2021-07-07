const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
{ 
    active: {type:Boolean, default:false},
    username: {type: String, unique:true},
    email: {type: String, unique:true},
    activationToken: String,
    activationExpiration: Date,
    password: String,
    role: {
        type : String,
        default : "user"
    },
    image: String
});

userSchema.pre("save", function(next){
    var user = this;
    if(!user.isModified("password")) {return next()};
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err){
    next(err)
});

userSchema.methods.comparePassword=function(candidatePassword,next){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err)
            return next(err);
        next(null, isMatch)
    })
}

module.exports = mongoose.model("user", userSchema);