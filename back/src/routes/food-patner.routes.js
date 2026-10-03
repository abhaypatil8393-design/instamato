const express = require("express");
const foodmiddleware = require("../middleware/auth.middleware.js");
const foodpatner = require("../controller/food-patner.controller.js");

const router = express.Router();

router.get("/food-patner/:id" , foodpatner.getFoodpatnerById);

module.exports = router;