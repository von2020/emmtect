const mongoose = require("mongoose");


const subscriberSchema = new mongoose.Schema({
    name: { type: String, required:true, unique: true },
    email: { type: String, required:true},
    
},
{ timestamps: true }
);



module.exports = mongoose.model("Subscriber", subscriberSchema);