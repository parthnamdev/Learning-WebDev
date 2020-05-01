const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function(req, res){
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);
    var bmi = weight/(Math.pow(height, 2));
    res.send('<!DOCTYPE html><html lang=en><head><meta charset=UTF-8><meta name=viewport content="width=device-width, initial-scale=1.0"><title>Result</title><link rel=stylesheet href=https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css integrity=sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh crossorigin=anonymous><link rel="stylesheet" href="styles.css"></head><body><p class=resultLine>Your BMI is <span class=calculatedBMI>'+ bmi +'</span></p><a href="/" class="btn btn-lg btn-outline-light">Calculate new</a></body></html>');
});

app.listen(3000, function(){
    console.log("server started at port 3000");
});