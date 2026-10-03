const mongoose = require("mongoose");


const FoodSchema = new mongoose.Schema({
    name: {
        type: String
    },
    video: {
        type: String,
        required: true
    },
    descripttion: {
        type: String,
    },
   foodpatner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"foodpatner"
},
likecout: {
    type: Number,
    default: 0
},
savecount: {
    type: Number,
    default: 0
}
})


const food = mongoose.model("food" ,  FoodSchema);
module.exports =  food;