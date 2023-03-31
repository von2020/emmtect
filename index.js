const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute =  require("./routes/user");
const authRoute =  require("./routes/auth");
const postRoute =  require("./routes/post");
const serviceRoute =  require("./routes/services");
const subscriberRoute =  require("./routes/subscriber");
const fileUpload = require('express-fileupload');


app.use(fileUpload({
    useTempFiles: true
}));


dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
    ).then(() => console.log("DBConnection Successful!")
    ).catch((err)=>{console.log(err)})






app.use(express.json());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/services", serviceRoute);
app.use("/api/v1/subscribers", subscriberRoute);

app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to EMmTech"});
})


app.listen(process.env.PORT || 5000, () => {
    console.log("backend srver is running")
})