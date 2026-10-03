const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
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


const Like = mongoose.model("Like" , likeSchema);
module.exports = Like ;