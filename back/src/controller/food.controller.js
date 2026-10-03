const food = require("../model/food.model.js");
const express = require("express");
const fileupload = require("../services/storage.services.js");
const like = require("../model/likes.model.js");
const save = require("../model/save.model.js");

const { v4: uuid } = require("uuid");


async function createfood(req , res){
  // console.log(req.body);
  // console.log(req.file);
  try{
    console.log(req.foodpatner);

  }catch(err){
    console.log(err);
     if(req.foodpatner === undefined){
      console.log(err)
    }
  }
  try{
    const fileupload2 =  await fileupload.uploadfile(req.file.buffer , uuid() );
  // console.log(fileupload2);
  const newfood = await food.create({
    name: req.body.name,
    descripttion: req.body.descripttion || req.body.description,
    video: fileupload2.url,
    foodpatner: req.foodpatner._id

  })
  }catch(err){
    console.log(err.message);
  }
  res.status(200).json({
    message: "Food is created succesfully"
  })


}

async function getfood(req , res){
  try {
    const fooditem = await food.find({});
    const userId = req.user ? req.user._id : null;
    
    let likedFoodIds = new Set();
    let savedFoodIds = new Set();
    
    if (userId) {
      const userLikes = await like.find({ user: userId });
      const userSaves = await save.find({ user: userId });
      
      likedFoodIds = new Set(userLikes.map(l => l.food.toString()));
      savedFoodIds = new Set(userSaves.map(s => s.food.toString()));
    }
    
    const fooditemWithStatus = fooditem.map(item => {
      const itemObj = item.toObject();
      itemObj.isLiked = likedFoodIds.has(item._id.toString());
      itemObj.isSaved = savedFoodIds.has(item._id.toString());
      return itemObj;
    });

    res.status(200).json({
      message: "food iteam fetch succesfully",
      fooditem: fooditemWithStatus
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function likefood(req , res) {
  try {
    const { foodid } = req.body;
    const userId = req.user ? req.user._id : null;
    
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const isalreadyliked = await like.findOne({ user: userId, food: foodid });

    if (isalreadyliked) {
      await like.findOneAndDelete({ user: userId, food: foodid });
      await food.findByIdAndUpdate(foodid, {
        $inc: { likecout: -1 }
      });
      return res.status(200).json({
        message: "food unliked successfully",
        liked: false
      });
    }

    const Like = await like.create({
      user: userId,
      food: foodid,
    });

    await food.findByIdAndUpdate(foodid, {
      $inc: { likecout: 1 }
    });

    res.status(200).json({
      message: "food liked successfully",
      Like,
      liked: true
    });
  } catch (err) {
    console.error("Error in likefood:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}


async function savefood(req , res) {
  try {
    const { foodid } = req.body;
    const userId = req.user ? req.user._id : null;
    
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const isalreadysave = await save.findOne({ user: userId, food: foodid });

    if (isalreadysave) {
      await save.findOneAndDelete({ user: userId, food: foodid });
      await food.findByIdAndUpdate(foodid, {
        $inc: { savecount: -1 }
      });
      return res.status(200).json({
        message: "food unsaved successfully",
        saved: false
      });
    }

    const newSave = await save.create({
      user: userId,
      food: foodid,
    });

    await food.findByIdAndUpdate(foodid, {
      $inc: { savecount: 1 }
    });

    res.status(200).json({
      message: "food saved successfully",
      save: newSave,
      saved: true
    });
  } catch (err) {
    console.error("Error in savefood:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createfood  , getfood  , likefood , savefood };