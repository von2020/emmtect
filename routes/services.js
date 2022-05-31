const Service = require("../models/Services");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const { append } = require("express/lib/response");
const cloudinary = require('cloudinary').v2
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');

app.use(fileUpload({
    useTempFiles: true
}));

cloudinary.config({
    cloud_name: 'dxzrwvflo',
    api_key: '248583444414373',
    api_secret: 'C1i08PVkjl0ht6vRxGXvq5GeUoc'
})






// CREATE CATEGORY
router.post("/",verifyTokenAndAdmin,  async(req, res) => {
    const newService = new Service(req.body);
    console.log('seeP', newService)
    
    try{
        const savedService = await newService.save();
        console.log('savedp', savedService)   
        
        res.status(200).json(savedService);
    } catch (err){
        res.status(500).json(err); 
    }
})




// UPLOAD SERVICE IMAGE
router.post("/image",verifyTokenAndAdmin,  function(req, res, next) {
    console.log('files', req.files)
    
    
    try{
        
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
          }
        const file = req.files.image;
        console.log('file', file)
        cloudinary.uploader.upload(file.tempFilePath, function(err, result){
            console.log('error', err)
            console.log('result', result)
            res.send({
                success: true,
                result
            })
        });
        
         
    } catch (err){
        res.status(500).json(err); 
    }
})


// UPDATE SERVICE
router.put("/:id", verifyTokenAndAdmin, async(req,res) => {
    
    try{
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
        {
         $set: req.body
        },
        {new: true}
        );
        res.status(200).json(updatedService);
    }catch(err){
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req,res) => {
    
    try{
        await Service.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

// GET SERVICE
router.get("/find/:id",  async(req,res) => {
    
    try{
        const post = await Service.findById(req.params.id);
        res.status(200).json( post ); 
    }catch(err){
        res.status(500).json(err);
    }
});

// GET ALL SERVICES
router.get("/", async(req,res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category; 
    try{
        let Services; 

        if(qNew){
            Services = await Service.find().sort({createdAt: -1}).limit(5);
        }else if(qCategory){
            Services = await Service.find({
                categories: {
                    $in:[qCategory],
                },
            });
        }else{
            posts = await Post.find();
        }

        
        res.status(200).json( posts );
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router