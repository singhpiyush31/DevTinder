const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json());

app.post("/signup" , async (req,res) => {
    // Creating a new instance of the user model
    console.log(req.body);
    const user = new User(req.body);  




    try{
        await user.save();
    res.send("User Added Successfully!");
    }catch(err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
 });


app.get("/user" , async (req,res) => {
    const UserEmail = req.body.emailId;

    try {

        const user = await User.findOne({emailId: UserEmail});
        res.send(user);
        if(!user) {
            res.status(404).send("User Not Found!");
        }
        else {
            res.send(user);
        }
        // const users = await User.find({emailId: UserEmail});
        // if(users.length == 0) {
        //     res.status(404).send("User Not Found!");
        // }
        // else {
        //     res.send(users);
        // }
     }catch(err) { 
        res.status(400).send("Something went wrong!!");
     }


})

// Feed API -> GET / feed - get all the users from the database
app.get("/feed" , async (req,res) => {

    try {
        const users = await  User.find({});
        res.send(users);

    }catch(err) { 
        res.status(400).send("Something went wrong!!");
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