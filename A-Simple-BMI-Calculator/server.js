const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function(req, res){
    res.send("successfully posted.")
})

app.listen(3000, function(){
    console.log("server started at port 3000");
});