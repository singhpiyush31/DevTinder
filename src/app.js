const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user')

app.post("/signup" , async (req,res) => {
    const userObj = {
        firstName: "Piyush",
        lastName: "Singh",
        emailID: "piyush@gmail.com",
        password: "Piyush",
    }

    // Creating a new instance of user model
    const user = new User(userObj);

    try{
        await user.save();
    res.send("User send successfully!");
    }catch(err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
})

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(7777 , () => {
    console.log("Server is listening successfully on port 7777...");
    
});
}).catch((err) => {
    console.error("Database not connected!");
}); 