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
    const userEmail = req.query.email;
    console.log(userEmail);
    
    try {

        const user = await User.findOne({emailID: userEmail});
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


});

app.delete("/user" , async (req,res) => {
    const userId = req.body.userId;
    console.log(userId);
    
    try {
        const user = await User.findByIdAndDelete(userId);

        res.send("User deleted successfully!");
    }
    catch (err) {
        res.status(400).send("Something went wrong!");
    }
})

app.patch("/userUpdateEmailById" , async (req,res) => {
    const userEmail = req.body.emailID;
    const userId = req.body.Id;

    try {
        const email = await User.findByIdAndUpdate(userId , { emailID: userEmail});
        res.send("Updated the email");
    }
    catch (err) {
        res.status(400).send("Something went wrong!" + err.message);
    }
})

app.patch("/userUpdateByEmail" , async (req,res) => {
    const oldEmail = req.body.oldEmailID;
    const newEmail = req.body.newEmailID;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { emailID: oldEmail },               // Filter query
            { $set: { emailID: newEmail } }     // Update operation
        );
        res.send("Updated Siuccessfully!");
    }
    catch (err) {
        res.status(400).send("Something went wrong!" + err.message);
    }
});

app.patch("/userUpdate " , async (req,res) => {
    const userId = req.body.Id;
    const data = req.body;

    try {
        console.log(data);
        const userUpdated = await User.findOneAndUpdate(
            { _id: userId } ,
            { $set: data },
            { returnDocument: 'after' }
        );
        console.log(userUpdated);
        res.send("Updated the User", userUpdated);
    }
    catch (err) {
        res.status(400).send("Something went wrong!" + err.message);
    }
});

app.patch("/user/:userId" , async (req,res) => { 
    const userId = req.params?.userId;
    const data = req.body;

    try{

        const ALLOWED_UPDATES = ["photoUrl", 
            "about",
            "gender", 
            "age",]

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed) {
            throw new Error("Update will not allowed!");
        }
        


        const user = await User.findByIdAndUpdate({_id: userId} , data ,{
            returnDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send("User Updated Successfully!");
    }
    catch(err) {
        res.status(400).send("Update Failed! " + err.message);
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