const mongoose = require("mongoose");


const subscriberSchema = new mongoose.Schema({
    fname: { type: String, required:true },
    lname: { type: String},
    email: { type: String, required:true},
    message: { type: String, required:true},
    
},
{ timestamps: true }
);



module.exports = mongoose.model("Subscriber", subscriberSchema);