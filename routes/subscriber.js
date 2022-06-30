const Subscriber = require("../models/Subscribers");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const { append } = require("express/lib/response");
const express = require("express");
const app = express();







// CREATE Subscriber
router.post("/",  async(req, res) => {
    const newSubscriber = new Subscriber(req.body);
    console.log('seeP', newSubscriber)
    
    try{
        const savedSubscriber = await newSubscriber.save();
        console.log('savedp', savedSubscriber)   
        
        res.status(200).json(savedSubscriber);
    } catch (err){
        res.status(500).json(err); 
    }
})







// UPDATE Subscriber
router.put("/:id", verifyTokenAndAdmin, async(req,res) => {
    
    try{
        const updatedSubscriber = await Subscriber.findByIdAndUpdate(
            req.params.id,
        {
         $set: req.body
        },
        {new: true}
        );
        res.status(200).json(updatedSubscriber);
    }catch(err){
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req,res) => {
    
    try{
        await Subscriber.findByIdAndDelete(req.params.id);
        res.status(200).json("Subscriber has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

// GET SUBSCRIBER
router.get("/find/:id",  async(req,res) => {
    
    try{
        const subscriber = await Subscriber.findById(req.params.id);
        res.status(200).json( product ); 
    }catch(err){
        res.status(500).json(err);
    }
});

// GET ALL SUBSCRIBERS
router.get("/", async(req,res) => {
    
    try{
        subscribers = await Subscriber.find();
        res.status(200).json( posts );
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router