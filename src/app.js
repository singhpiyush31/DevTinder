const express = require('express');

const app = express();

app.get("/getUserData" , (req,res) => {
    try {
        // Logic of DB cell and get user data

        throw new Error("dbuefgu");
        res.send("User Data Sent!");
    }
    catch (err) {
        res.status(500).send("Something went wrong");
    }
});

app.use("/" , (err,req,res,next) => {
    if(err) {
        // Log your error
        res.status(500).send("Something went wrong!"); 
    }
});

app.listen(7777 , () => {
    console.log("Server is listening successfully on port 7777...");
    
});