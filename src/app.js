const express = require('express');

const app = express();

// This will only handle GET call to /user
app.get("/user/:userId/:Name/:Pass" , (req,res) => {
    console.log(req.params);
    res.send({firstName: "Piyush" , lastName: "Singh"});
});

app.post("/user" , (req,res) => {
    console.log("Save the data to the database");
    res.send("Data successfully saved to the database!");
});

app.delete("/user" , (req,res) => {
    res.send("Deleted Successfully");
})

// This will match all the HTTP methods API calls to /test
app.use("/test", (req,res) => {
    res.send("Hello from the server!");
});

app.listen(7777 , () => {
    console.log("Server is listening successfully on port 7777...");
    
});