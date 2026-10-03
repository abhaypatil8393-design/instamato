const epxress = require("express");
const  mongoose  = require("mongoose");

const userSchema =  new  mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
        requiresd: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

},  {timeStamp: true})

const User = mongoose.model("User" , userSchema);
module.exports = User ;