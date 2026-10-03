const express = require("express");
const foodpatner = require("../model/foodpartener.model.js");
const food = require("../model/food.model.js");




// async function getFoodpatnerById(req ,res){

//     const foodpatneriD = req.params.id;

//  const foodpatner2 = await foodpatner.findById(foodpatneriD);


//  const foodItemByFoodPatner = await food.find( {foodpatner2: 
// foodpatner });
// // console.log("foo")
// // console.log(foodItemByFoodPatner);


// // console.log(foodpatner2);

//  if(!foodpatner2){
//     return res.status(404).json({
//         message: "food patner does not exist"
//     })

 

// }
// return res.status(200).json({
//     message: "food patner fechd succefully",
//     foodpatner2: {
//         ...foodpatner2.toObject(),
//         fooditem: foodItemByFoodPatner
//     }
//  }) }



async function getFoodpatnerById(req,res){

    const foodpatneriD = req.params.id;

    console.log("received id:", foodpatneriD);


    const foodpatner2 = await foodpatner.findById(foodpatneriD);


    const foodItemByFoodPatner = await food.find({
        foodpatner: foodpatneriD
    });


    if(!foodpatner2){
        return res.status(404).json({
            message:"food patner does not exist"
        });
    }


    return res.status(200).json({
        message:"food patner fetched successfully",
        foodpatner2:{
            ...foodpatner2.toObject(),
            fooditem:foodItemByFoodPatner
        }
    });
}


module.exports ={ getFoodpatnerById }