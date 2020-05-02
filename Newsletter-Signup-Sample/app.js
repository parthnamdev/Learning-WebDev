const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.get("/", function(req, res){
    res.send("hello!, world");
})

app.listen(3000, function(){
    console.log("server started at port 3000");
})