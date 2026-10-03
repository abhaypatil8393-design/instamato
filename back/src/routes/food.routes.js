const express = require("express");
const foodmiddleware = require("../middleware/auth.middleware.js");
const food = require("../controller/food.controller.js");
const multer = require("multer");

const foodRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})


foodRouter.post("/", foodmiddleware.FoodpatnerMiddleware , upload.single("video") ,  food.createfood);
foodRouter.get("/getfood" , foodmiddleware.usermiddleware , food.getfood );
foodRouter.post("/like" , foodmiddleware.usermiddleware , food.likefood);
foodRouter.post("/save" , foodmiddleware.usermiddleware , food.savefood);


module.exports = foodRouter;
