const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        require: true
    }
}, {timestamps: true});


const Save = mongoose.model("Save" , saveSchema);
module.exports = Save ;