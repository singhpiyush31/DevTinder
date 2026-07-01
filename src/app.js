const express = require('express');

const app = express();

app.use("/user" , (req,res,next) => {
    console.log("Headling the route user1!");
    res.send("Response!!");
    next(); 
},
(req,res) => {
    console.log("Handling the route user2!");
    res.send("2nd Response");
}
);

app.listen(7777 , () => {
    console.log("Server is listening successfully on port 7777...");
    
});