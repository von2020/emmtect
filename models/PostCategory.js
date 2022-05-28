const mongoose = require("mongoose");


const postCategorySchema = new mongoose.Schema({
    name: { type: String, required:true, unique: true }, 
},
{ timestamps: true }
);




module.exports = mongoose.model("postCategory", postCategorySchema);