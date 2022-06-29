const Post = require("../models/Post");
const postCategory = require("../models/PostCategory");
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






// CREATE POST
router.post("/",verifyTokenAndAdmin,  async(req, res) => {
    const newPost = new Post(req.body);
    console.log('seeP', newPost)
    
    try{
        const savedPost = await newPost.save();
        console.log('savedp', savedPost)   
        
        res.status(200).json(savedPost);
    } catch (err){
        res.status(500).json(err); 
    }
})

// CREATE POST CATEGORY
router.post("/category",verifyTokenAndAdmin,  async(req, res) => {
    const newCategory = new postCategory(req.body);
    console.log('seeP', newCategory)
    
    try{
        const savedCategory = await newCategory.save();
        console.log('savedp', savedCategory)   
        
        res.status(200).json(savedCategory);
    } catch (err){
        res.status(500).json(err); 
    }
})


// UPLOAD POST IMAGE
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


// UPDATE POST
router.put("/:id", verifyTokenAndAdmin, async(req,res) => {
    
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
        {
         $set: req.body
        },
        {new: true}
        );
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req,res) => {
    
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Blog Post has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

// GET POSTS
router.get("/find/:id",  async(req,res) => {
    
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json( post ); 
    }catch(err){
        res.status(500).json(err);
    }
});

// GET ALL POSTS
router.get("/", async(req,res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    //start pagination
    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
   
    try{
        let posts; 

        if(qNew){
            posts = await Post.find().sort({createdAt: -1}).limit(5);
        }else if(qCategory){
            posts = await Post.find({
                categories: {
                    $in:[qCategory],
                },
            });
        }else{
            posts = await Post.find();
        }

        const resultPosts = posts.slice(startIndex, endIndex)
        res.status(200).json( resultPosts );
    }catch(err){
        res.status(500).json(err);
    }
});



module.exports = router