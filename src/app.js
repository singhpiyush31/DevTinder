const express = require('express');

const app = express();

app.use("/hello", (req,res) => {
    res.send("Hello Hello Hello");
});

// This will only handle GET call to /user
app.get("/user" , (req,res) => {
    res.send({firstName: "Piyush" , lastName: "Singh"});
});

app.post("/user" , (req,res) => {
    console.log("Save the data to the database");
    res.send("Data successfully saved to the database!");
})

// This will match all the HTTP methods API calls to /test
app.use("/test", (req,res) => {
    res.send("Hello from the server!");
});

app.use("/" , (req,res) => {
    res.send("Hello from the dashboard");
})

app.listen(7777 , () => {
    console.log("Server is listening successfully on port 7777...");
    
});