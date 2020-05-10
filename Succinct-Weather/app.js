const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(bodyParser.urlencoded({extended:true}));

const key = require('./apiKey');
let apiKey = key.api(); 

app.get("/", function(req, res){
    
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
    
    https.get(url, function(response){
        response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const weatherImage = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + weatherImage + "@2x.png";
        res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"><link rel="stylesheet" href= "styles.css"><!--Font Awesome --><link rel="stylesheet" href="@fortawesome\fontawesome-free\css\all.css"><title>Document</title></head><body class="theme"><div class="background-images container-fluid"><i class="fas fa-wind"></i><i class="fas fa-cloud-sun-rain"></i></div><div><div class = "container-fluid main"><nav class="navbar"><a class="navbar-brand" href="/">Succinct .weather</a><button href="" onclick="myFunction()" class="nav-item theme-button"><svg class="bi bi-circle-half" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15V1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/></svg></button></nav><div class="row"><div class="col-lg-6 result-temp">' + temp + '°C</div><div class="col-lg-6 result-weather-description">The weather in ' + query + ' is currently ' + weatherDescription + '<br><img src=' + imageURL + ' alt="" class ="result-image"></div></div></div><div class="container-fluid footer">made with ❤ in quarantine.</div></div><script>function myFunction() {var element = document.querySelector("body");element.classList.toggle("theme");}</script></body></html>');
        })
    })
})

app.listen(3000, function(){
    console.log("server started at port 3000");
});
