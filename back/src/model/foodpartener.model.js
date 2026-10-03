const mongoose = require("mongoose");

const foodpatnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ContactName: {
   type: String,
   
    },
    Phonenumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const foodpatner = mongoose.model("foodpatner", foodpatnerSchema);

module.exports = foodpatner;