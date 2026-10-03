const foodpatner = require("../model/foodpartener.model.js");
const User = require("../model/user.model.js");
const jwt = require("jsonwebtoken");

async function FoodpatnerMiddleware(req, res, next){

    const token = req.cookies.Token;

    if(!token){
        return res.status(401).json({
            message:"Login foodpatner  first"
        });
    }

    try{

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const partner = await foodpatner.findById(decode.id);

        req.foodpatner = partner;

        next();

    }catch(err){
        return res.status(401).json({
            message: err.message
        });
    }
}


async function usermiddleware(req , res , next){
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message:"Login user first"
        });
    }

    try{

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.id);

        req.User = user;
        req.user = user;

        next();

    }catch(err){
        return res.status(401).json({
            message: err.message
        });
    }
}

module.exports = {
    FoodpatnerMiddleware,
    usermiddleware
};