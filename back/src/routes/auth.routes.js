const express = require("express");
const Router = express.Router();
const {login , register , logout , registerFoodpatner , loginFoodpatner , logoutFoodpatner} = require("../controller/auth.controller.js");

Router.post("/register" , register);
Router.post("/login" , login);
Router.post("/logout" , logout);
Router.post("/registerpatner" , registerFoodpatner);
Router.post("/loginFoodpatner" , loginFoodpatner);
Router.post("/logoutFoodpatner" , logoutFoodpatner);

module.exports = Router;