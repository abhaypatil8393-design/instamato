const epxress = require("express");
const User = require("../model/user.model.js")
const foodpatner = require("../model/foodpartener.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function register(req , res , next)  {

 const { email , password , name } = req.body;
 
 const isUserexist = await User.findOne({email });

 if(isUserexist){
   return res.status(400).json({
        message: "user is already exist"
    })
 }

 const hashpassword = await bcrypt.hash(password , 10);
 console.log(hashpassword);

 const user   = await User.create({
    email,
    password: hashpassword,
     name
 })

 const token = jwt.sign({
    id: user._id,
 }, process.env.JWT_SECRET)
 res.cookie("token" , token)


 res.status(201).json({
    message: "user register successfully" ,
    user: {
        _id: user._id,
        email: user.email,
        name: user.name
    }
 })
}



async function login(req ,res, next ){

    try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User does not exist"
        });
    }

    const isMatch = await bcrypt.compare(
        password.trim(),
        user.password
    );


    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

     const token = jwt.sign({
    id: user._id,
 }, process.env.JWT_SECRET)
 res.cookie("token" , token)

    return res.status(200).json({
        message: "User login successful"
    });

} catch (err) {
    console.log(err);

    return res.status(500).json({
        message: "Server error"
    });
}

}

async function logout(req , res){
    res.clearCookie("token");
    res.status(200).json({
        message: "user logout succefully"
    });
}


async function registerFoodpatner(req ,res){
   
 const { email , password , name , Phonenumber , address ,  ContactName } = req.body;
 
 const isfoodpatnerexist = await foodpatner.findOne({ email });

 if(isfoodpatnerexist){
   return res.status(400).json({
        message: "foodpatner is already exist"
    })
 }

    
 const hashpassword = await bcrypt.hash(password , 10);

 const newpatner = await foodpatner.create({
  name,
  email ,
  password: hashpassword,
  Phonenumber ,
  address ,
  ContactName
 })
 
 const patnertoken = jwt.sign({
    id: foodpatner._id,
 }, process.env.JWT_SECRET)
 res.cookie("Token" , patnertoken)


 res.status(201).json({
    message: "foodpatner register successfully" ,
    foodpatner: {
        _id: newpatner._id,
        email: newpatner.email,
        name: newpatner.name,
        Phonenumber: newpatner.Phonenumber,
        address: newpatner.address,
        ContactName: newpatner.ContactName
    }
 })

}


async function loginFoodpatner(req , res){
  
     try {
    const { email, password } = req.body;

    const foodpatner2 = await foodpatner.findOne({ email });

    if (!foodpatner2) {
        return res.status(400).json({
            message: "foodpatner does not exist"
        });
    }

    
    
    const isMatch = await bcrypt.compare(
        password.trim(),
        foodpatner2.password
    );
    


    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

     const patnertoken = jwt.sign({
    id: foodpatner2._id,
 }, process.env.JWT_SECRET)
 res.cookie("Token" , patnertoken)

    return res.status(200).json({
        message: "foodpatner login successful"
    });

} catch (err) {
    console.log(err);

    return res.status(500).json({
        message: "Server error"
    });
}
}

async function logoutFoodpatner(req , res){
     res.clearCookie("Token");
    res.status(200).json({
        message: "foodpatner logout succefully"
    });
}
module.exports = { register  , login  , logout  , registerFoodpatner , loginFoodpatner , logoutFoodpatner };