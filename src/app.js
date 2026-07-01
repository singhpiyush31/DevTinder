const express = require('express');

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin" , adminAuth);

app.post("/user/login" , (req,res) => {
    res.send("User logged in successfully!");
});

app.get("/user/data" , userAuth , (req,res) => {
    res.send("User Data is Sent");
})

app.get("/admin/getAllData" , (req,res,next) => {
    res.send("All data sent");
})

app.get("/admin/deleteUser" , (req,res) => {
    res.send("Deleted a user");
})

app.listen(7777 , () => {
    console.log("Server is listening successfully on port 7777...");
    
});